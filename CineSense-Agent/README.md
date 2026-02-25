# CineSense-Agent 🎬🍿

A system that goes beyond simple recommendations to actively craft a hyper-personalized cinematic experience. CineSense-Agent analyzes a user's emotional state, viewing history, and real-time biometric data to generate a custom movie trailer, script, or short film tailored to their current mood and preferences.

## ✨ Features

  * **Emotion-Driven Content Generation:** An "Emotion Agent" processes real-time user data to gauge emotional state, which then informs the creative output.
  * **Multi-Modal Analysis:** Utilizes **VideoMAE-v2** to analyze video, **AudioCLIP** to understand audio cues, and a vision model to track facial expressions and gaze for a comprehensive understanding of user engagement.
  * **AI-Powered Creative Synthesis:** A "Creative Agent" uses a large language model like **Llama-3** for scriptwriting, while a "Synthesis Agent" combines video and audio generation models to produce the final, bespoke output.
  * **Semantic Cinematic Retrieval:** Creates a vector space of cinematic concepts and styles, allowing the system to intelligently retrieve and combine elements from a vast library of films.
  * **Real-time Processing:** The core backend, built with **Rust**, ensures low-latency, real-time processing of multi-modal inputs, facilitated by **tRPC** for efficient communication.

## ⚙️ Tech Stack

### 1. High-Performance Core (Processing)

* **Language:** **Rust**
* *Why:* Used for the `core-engine` to handle high-frequency data streams (biometrics/video) with zero-cost abstractions and memory safety.


* **Computer Vision:** **OpenCV (Rust Bindings)**
* *Why:* Real-time frame capture, normalization, and pre-processing before sending data to AI models.


* **Concurrency:** **Tokio**
* *Why:* Asynchronous runtime to manage multi-modal input channels without blocking the execution thread.



### 2. AI & Inference Layer (Intelligence)

* **Language:** **Python 3.10+**
* **Video Analysis:** **VideoMAE-v2**
* *Why:* A state-of-the-art masked autoencoder that excels at understanding temporal actions and micro-expressions.


* **Audio Analysis:** **AudioCLIP**
* *Why:* Multi-modal version of CLIP that understands the relationship between audio frequencies and concepts/emotions.


* **Creative Logic:** **Llama-3 (8B or 70B)**
* *Why:* Advanced reasoning capabilities for translating emotion vectors into structured cinematic screenplays.


* **Model Serving:** **FastAPI + Uvicorn**
* *Why:* Provides a high-performance bridge for the Rust engine to "talk" to the Python models via local POST requests.



### 3. Orchestration & API (The Glue)

* **Framework:** **Node.js & Express**
* **Communication:** **tRPC**
* *Why:* Provides end-to-end type safety between the backend and frontend. It eliminates the need for manual API documentation and prevents runtime errors.


* **Validation:** **Zod**
* *Why:* Strict schema validation for all data moving between the user and the agents.



### 4. Database & Semantic Retrieval

* **Database:** **MongoDB Atlas**
* **Vector Engine:** **Atlas Vector Search**
* *Why:* Allows for "Semantic Cinematic Retrieval." We store cinematic styles as high-dimensional vectors and retrieve them using cosine similarity based on the user's emotion.



### 5. Frontend & UI (Experience)

* **Framework:** **Next.js 14+ (App Router)**
* **Language:** **TypeScript**
* **Styling:** **Tailwind CSS**
* **Icons & UI:** **Lucide React** & **Framer Motion**
* *Why:* Used to animate the real-time "Emotion Heatmaps" and the smooth transition of generated scripts.



### 6. DevOps & Deployment

* **Containerization:** **Docker & Docker Compose**
* *Why:* Manages the complex environment requirements (CUDA for Python, OpenCV for Rust, and Node packages) in a single command.


* **Hardware Acceleration:** **NVIDIA Container Toolkit**
* *Why:* Enables the Docker containers to access your local GPU for real-time AI inference.

## 🚀 Getting Started

### Prerequisites

  * Rust
  * Python 3.10+
  * Node.js (for a potential front-end)
  * Access to the Llama-3 API

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saadsalmanakram/CineSense-Agent.git
    cd CineSense-Agent
    ```
2.  **Set up the Rust backend:**
    ```bash
    cargo build --release
    ```
3.  **Set up the Python environment:**
    ```bash
    # Install required Python libraries
    pip install -r requirements.txt
    ```

### Configuration

Create a `.env` file to store your API keys and configuration variables for models like Llama-3.

```ini
LLAMA_API_KEY=your_llama3_api_key
```

### Usage

To start the CineSense-Agent, run the main executable and provide it with user input, such as biometric data streams or viewing history.

```bash
./target/release/cinesense-agent --user-data-stream-path /path/to/data.json
```

---

To wrap everything up, here is the finalized, comprehensive directory structure for **CineSense-Agent**. This structure organizes your multi-language stack (Rust, Python, TypeScript) into a clean, modular monorepo that is ready for Docker orchestration.

### 📂 Project Structure

```text
CineSense-Agent/
├── apps/
│   ├── web/                    # Next.js (Frontend)
│   │   ├── src/
│   │   │   ├── components/     # UI: Dashboard, VideoPlayer, EmotionChart
│   │   │   ├── hooks/          # Custom hooks for tRPC and WebSockets
│   │   │   ├── utils/          # tRPC client configuration
│   │   │   └── app/            # App Router (Pages & Layouts)
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   └── server/                 # Node.js/Express (Orchestrator)
│       ├── src/
│       │   ├── trpc/           # Router definitions & Procedures
│       │   ├── services/       # Llama-3 API & Vector Search logic
│       │   ├── models/         # MongoDB Mongoose schemas
│       │   └── index.ts        # Entry point
│       ├── tsconfig.json
│       └── package.json
│
├── core-engine/                # Rust (Data Processing)
│   ├── src/
│   │   ├── main.rs             # OpenCV loop & Buffer streaming
│   │   ├── emotion_agent/      # Biometric normalization logic
│   │   └── fusion/             # Perceiver IO data prep
│   ├── Cargo.toml
│   └── Cargo.lock
│
├── models/                     # Python (AI Inference)
│   ├── video_mae/              # VideoMAE-v2 weights & logic
│   ├── audioclip/              # AudioCLIP weights & logic
│   ├── inference_server.py     # FastAPI server (the bridge)
│   ├── requirements.txt        # AI dependencies
│   └── Dockerfile              # GPU-enabled container config
│
├── scripts/                    # Utility scripts for data seeding
│   └── seed_concepts.ts        # Script to upload movie vectors to MongoDB
│
├── .env                        # API keys & DB URIs
├── docker-compose.yml          # Full system orchestration
└── README.md                   # Project documentation

```

---