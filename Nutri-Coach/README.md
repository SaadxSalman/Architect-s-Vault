# Nutri-Coach ⌚🥗

An evolution of the NutriGPT+ project, Nutri-Coach is an agent that provides a truly personalized wellness experience. It not only tracks nutrition but also uses real-time biometric data from wearables to suggest workouts, manage stress, and optimize sleep, acting as a complete wellness coach.

-----

## ✨ Features

  * **Real-Time Biometric Analysis:** The **Data Ingestion Agent** processes data from wearables to understand a user's current physical state.
  * **Personalized Wellness Planning:** The **Wellness Planning Agent** creates custom schedules for workouts, nutrition, and sleep based on individual biometric data and goals.
  * **Proactive Coaching:** The **Coaching Agent** provides real-time motivation and guidance, adapting its advice based on the user's performance and biometrics.
  * **AI-Powered Nutrition:** A **vision model** and a **SAM-adapted model** can analyze food from a picture to provide an instant nutritional breakdown.
  * **Contextual Wellness Retrieval:** Uses **RAG (Retrieval-Augmented Generation)** with **LangChain** and **Qdrant** to provide contextually relevant wellness information.
  * **On-Device Data Privacy:** The core logic is built with **Rust and Tokio** for high-performance processing, while **LanceDB** is used for secure, on-device data storage.

-----

### 🖥️ Frontend (The User Experience)

* **Framework:** [SvelteKit](https://kit.svelte.dev/) (chosen for its minimal overhead and excellent reactive state management).
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) with Lucide-Svelte for icons.
* **Visualization:** [Chart.js](https://www.chartjs.org/) for real-time biometric streaming.
* **State Management:** Svelte Stores for handling real-time coaching notifications and session tokens.

### ⚙️ High-Performance Core (The "Brain")

* **Language:** [Rust](https://www.rust-lang.org/) with the [Tokio](https://tokio.rs/) runtime for asynchronous data ingestion.
* **Agent Logic:** Custom Rust modules for threshold detection and "proactive" wellness triggers.
* **Vision Inference:** [ONNX Runtime (`ort`)](https://www.google.com/search?q=%5Bhttps://ort.rs/%5D(https://ort.rs/)) running the Segment Anything Model (SAM) locally.
* **Local Storage:** [LanceDB](https://lancedb.com/) for high-speed, on-device biometric vector and tabular storage.
* **Web Layer:** [Axum](https://github.com/tokio-rs/axum) for ultra-fast internal APIs.

### 🌐 Management & Auth (The Orchestrator)

* **Runtime:** [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/).
* **Database:** [MongoDB](https://www.mongodb.com/) (Atlas or local) via Mongoose for user profiles and long-term history.
* **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/) and Bcrypt for secure user access.
* **Proxy:** Acts as a bridge between the SvelteKit frontend and the Rust Vision service.

### 🧠 AI & Vector Infrastructure

* **Vector Database:** [Qdrant](https://qdrant.tech/) (running in Docker) for RAG-based wellness retrieval.
* **RAG Framework:** [LangChain](https://www.langchain.com/) (Node or Rust-based implementation) to connect embeddings with knowledge.
* **Models:** * **Text/Coach:** GPT-4o or Claude 3.5 Sonnet (via API).
* **Vision:** SAM (Segment Anything Model) for food segmentation.
* **Embeddings:** `text-embedding-3-small` (OpenAI).

-----

## 🚀 Getting Started

### Prerequisites

  * Rust
  * Node.js (for SvelteKit)
  * Docker (for Qdrant)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saadsalmanakram/Nutri-Coach.git
    cd Nutri-Coach
    ```
2.  **Start Docker containers:**
    ```bash
    docker-compose up -d
    ```
3.  **Build the Rust backend:**
    ```bash
    cargo build --release
    ```
4.  **Set up the frontend:**
    ```bash
    cd frontend
    npm install
    ```

### Configuration

Create a `.env` file to store your API keys and configuration variables for the multimodal models and other services.

### Usage

Run the Rust backend and the SvelteKit frontend to begin your personalized wellness journey.

-----

This is the final, comprehensive directory structure for **Nutri-Coach**. It integrates the high-performance Rust core, the Node.js authentication layer, the SvelteKit frontend, and the AI model storage.

```text
Nutri-Coach/
├── backend-rust/                # High-Performance Core (Tokio/Rust)
│   ├── src/
│   │   ├── agents/              # AI Logic & Persona
│   │   │   ├── mod.rs
│   │   │   └── coach.rs         # System Prompts & Proactive Logic
│   │   ├── services/            # Infrastructure Bridges
│   │   │   ├── mod.rs
│   │   │   ├── vector_store.rs  # Qdrant RAG logic
│   │   │   ├── biometric_db.rs  # LanceDB on-device storage
│   │   │   └── food_sam.rs      # ONNX/SAM Inference
│   │   └── main.rs              # Axum API & Ingestion Worker
│   ├── models/                  # AI Weight Files
│   │   ├── sam_encoder.onnx
│   │   └── sam_decoder.onnx
│   ├── data/                    # Local Database Files
│   │   └── biometrics.lance/    # LanceDB Binary data
│   ├── Cargo.toml
│   └── .env
├── backend-node/                # User & Orchestration Layer (MERN)
│   ├── src/
│   │   ├── middleware/
│   │   │   └── auth.js          # JWT Verification
│   │   ├── models/
│   │   │   ├── User.js          # MongoDB Schema
│   │   │   └── Meal.js          # Nutrition History
│   │   ├── routes/
│   │   │   ├── authRoutes.js    # Login/Register
│   │   │   └── visionRoutes.js  # Proxy to Rust SAM Service
│   │   └── index.js             # Express Entry Point
│   ├── package.json
│   └── .env
├── frontend/                    # User Interface (SvelteKit)
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/      # UI Atoms/Molecules
│   │   │   │   ├── LiveChart.svelte
│   │   │   │   ├── CoachBubble.svelte
│   │   │   │   └── FoodScanner.svelte
│   │   │   └── api.ts           # Axios/Fetch Wrappers
│   │   └── routes/
│   │       ├── +layout.svelte   # App Shell & Tailwind
│   │       └── +page.svelte     # Main Dashboard
│   ├── tailwind.config.js
│   └── svelte.config.js
├── docker-compose.yml           # Qdrant & MongoDB Orchestration
└── .gitignore                   # Excluding /data, /node_modules, /target

```

---