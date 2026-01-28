use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    routing::{get, delete}, // Removed 'post' from here to fix the warning
    Json, Router,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::Mutex; 
use tower_http::services::ServeDir;

// 1. Define the Task model
#[derive(Debug, Serialize, Deserialize, Clone)]
struct Task {
    id: u64,
    title: String,
    completed: bool,
}

// 2. Define the Shared State
struct AppState {
    tasks: Vec<Task>,
    next_id: u64,
}

type SharedState = Arc<Mutex<AppState>>;

#[tokio::main]
async fn main() {
    let shared_state = Arc::new(Mutex::new(AppState {
        tasks: Vec::new(),
        next_id: 1,
    }));

    // 3. Build the Router
    let app = Router::new()
        // API Routes
        // Note: we use axum::routing::post directly here to avoid the unused import warning
        .route("/api/tasks", get(get_tasks).post(add_task))
        .route("/api/tasks/{id}", delete(delete_task))
        // FIXED: Use fallback_service for the root directory instead of nest_service
        .fallback_service(ServeDir::new("static"))
        .with_state(shared_state);

    let addr = "127.0.0.1:3000";
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    println!("🚀 Server running on http://{}", addr);
    
    axum::serve(listener, app).await.unwrap();
}

// --- Handlers ---

async fn get_tasks(State(state): State<SharedState>) -> Json<Vec<Task>> {
    let state = state.lock().await;
    Json(state.tasks.clone())
}

#[derive(Deserialize)]
struct CreateTask {
    title: String,
}

async fn add_task(
    State(state): State<SharedState>,
    Json(payload): Json<CreateTask>,
) -> impl IntoResponse {
    let mut state = state.lock().await;
    
    let new_task = Task {
        id: state.next_id,
        title: payload.title,
        completed: false,
    };

    state.tasks.push(new_task.clone());
    state.next_id += 1;

    (StatusCode::CREATED, Json(new_task))
}

async fn delete_task(
    State(state): State<SharedState>,
    Path(id): Path<u64>,
) -> StatusCode {
    let mut state = state.lock().await;
    let initial_len = state.tasks.len();
    
    state.tasks.retain(|t| t.id != id);

    if state.tasks.len() < initial_len {
        StatusCode::OK
    } else {
        StatusCode::NOT_FOUND
    }
}