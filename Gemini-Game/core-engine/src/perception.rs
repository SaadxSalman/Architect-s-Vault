use opencv::{
    prelude::*,
    videoio,
    core,
    imgcodecs,
};
use reqwest::Client;
use serde_json::json;
use std::error::Error;

pub struct GameState {
    pub enemy_detected: bool,
    pub health: i32,
    pub suggested_action: String,
}

pub async fn analyze_screen() -> Result<GameState, Box<dyn Error>> {
    // 1. Initialize Screen Capture (using OpenCV to hook into the display)
    // Note: On some systems, you might need a crate like 'scrap' for direct DXGI/X11 capture
    let mut cam = videoio::VideoCapture::new(0, videoio::CAP_ANY)?; // 0 is usually the primary display/webcam
    let mut frame = core::Mat::default();
    cam.read(&mut frame)?;

    // 2. Encode image to Buffer (JPEG)
    let mut buffer = core::Vector::<u8>::new();
    imgcodecs::imencode(".jpg", &frame, &mut buffer, &core::Vector::new())?;

    // 3. Send to Python Inference Server (FastAPI)
    let client = Client::new();
    let res = client.post("http://localhost:8000/predict")
        .json(&json!({
            "image": base64::encode(buffer.to_vec()),
        }))
        .send()
        .await?
        .json::<serde_json::Value>()
        .await?;

    // 4. Map the AI response to our GameState
    Ok(GameState {
        enemy_detected: res["enemy_found"].as_bool().unwrap_or(false),
        health: res["stats"]["health"].as_i64().unwrap_or(100) as i32,
        suggested_action: res["action"].as_str().unwrap_or("idle").to_string(),
    })
}