
---

# Multi-Format Static File Server (Axum) 🦀

Part of **The-Rust-Loom** collection by [saadxsalman](https://github.com/saadxsalman).

An efficient, asynchronous file server built with **Axum** and **Tower-HTTP**. This project demonstrates how to serve static assets while providing dynamic, custom-headered file downloads.

## 🚀 Overview

This server serves a frontend built with **Tailwind CSS** and provides two distinct ways of handling files:
1.  **Static Serving:** Automatically serving HTML, CSS, and JS from a local directory using `ServeDir`.
2.  **Dynamic Downloads:** A custom route that uses `Path` extractors and manual `Response` building to force browser downloads via `Content-Disposition`.



## 🛠️ Features

-   **High Performance:** Built on `tokio` and `axum` for non-blocking I/O.
-   **Safe File Handling:** Basic protection against directory traversal attacks.
-   **MIME Detection:** Uses `mime_guess` to automatically set `Content-Type` headers based on file extensions.
-   **Environment Configuration:** Managed via `.env` and `dotenvy`.
-   **Modern UI:** A clean, responsive dashboard using Tailwind CSS CDN.

## 📦 Tech Stack

-   **Language:** Rust
-   **Framework:** Axum v0.8
-   **Runtime:** Tokio
-   **Middleware:** Tower-HTTP (fs feature)
-   **Styling:** Tailwind CSS (CDN)

## 🏗️ Getting Started

### Prerequisites
-   Rust (latest stable version)
-   `cargo`

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/saadxsalman/multi_format_server.git](https://github.com/saadxsalman/multi_format_server.git)
   cd multi_format_server

```

2. Configure environment:
Create a `.env` file in the root:
```env
PORT=3000
STATIC_DIR=static

```


3. Run the project:
```bash
cargo run

```



## 📂 Project Structure

```text
.
├── src/
│   └── main.rs          # Axum router and download logic
├── static/
│   └── index.html       # Frontend dashboard
├── .env                 # Environment variables
├── .gitignore           # Git ignore rules
└── Cargo.toml           # Project dependencies

```

## 🧠 Concepts Learned

### `tower_http::services::ServeDir`

Utilized as a `fallback_service` to automatically map the filesystem to URL paths. If a route isn't explicitly defined, Axum looks in the `static/` folder.

### Manual Response Building

The `/download/{filename}` route demonstrates how to bypass standard rendering and use `Response::builder()` to inject specific headers like `CONTENT_DISPOSITION`.

### Axum 0.8 Route Syntax

This project utilizes the latest `{capture}` syntax for path parameters, ensuring compatibility with the most recent Rust ecosystem updates.

---

Built with ❤️ by [saadxsalman](https://www.google.com/url?sa=E&source=gmail&q=https://github.com/saadxsalman)

 