use axum::{
    body::Body,
    extract::Path,
    http::{header, StatusCode, Response},
    routing::get,
    Router,
};
use tower_http::services::ServeDir;
use std::net::SocketAddr;
use dotenvy::dotenv;

#[tokio::main]
async fn main() {
    // Load environment variables from .env file
    dotenv().ok();
    
    // 1. Setup Static File Service using Tower-HTTP
    // This will serve files from the "static" directory
    let serve_dir = ServeDir::new("static");

    // 2. Define Routes
    let app = Router::new()
        // Corrected syntax: Use {filename} instead of :filename for Axum 0.8+
        .route("/download/{filename}", get(download_handler))
        // fallback_service handles everything else (like /index.html)
        .fallback_service(serve_dir);

    // 3. Start Server
    let host = std::env::var("HOST").unwrap_or_else(|_| "127.0.0.1".to_string());
    let port = std::env::var("PORT").unwrap_or_else(|_| "3000".to_string());
    let addr: SocketAddr = format!("{}:{}", host, port).parse().expect("Invalid address format");

    println!("🚀 Server running at http://{}", addr);
    
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

// 4. Dynamic Handler for File Downloads
async fn download_handler(Path(filename): Path<String>) -> Response<Body> {
    // Prevent basic directory traversal by joining with the downloads folder
    let path = std::path::Path::new("downloads").join(&filename);

    // Try to read the file asynchronously
    match tokio::fs::read(&path).await {
        Ok(contents) => {
            // Guess the mime type based on file extension
            let mime = mime_guess::from_path(&path).first_or_octet_stream();

            Response::builder()
                .status(StatusCode::OK)
                .header(header::CONTENT_TYPE, mime.as_ref())
                .header(
                    header::CONTENT_DISPOSITION,
                    format!("attachment; filename=\"{}\"", filename),
                )
                .body(Body::from(contents))
                .expect("Failed to build response")
        }
        Err(_) => Response::builder()
            .status(StatusCode::NOT_FOUND)
            .body(Body::from("File not found in downloads folder"))
            .expect("Failed to build error response"),
    }
}