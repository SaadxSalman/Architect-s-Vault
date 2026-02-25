use futures_util::{SinkExt, StreamExt};
use std::sync::{Arc, Mutex};
use tokio::net::TcpListener;
use tokio_tungstenite::accept_async;
use tokio::sync::broadcast;
use dotenvy::dotenv;
use std::env;

#[tokio::main]
async fn main() {
    // 1. Create a broadcast channel for threats
    // This allows multiple frontends (Next.js & Svelte) to listen at once
    let (tx, _) = broadcast::channel::<String>(100);
    let tx = Arc::new(tx);

    // 2. Start the WebSocket listener
    let addr = "127.0.0.1:8080";
    let listener = TcpListener::bind(addr).await.expect("Failed to bind");
    println!("📡 Guardian WebSocket Server listening on: {}", addr);

    // 3. Clone transmitter for a background threat-simulation task
    let simulated_tx = tx.clone();
    tokio::spawn(async move {
        loop {
            // This is where your Gemma-3/Analyzer logic would trigger
            let _ = simulated_tx.send("⚠️ THREAT_DETECTED: Unauthorized Port Scan".to_string());
            tokio::time::sleep(tokio::time::Duration::from_secs(5)).await;
        }
    });

    // 4. Handle incoming connections
    while let Ok((stream, _)) = listener.accept().await {
        let tx = tx.clone();
        tokio::spawn(async move {
            let ws_stream = accept_async(stream).await.expect("Error during ws handshake");
            let (mut ws_sender, _) = ws_stream.split();
            let mut rx = tx.subscribe();

            while let Ok(msg) = rx.recv().await {
                if ws_sender.send(tokio_tungstenite::tungstenite::Message::Text(msg)).await.is_err() {
                    break; // Connection closed
                }
            }
        });
    }
}

fn load_config() {
    dotenv().ok();
    let model_path = env::var("MODEL_PATH").expect("MODEL_PATH not set");
    let interface = env::var("NETWORK_INTERFACE").unwrap_or("eth0".to_string());
    
    println!("🚀 Loading model from: {}", model_path);
    println!("🛡️ Sniffing on: {}", interface);
}