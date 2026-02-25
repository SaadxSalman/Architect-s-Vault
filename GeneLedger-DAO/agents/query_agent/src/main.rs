use serde::{Deserialize, Serialize};
use reqwest::Client;

#[derive(Serialize)]
struct GraphQLQuery {
    query: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new();
    let weaviate_url = "http://localhost:8080/v1/graphql";

    // Example: Searching for genomic sequences related to "BRCA1 mutation"
    let query_str = r#"
    {
      Get {
        GenomicData(
          nearText: { concepts: ["BRCA1 mutation"] }
          limit: 5
        ) {
          sequence_id
          metadata_hash
          content_shard
        }
      }
    }"#;

    let response = client.post(weaviate_url)
        .json(&GraphQLQuery { query: query_str.to_string() })
        .send()
        .await?;

    let body: serde_json::Value = response.json().await?;
    println!("Query Results: {:#?}", body);

    Ok(())
}