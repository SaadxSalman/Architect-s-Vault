use actix_web::{post, web, App, HttpServer, Responder, HttpResponse};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct ResearchRequest {
    query: String,
}

#[post("/analyze")]
async fn start_analysis(req: web::Json<ResearchRequest>) -> impl Responder {
    println!("Received Query: {}", req.query);
    // Here you would trigger the smolagents or internal Rust logic
    HttpResponse::Ok().json("Analysis Started")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(start_analysis)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}