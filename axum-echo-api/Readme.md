
---

# Axum Echo API 🦀

A high-performance, type-safe "Echo" service built with **Rust** and the **Axum** web framework. This project demonstrates core web development concepts in Rust, including JSON extraction, routing, and serving static frontend files.

## 🚀 Features

* **JSON Echo Endpoint**: Accepts a JSON payload and returns it with a server-side timestamp.
* **Health Check**: A simple GET endpoint to monitor service uptime.
* **Static File Serving**: Serves a Tailwind CSS-powered frontend directly from the Rust binary.
* **Environment Configuration**: Uses `.env` files for port and host management.
* **Type Safety**: Leverages `Serde` for strict JSON schema validation.

## 🛠️ Tech Stack

* **Backend**: [Axum](https://github.com/tokio-rs/axum) (Web Framework), [Tokio](https://tokio.rs/) (Async Runtime)
* **Serialization**: [Serde](https://serde.rs/)
* **Frontend**: HTML5, JavaScript (ES6+), [Tailwind CSS CDN](https://tailwindcss.com/)
* **Time Handling**: [Chrono](https://github.com/chronotope/chrono)

## 📂 Project Structure

```text
axum-echo-api/
├── src/
│   └── main.rs          # Axum server logic & handlers
├── static/
│   └── index.html       # Frontend UI
├── .env                 # Environment variables
├── .gitignore           # Git exclusion rules
└── Cargo.toml           # Rust dependencies

```

## ⚡ Quick Start

### 1. Prerequisites

Ensure you have the Rust toolchain installed:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

```

### 2. Installation & Run

Clone the project and start the server:

```bash
# Clone the repository (if applicable)
# git clone https://github.com/saadxsalman/axum-echo-api.git
# cd axum-echo-api

# Run the project
cargo run

```

### 3. Usage

1. Open your browser to `http://127.0.0.1:3000`.
2. Enter a message in the input field.
3. Click **"Send POST Request"** to see the JSON response from the Rust backend.

## 📡 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/health` | Returns `{"status": "ok"}` |
| `POST` | `/echo` | Returns the input JSON + `processed_at` |
| `GET` | `/` | Serves the frontend `index.html` |

### Sample POST Request

```json
{
  "message": "Hello from Axum!",
  "author": "saadxsalman"
}

```

### Sample POST Response

```json
{
  "message": "Hello from Axum!",
  "author": "saadxsalman",
  "processed_at": "2026-01-13T14:05:15Z"
}

```

## 📝 Learning Notes

This project covers the fundamental Axum handler signature:

```rust
async fn handler(Json(payload): Json<T>) -> impl IntoResponse

```

Unlike Node.js/Express, where middleware like `body-parser` is often configured globally, Axum uses **Extractors** to parse data directly in the function arguments, providing compile-time guarantees that the data matches your expected structure.

---

Created by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)
