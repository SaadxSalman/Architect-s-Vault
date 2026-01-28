
---

# Axum JWT Authentication Service 🦀

A high-performance, stateless authentication microservice built with **Rust** and the **Axum 0.8** framework. This project demonstrates "Level 2 Mastery" of Axum by implementing a custom **FromRequestParts** extractor for secure JWT validation.

## 🚀 Key Features

* **Axum 0.8 Compatibility**: Leverages native `async fn` in traits (no `async_trait` macro required).
* **Custom Extractor**: Decoupled authentication logic using a custom `AuthUser` extractor.
* **Stateless Security**: Uses `jsonwebtoken` with the `rust_crypto` backend for high portability.
* **Robust Error Handling**: Centralized error mapping to consistent JSON responses.

---

## 🛠️ Tech Stack

* **Framework**: [Axum](https://github.com/tokio-rs/axum)
* **Runtime**: [Tokio](https://tokio.rs/)
* **JWT Implementation**: [jsonwebtoken](https://github.com/Keats/jsonwebtoken)
* **Serialization**: [Serde](https://serde.rs/)
* **Environment Management**: [Dotenvy](https://github.com/allan2/dotenvy)

---

## ⚙️ Setup & Installation

1. **Clone the repository:**
```bash
git clone https://github.com/saadxsalman/axum-jwt-auth.git
cd axum-jwt-auth

```


2. **Configure Environment:**
Create a `.env` file in the root directory:
```env
JWT_SECRET=your_super_secret_key_here

```


3. **Run the Server:**
```bash
cargo run

```


The server will start at `http://127.0.0.1:3000`.

---

## 🧪 Testing the API

### Option A: PowerShell (Recommended)

Open PowerShell and run the following commands to test the login and protected route:

```powershell
# 1. Login to get your token
$res = Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:3000/login" `
    -ContentType "application/json" -Body '{"username": "saadxsalman"}'

# 2. Access the protected profile
Invoke-RestMethod -Method Get -Uri "http://127.0.0.1:3000/profile" `
    -Headers @{ Authorization = "Bearer $($res.access_token)" }

```

### Option B: Windows CMD

```cmd
:: 1. Get the token
curl -X POST http://127.0.0.1:3000/login -H "Content-Type: application/json" -d "{\"username\": \"saadxsalman\"}"

:: 2. Access profile (replace TOKEN)
curl http://127.0.0.1:3000/profile -H "Authorization: Bearer YOUR_TOKEN_HERE"

```

---

## 📖 How it Works

### The Custom Extractor

The core of this project is the `AuthUser` struct. It implements `FromRequestParts`, allowing us to protect any route simply by adding `auth_user: AuthUser` to the function arguments:

```rust
async fn profile(auth_user: AuthUser) -> Json<Value> {
    // This code only runs if the JWT is valid!
    Json(json!({ "user": auth_user.username }))
}

```

---
