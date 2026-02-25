use reqwest::Client;
use serde_json::json;

pub async fn initialize_schema() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new();
    let url = "http://localhost:8080/v1/schema";

    let schema = json!({
        "class": "GenomicData",
        "vectorizer": "none", // We will provide our own vectors from the agent
        "properties": [
            { "name": "geneName", "dataType": ["text"] },
            { "name": "species", "dataType": ["text"] },
            { "name": "metadataHash", "dataType": ["string"] },
            { "name": "pricePerQuery", "dataType": ["number"] }
        ]
    });

    let res = client.post(url)
        .json(&schema)
        .send()
        .await?;

    if res.status().is_success() {
        println!("✅ GenomicData schema created successfully.");
    } else {
        println!("⚠️ Schema might already exist: {:?}", res.text().await?);
    }

    Ok(())
}