use qdrant_client::prelude::*;
use qdrant_client::qdrant::{
    CreateCollection, Distance, VectorParams, WriteOrdering,
};
use anyhow::Result;

pub struct AgriVectorStore {
    client: QdrantClient,
}

impl AgriVectorStore {
    pub async fn new(url: &str) -> Result<Self> {
        let client = QdrantClient::from_url(url).build()?;
        Ok(Self { client })
    }

    // Initialize the collection for agricultural context
    pub async fn init_collection(&self, collection_name: &str) -> Result<()> {
        self.client
            .create_collection(&CreateCollection {
                collection_name: collection_name.into(),
                vectors_config: Some(qdrant_client::qdrant::VectorsConfig {
                    config: Some(qdrant_client::qdrant::vectors_config::Config::Params(
                        VectorParams {
                            size: 1536, // Standard for many LLM embeddings (e.g., LiquidAI/OpenAI)
                            distance: Distance::Cosine.into(),
                            ..Default::default()
                        },
                    )),
                }),
                ..Default::default()
            })
            .await?;
        Ok(())
    }

    // Search for context (e.g., "pests affecting wheat in high humidity")
    pub async fn search_farming_practices(
        &self,
        collection_name: &str,
        vector: Vec<f32>,
    ) -> Result<Vec<ScoredPoint>> {
        let search_result = self.client
            .search_points(&SearchPoints {
                collection_name: collection_name.into(),
                vector,
                limit: 5,
                with_payload: Some(true.into()),
                ..Default::default()
            })
            .await?;
        
        Ok(search_result.result)
    }
}