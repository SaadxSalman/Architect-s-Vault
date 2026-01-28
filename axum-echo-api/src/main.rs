use axum::{
    routing::{get, post},
    Json, Router, response::IntoResponse,
};
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::net::SocketAddr;
use chrono::Utc;
use tower_http::services::ServeDir;
use dotenvy::dotenv;

#[tokio::main]
async fn main() {
    dotenv().ok();
    
    // 1. Build the Router
    let app = Router::new()
        // Health check endpoint
        .route("/health", get(health_check))
        // Echo endpoint
        .route("/echo", post(echo_handler))
        // Serve static HTML file
        .fallback_service(ServeDir::new("static"));

    // 2. Define Address
    let port = std::env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    let addr = format!("127.0.0.1:{}", port).parse::<SocketAddr>().unwrap();
    
    println!("🚀 Server started at http://{}", addr);

    // 3. Run the Server
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    ax_server(listener, app).await;
}

// Data structures for JSON
#[derive(Deserialize)]
struct EchoRequest {
    message: String,
    author: Option<String>,
}

#[derive(Serialize)]
struct EchoResponse {
    message: String,
    author: String,
    processed_at: String,
}

// GET /health
async fn health_check() -> impl IntoResponse {
    Json(json!({ "status": "ok", "uptime": "up" }))
}

// POST /echo
// This demonstrates the Axum signature: Json extractor -> IntoResponse
async fn echo_handler(Json(payload): Json<EchoRequest>) -> impl IntoResponse {
    let response = EchoResponse {
        message: payload.message,
        author: payload.author.unwrap_or_else(|| "Anonymous".to_string()),
        processed_at: Utc::now().to_rfc3339(),
    };

    Json(response)
}

async fn ax_server(listener: tokio::net::TcpListener, app: Router) {
    axum::serve(listener, app).await.unwrap();
}