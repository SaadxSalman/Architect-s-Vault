use qdrant_client::prelude::*;
use qdrant_client::qdrant::{CreateCollection, Distance, VectorParams, VectorsConfig};
use anyhow::Result;

pub struct QdrantService {
    client: QdrantClient,
}

impl QdrantService {
    pub async fn new(url: &str) -> Result<Self> {
        let client = QdrantClient::from_url(url).build()?;
        Ok(Self { client })
    }

    pub async fn init_collection(&self, collection_name: &str) -> Result<()> {
        // Create a collection for wellness context (e.g., sleep science, nutrition facts)
        self.client.create_collection(&CreateCollection {
            collection_name: collection_name.into(),
            vectors_config: Some(VectorsConfig {
                config: Some(qdrant_client::qdrant::vectors_config::Config::Params(VectorParams {
                    size: 1536, // Matches OpenAI embedding dimensions
                    distance: Distance::Cosine.into(),
                    ..Default::default()
                })),
            }),
            ..Default::default()
        }).await?;
        Ok(())
    }
}