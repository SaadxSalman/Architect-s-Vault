use qdrant_client::prelude::*;
use qdrant_client::qdrant::{PointStruct, Vector, UpsertPointsBuilder};
use rust_bert::pipelines::sentence_embeddings::{
    SentenceEmbeddingsBuilder, SentenceEmbeddingsModelType,
};
use std::path::Path;

pub async fn process_and_index_scientific_paper(
    collection_name: &str,
    file_path: &Path,
) -> anyhow::Result<()> {
    // 1. Extract Text from PDF
    let content = pdf_extract::extract_text(file_path)?;
    
    // 2. Initialize the Embedding Model (Bio-specific approach)
    // Using a BERT-based model for semantic representation
    let model = SentenceEmbeddingsBuilder::remote(SentenceEmbeddingsModelType::AllMiniLmL12V2)
        .create_model()?;

    // 3. Generate Embeddings
    let sentences = vec![content.as_str()]; // In production, split text into chunks
    let embeddings = model.encode(&sentences)?;
    let vector = embeddings[0].clone();

    // 4. Connect to Qdrant
    let client = QdrantClient::from_url("http://localhost:6333").build()?;

    // 5. Prepare Payload (Metadata for RAG)
    let mut payload = Payload::new();
    payload.insert("filename", file_path.to_str().unwrap_or("unknown"));
    payload.insert("snippet", content.chars().take(500).collect::<String>());

    // 6. Upsert to Vector Database
    let point = PointStruct::new(
        uuid::Uuid::new_v4().to_string(), // Unique ID for the paper chunk
        vector,
        payload,
    );

    client.upsert_points(UpsertPointsBuilder::new(collection_name, vec![point])).await?;

    Ok(())
}

#[napi]
pub async fn search_relevant_context(
    collection_name: String,
    query: String,
    limit: u32,
) -> napi::Result<Vec<String>> {
    let client = QdrantClient::from_url("http://localhost:6333").build().map_err(|e| napi::Error::from_reason(e.to_string()))?;

    // 1. Convert User Query to Vector (using the same model used for ingestion)
    let model = SentenceEmbeddingsBuilder::remote(SentenceEmbeddingsModelType::AllMiniLmL12V2)
        .create_model()
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;
    
    let query_vector = model.encode(&[query]).map_err(|e| napi::Error::from_reason(e.to_string()))?;

    // 2. Search Qdrant
    let search_result = client
        .search_points(&SearchPoints {
            collection_name,
            vector: query_vector[0].clone(),
            limit: limit as u64,
            with_payload: Some(true.into()),
            ..Default::default()
        })
        .await
        .map_err(|e| napi::Error::from_reason(e.to_string()))?;

    // 3. Extract the text snippets from the payload
    let mut contexts = Vec::new();
    for point in search_result.result {
        if let Some(payload) = point.payload.get("snippet") {
            contexts.push(payload.to_string());
        }
    }

    Ok(contexts)
}

#[napi]
pub async fn discover_connections(
    topic_a: String,
    topic_b: String,
    collection: String,
) -> napi::Result<Vec<ConnectionResult>> {
    let client = QdrantClient::from_url("http://localhost:6333").build().map_err(|e| napi::Error::from_reason(e.to_string()))?;

    // 1. Vectorize both topics
    let model = SentenceEmbeddingsBuilder::remote(SentenceEmbeddingsModelType::AllMiniLmL12V2).create_model()?;
    let vec_a = model.encode(&[topic_a])?[0].clone();
    let vec_b = model.encode(&[topic_b])?[0].clone();

    // 2. Fetch top 5 papers for Topic A
    let results_a = client.search_points(&SearchPoints {
        collection_name: collection.clone(),
        vector: vec_a,
        limit: 5,
        with_payload: Some(true.into()),
        ..Default::default()
    }).await?;

    // 3. Fetch top 5 papers for Topic B
    let results_b = client.search_points(&SearchPoints {
        collection_name: collection,
        vector: vec_b,
        limit: 5,
        with_payload: Some(true.into()),
        ..Default::default()
    }).await?;

    // 4. Logic to find "Shared Concepts" (Simplified)
    // We look for high similarity between any point in A and any point in B
    let mut shared_findings = Vec::new();
    for p_a in results_a.result {
        for p_b in &results_b.result {
            let sim = cosine_similarity(&p_a.vector, &p_b.vector);
            if sim > 0.75 { // Threshold for a "hidden connection"
                shared_findings.push(format!(
                    "Connection found between {} and {}", 
                    p_a.payload.get("filename").unwrap(),
                    p_b.payload.get("filename").unwrap()
                ));
            }
        }
    }

    Ok(shared_findings)
}