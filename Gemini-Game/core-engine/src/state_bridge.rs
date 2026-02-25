use reqwest::Client;
use serde_json::json;

pub async fn send_telemetry(action: &str, thought: &str, enemy: bool) {
    let client = Client::new();
    let payload = json!({
        "sessionId": "game-001",
        "perception": { "enemyDetected": enemy, "health": 100 },
        "strategy": { "rawThought": thought, "chosenAction": action }
    });

    let _ = client.post("http://localhost:5000/api/telemetry")
        .json(&payload)
        .send()
        .await;
}