use axum::{
    extract::FromRequestParts,
    http::{request::Parts, StatusCode},
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use tower_http::services::ServeDir;

// --- 1. Models & JWT Logic ---

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

#[derive(Serialize, Deserialize)]
struct AuthPayload {
    username: String,
}

#[derive(Serialize)]
struct AuthBody {
    access_token: String,
    token_type: String,
}

// --- 2. Custom Error Handling ---

enum AuthError {
    WrongCredentials,
    MissingToken,
    InvalidToken,
    TokenCreation,
}

impl IntoResponse for AuthError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            AuthError::WrongCredentials => (StatusCode::UNAUTHORIZED, "Invalid username"),
            AuthError::MissingToken => (StatusCode::BAD_REQUEST, "Missing credentials"),
            AuthError::InvalidToken => (StatusCode::UNAUTHORIZED, "Invalid token"),
            AuthError::TokenCreation => (StatusCode::INTERNAL_SERVER_ERROR, "Token error"),
        };
        let body = Json(serde_json::json!({ "error": error_message }));
        (status, body).into_response()
    }
}

// --- 3. THE CUSTOM EXTRACTOR (Level 2 Mastery) ---

struct AuthUser {
    username: String,
}

// Axum 0.8 uses native async fn in traits; no #[async_trait] needed.
impl<S> FromRequestParts<S> for AuthUser
where
    S: Send + Sync,
{
    type Rejection = AuthError;

    // Note the use of `&mut Parts` which is required in Axum 0.8
    async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
        // Extract the "Authorization" header
        let auth_header = parts
            .headers
            .get("Authorization")
            .and_then(|value| value.to_str().ok())
            .ok_or(AuthError::MissingToken)?;

        if !auth_header.starts_with("Bearer ") {
            return Err(AuthError::InvalidToken);
        }

        let token = &auth_header[7..];
        let secret = std::env::var("JWT_SECRET").expect("JWT_SECRET must be set");

        // Decode and validate
        let token_data = decode::<Claims>(
            token,
            &DecodingKey::from_secret(secret.as_ref()),
            &Validation::default(),
        )
        .map_err(|_| AuthError::InvalidToken)?;

        Ok(AuthUser {
            username: token_data.claims.sub,
        })
    }
}

// --- 4. Handlers ---

async fn login(Json(payload): Json<AuthPayload>) -> Result<Json<AuthBody>, AuthError> {
    if payload.username.is_empty() {
        return Err(AuthError::WrongCredentials);
    }

    let claims = Claims {
        sub: payload.username,
        exp: 2000000000, // Year 2033
    };

    let secret = std::env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_ref()),
    )
    .map_err(|_| AuthError::TokenCreation)?;

    Ok(Json(AuthBody {
        access_token: token,
        token_type: "Bearer".to_string(),
    }))
}

// Using the custom extractor directly in the handler signature
async fn profile(auth_user: AuthUser) -> Json<serde_json::Value> {
    Json(serde_json::json!({
        "message": "Welcome to the secret club!",
        "user": auth_user.username
    }))
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    let app = Router::new()
        .route("/login", post(login))
        .route("/profile", get(profile))
        // Serves your frontend from the /static directory
        .fallback_service(ServeDir::new("static"));

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Listening on http://{}", addr);
    
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}