use axum::{
    extract::{ws::{Message, WebSocket, WebSocketUpgrade}, State},
    response::IntoResponse,
    routing::get,
    Router,
};
use serde::Serialize;
use std::{
    sync::{Arc, Mutex},
    time::Duration,
};
use sysinfo::{System, Disks};
use tower_http::services::ServeDir;

// 1. Define the Data Structure for our UI
#[derive(Serialize, Clone)]
struct SystemStats {
    cpu_usage: f32,
    ram_used: u64,
    ram_total: u64,
    disk_used: u64,
    disk_total: u64,
}

// 2. Global State to share the System instance
struct AppState {
    sys: Arc<Mutex<System>>,
}

#[tokio::main]
async fn main() {
    // Initialize the system monitoring object
    let mut sys = System::new_all();
    sys.refresh_all();
    
    let shared_state = Arc::new(AppState {
        sys: Arc::new(Mutex::new(sys)),
    });

    // 3. Define Routes
    let app = Router::new()
        // Serves index.html from the /static folder
        .fallback_service(ServeDir::new("static")) 
        .route("/ws", get(ws_handler))
        .with_state(shared_state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!("🚀 Pulse Monitor running on http://localhost:3000");
    
    axum::serve(listener, app).await.unwrap();
}

// 4. WebSocket Handler
async fn ws_handler(
    ws: WebSocketUpgrade,
    State(state): State<Arc<AppState>>,
) -> impl IntoResponse {
    ws.on_upgrade(|socket| handle_socket(socket, state))
}

async fn handle_socket(mut socket: WebSocket, state: Arc<AppState>) {
    let mut interval = tokio::time::interval(Duration::from_millis(1000));

    loop {
        interval.tick().await;

        let stats = {
            let mut sys = state.sys.lock().unwrap();
            
            // Refresh logic for sysinfo v0.30+
            sys.refresh_cpu_all();
            sys.refresh_memory();
            
            // Disks are managed via the Disks struct in newer versions
            let disks = Disks::new_with_refreshed_list();
            let total_d: u64 = disks.iter().map(|d| d.total_space()).sum();
            let avail_d: u64 = disks.iter().map(|d| d.available_space()).sum();

            SystemStats {
                cpu_usage: sys.global_cpu_usage(),
                ram_used: sys.used_memory() / 1024 / 1024,
                ram_total: sys.total_memory() / 1024 / 1024,
                disk_used: (total_d - avail_d) / 1024 / 1024 / 1024,
                disk_total: total_d / 1024 / 1024 / 1024,
            }
        };

        // Serialize and send the message
        if let Ok(msg) = serde_json::to_string(&stats) {
            // Using Message::Text directly to avoid trait ambiguity
            if socket.send(Message::Text(msg.into())).await.is_err() {
                // Client disconnected
                break;
            }
        }
    }
}