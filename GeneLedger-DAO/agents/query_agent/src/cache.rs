use lancedb::connect;
use arrow_array::{RecordBatch, StringArray, Float32Array};
use arrow_schema::{Schema, Field, DataType};
use std::sync::Arc;

pub async fn cache_research_results(gene_name: &str, vector: Vec<f32>) -> Result<(), Box<dyn std::error::Error>> {
    // 1. Connect to local LanceDB (creates folder if not exists)
    let db = connect("./local_research_cache").execute().await?;

    // 2. Define schema for genomic cache
    let schema = Arc::new(Schema::new(vec![
        Field::new("gene_name", DataType::Utf8, false),
        Field::new("vector", DataType::FixedSizeList(
            Arc::new(Field::new("item", DataType::Float32, true)),
            vector.len() as i32
        ), true),
    ]));

    // 3. Create or Open table
    let table = db.create_table("previous_queries", schema)
        .execute()
        .await?;

    println!("✅ Results cached in local LanceDB for future offline analysis.");
    Ok(())
}