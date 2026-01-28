use axum::{
    extract::Path,
    http::{header, StatusCode, Response},
    response::IntoResponse,
    routing::get,
    Router,
};
use std::net::SocketAddr;
use tower_http::services::ServeDir;
use std::path::PathBuf;
use dotenvy::dotenv;

#[tokio::main]
async fn main() {
    // 1. Load environment variables from .env file
    dotenv().ok();
    let port = std::env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    let static_dir = std::env::var("STATIC_DIR").unwrap_or_else(|_| "static".to_string());

    // 2. Build the router
    let app = Router::new()
        // Capture syntax {filename} is for Axum 0.8+
        .route("/download/{filename}", get(download_handler))
        // Serves files from the 'static' directory if no routes match
        .fallback_service(ServeDir::new(static_dir));

    // 3. Define address and start server
    let addr_str = format!("0.0.0.0:{}", port);
    let addr: SocketAddr = addr_str.parse().expect("Invalid address format");
    
    println!("🚀 Server running at http://localhost:{}", port);
    
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

// Handler for manual file downloads
async fn download_handler(Path(filename): Path<String>) -> impl IntoResponse {
    let path = PathBuf::from("static").join(&filename);

    // Basic security: prevent directory traversal attacks
    if filename.contains("..") || filename.contains('/') || filename.contains('\\') {
        return (StatusCode::BAD_REQUEST, "Invalid filename").into_response();
    }

    if !path.exists() {
        return (StatusCode::NOT_FOUND, "File not found").into_response();
    }

    // Read file content asynchronously
    match tokio::fs::read(&path).await {
        Ok(contents) => {
            // Determine MIME type (text/html, image/png, etc.)
            let mime = mime_guess::from_path(&path).first_or_octet_stream();
            
            // Build the response with the download header
            Response::builder()
                .status(StatusCode::OK)
                .header(header::CONTENT_TYPE, mime.as_ref())
                .header(
                    header::CONTENT_DISPOSITION, 
                    format!("attachment; filename=\"{}\"", filename)
                )
                .body(axum::body::Body::from(contents))
                .unwrap()
                .into_response()
        }
        Err(_) => (StatusCode::INTERNAL_SERVER_ERROR, "Error reading file").into_response(),
    }
}