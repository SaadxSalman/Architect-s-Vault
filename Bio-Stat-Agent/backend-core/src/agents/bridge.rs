use serde_json::json;

pub async fn trigger_agent_pipeline(user_query: &str) -> Result<String, reqwest::Error> {
    let client = reqwest::Client::new();
    let res = client.post("http://localhost:8000/process-research")
        .json(&json!({ "query": user_query }))
        .send()
        .await?
        .text()
        .await?;

    Ok(res) // This returns the full JSON from Python to be saved in MongoDB
}