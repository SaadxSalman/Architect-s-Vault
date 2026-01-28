use axum::{
    http::{HeaderMap, Request, StatusCode},
    middleware::{self, Next},
    response::Response,
    routing::{get, get_service},
    Router,
};
use std::net::SocketAddr;
use tower_http::services::ServeDir;
use dotenvy::dotenv;
use std::env;

#[tokio::main]
async fn main() {
    dotenv().ok(); // Load .env file

    // 1. Build the protected routes
    let api_routes = Router::new()
        .route("/vault", get(vault_handler))
        // Apply middleware ONLY to these routes
        .layer(middleware::from_fn(api_key_middleware));

    // 2. Main Router
    let app = Router::new()
        .nest("/api", api_routes)
        // Serve frontend files from the 'static' directory
        .fallback_service(get_service(ServeDir::new("static")));

    // 3. Start Server
    let port = env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    
    // We bind to 0.0.0.0 so it works in all environments (Docker, WSL, etc.)
    let bind_addr = format!("0.0.0.0:{}", port);
    let addr: SocketAddr = bind_addr.parse().expect("Invalid address");

    // We print localhost so the link is clickable and "correct" for your browser
    println!("🚀 Server running at http://localhost:{}", port);
    
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

// --- Middleware ---
async fn api_key_middleware(
    headers: HeaderMap,
    request: Request<axum::body::Body>,
    next: Next,
) -> Result<Response, StatusCode> {
    // Get the key from .env
    let valid_key = env::var("API_KEY").expect("API_KEY must be set");

    // Check if the header exists and matches
    let auth_header = headers
        .get("x-api-key")
        .and_then(|value| value.to_str().ok());

    match auth_header {
        Some(key) if key == valid_key => {
            // Key is valid, proceed to the handler
            let response = next.run(request).await;
            Ok(response)
        }
        _ => {
            // Key is missing or wrong
            Err(StatusCode::UNAUTHORIZED)
        }
    }
}

// --- Handler ---
async fn vault_handler() -> &'static str {
    "Welcome to the secret vault! The gold is hidden under the floorboards."
}