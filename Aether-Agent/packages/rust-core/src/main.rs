use axum::{routing::post, Json, Router};
use serde::{Deserialize, Serialize};

// In your handler
let img_bytes = download_satellite_img(url).await?;
let img_vector = vision_transformer.embed(img_bytes).await?;
let text_vector = nlp_model.embed(social_media_report).await?;

milvus.insert_crisis_data(unique_id, img_vector, text_vector).await?;

#[derive(Deserialize)]
pub struct AnalysisRequest {
    image_url: String,
}

#[derive(Serialize)]
pub struct AnalysisResponse {
    severity: f32,
    crisis_type: String,
}

async fn analyze_handler(Json(payload): Json<AnalysisRequest>) -> Json<AnalysisResponse> {
    // In a real app, you'd download the image and call SatelliteAnalyzer
    Json(AnalysisResponse {
        severity: 0.85,
        crisis_type: "Flood".to_string(),
    })
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/analyze", post(analyze_handler));
    
    println!("🚀 Rust-Core running on port 50051");
    let listener = tokio::net::TcpListener::bind("0.0.0.0:50051").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}