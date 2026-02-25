use reqwest::Client;
use serde_json::json;

// Update in services/vision_service.rs
let endpoint = "https://api.liquid.ai/v1/deployments/agri-agent-finetuned/analyze";

pub struct VisionAgent {
    client: Client,
    api_key: String,
}

impl VisionAgent {
    pub fn new(api_key: String) -> Self {
        Self {
            client: Client::new(),
            api_key,
        }
    }

    pub async fn analyze_crop_health(&self, image_url: &str) -> Result<String, reqwest::Error> {
        let response = self.client
            .post("https://api.liquid.ai/v1/vision/analyze") // Example endpoint
            .header("Authorization", format!("Bearer {}", self.api_key))
            .json(&json!({
                "image_url": image_url,
                "prompt": "Identify any signs of nutrient deficiency or pest infestation in this crop field."
            }))
            .send()
            .await?
            .text()
            .await?;

        Ok(response)
    }
}