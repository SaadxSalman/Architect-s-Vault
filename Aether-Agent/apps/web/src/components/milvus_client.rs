use milvus_sdk::prelude::*;
use std::error::Error;

pub struct AetherMilvus {
    client: Client,
}

impl AetherMilvus {
    pub async fn new(url: &str) -> Result<Self, Box<dyn Error>> {
        let client = Client::new(url).await?;
        Ok(Self { client })
    }

    pub async fn init_collection(&self) -> Result<(), Box<dyn Error>> {
        let collection_name = "crisis_embeddings";

        // 1. Define the Schema
        let schema = CollectionSchemaBuilder::new(collection_name, "Multi-modal crisis data")
            .add_field(FieldSchema::new_primary_int64("id", "Primary Key", true))
            // Vector for Satellite Images (e.g., 768 dims for ViT-Base)
            .add_field(FieldSchema::new_float_vector("image_vector", "Satellite vision features", 768))
            // Vector for News/Social Reports (e.g., 384 dims for lightweight NLP)
            .add_field(FieldSchema::new_float_vector("text_vector", "Report textual features", 384))
            .build()?;

        // 2. Create the Collection
        self.client.create_collection(schema, 2).await?; // 2 Shards for parallel scale

        // 3. Create Indexes (Required for search)
        self.client.create_index(
            collection_name,
            "image_vector",
            IndexType::Ivfflat,
            MetricType::L2,
            vec![("nlist".to_string(), "128".to_string())],
        ).await?;

        Ok(())
    }

    pub async fn insert_crisis_data(
        &self, 
        id: i64, 
        img_embedding: Vec<f32>, 
        txt_embedding: Vec<f32>
    ) -> Result<(), Box<dyn Error>> {
        let id_column = Column::new_int64("id", vec![id]);
        let img_column = Column::new_float_vector("image_vector", vec![img_embedding]);
        let txt_column = Column::new_float_vector("text_vector", vec![txt_embedding]);

        self.client.insert("crisis_embeddings", None, vec![id_column, img_column, txt_column]).await?;
        Ok(())
    }
}