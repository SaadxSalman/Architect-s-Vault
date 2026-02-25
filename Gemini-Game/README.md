# Gemini-Game 🎮

An AI agent for video games that learns and adapts like a human player. Gemini-Game doesn't rely on scripted behavior but develops its own strategies, providing a truly dynamic and unpredictable opponent that offers a fresh challenge with every playthrough.

-----

## ✨ Features

  * **Human-like Adaptability:** Learns from gameplay experience to develop new strategies and counter-tactics.
  * **Perceptual Awareness:** A **Perception Agent** uses a **vision model** to directly interpret the game state from the screen, making it game-engine independent.
  * **Strategic Planning:** A **Strategy Agent** uses a large-scale model like **Gemma-3** for high-level strategic planning and decision-making.
  * **Reinforcement Learning:** A **Learning Agent** updates the model based on the outcomes of its actions, improving its performance over time.
  * **High-Performance Execution:** The core logic is built with **Rust** for real-time, low-latency execution, ensuring the agent can keep up with fast-paced games.
  * **Vector-Based State Representation:** Creates a specialized **embedding space** for game states and actions, facilitating efficient reinforcement learning.

-----

## ⚙️ Tech Stack

#### 1. Core Engine (The "Body")

* **Language:** **Rust** (Edition 2024) — Chosen for memory safety and zero-cost abstractions during high-frequency game loops.
* **Perception:** **OpenCV (Rust Bindings)** — Used for real-time frame capturing and basic image preprocessing (resizing to  for Gemma-3 compatibility).
* **Input Simulation:** **Enigo** — Simulates low-level OS events for mouse and keyboard without being detected by basic anti-cheat software.
* **Networking:** **Tokio + Reqwest** — Asynchronous runtime to handle non-blocking API calls to the Brain-API.

#### 2. Intelligence Layer (The "Brain")

* **Strategic Model:** **Gemma-3 (4B or 12B variant)** — A multimodal model that natively understands images and text. It processes game frames as "soft tokens" to generate high-level strategy.
* **Learning Framework:** **GRPO (Group Relative Policy Optimization)** — Implemented in Python via the **TRL (Transformer Reinforcement Learning)** library.
* *Why GRPO?* It eliminates the need for a separate "Value Model," making it 50% more memory-efficient than PPO for training gaming agents on a single GPU.


* **Inference:** **FastAPI + vLLM** — Provides a high-throughput OpenAI-compatible endpoint for the Rust core.

#### 3. Orchestration & Data (The "Memory")

* **Runtime:** **Node.js (v22+)** with **TypeScript**.
* **Database:** **MongoDB** — Stores "Decision Objects" which contain the state (), the action (), the raw "thought" from Gemma-3, and the reward () used for GRPO.
* **Real-time Bridge:** **Socket.io** — Streams the agent's internal reasoning (the `<think>` tags) from the backend directly to the dashboard.

#### 4. Web Dashboard (The "Interface")

* **Framework:** **Next.js 15** (App Router).
* **Styling:** **Tailwind CSS** + **Shadcn/UI** — For a high-performance, dark-themed "Command Center" aesthetic.
* **Visualization:** **Recharts** — To plot reward curves and "Confidence" levels of the agent in real-time.

---

### 📊 Summary Table

| Layer | Technology | Primary Function |
| --- | --- | --- |
| **Execution** | Rust |  screen capture & input |
| **Cognition** | Gemma-3 | Visual reasoning & Strategy planning |
| **Optimization** | GRPO | Learning from group-relative rewards |
| **Storage** | MongoDB | Logging trajectory data for training |
| **Monitoring** | Next.js | Live "Thought Stream" & Manual Override |

-----

## 🚀 Getting Started

### Prerequisites

  * Rust
  * Python 3.10+ (for training and model inference)
  * Access to the Gemma-3 model

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saadsalmanakram/Gemini-Game.git
    cd Gemini-Game
    ```
2.  **Build the Rust core:**
    ```bash
    cargo build --release
    ```
3.  **Set up the training environment:**
    Follow the instructions in the `training/` directory to install the necessary Python libraries and configure the reinforcement learning environment.

### Configuration

Create a `.env` file to store API keys and other environment variables required for running the agent.

### Usage

Run the main executable and point it to the game's video stream to begin the real-time analysis and gameplay.

-----

Here is the finalized, comprehensive file structure for **Gemini-Game**. This organization separates the high-performance Rust core, the Python AI services, the Node.js orchestration layer, and the Next.js frontend into a clean, professional monorepo.

### 📂 Project Structure

```text
Gemini-Game/
├── core-engine/                # RUST: High-performance Execution
│   ├── src/
│   │   ├── main.rs             # Agent orchestrator & Loop
│   │   ├── perception.rs       # OpenCV Screen capture & Vision API client
│   │   ├── controller.rs       # Input simulation (Keyboard/Mouse)
│   │   └── state_bridge.rs     # HTTP/WS Client to send telemetry to Brain-API
│   ├── Cargo.toml              # Dependencies: opencv, enigo, tokio, reqwest
│   └── .env                    # Local Rust configs
│
├── brain-api/                  # NODE.JS/TS: Orchestration & Data
│   ├── src/
│   │   ├── models/
│   │   │   └── Session.ts      # MongoDB Schema (Decisions, Thoughts, Rewards)
│   │   ├── lib/
│   │   │   └── websocket.ts    # Socket.io setup for Dashboard syncing
│   │   ├── routes/
│   │   │   ├── telemetry.ts    # Receives data from Rust
│   │   │   └── reward.ts       # Endpoint for Manual/AI feedback
│   │   └── server.ts           # Express entry point
│   ├── package.json
│   └── tsconfig.json
│
├── dashboard/                  # NEXT.JS: Real-time UI
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx        # Main Live Monitor View
│   │   │   └── layout.tsx      # Global Styles & Providers
│   │   ├── components/
│   │   │   ├── ThoughtStream.tsx # Scrolling list of Gemma-3 thoughts
│   │   │   ├── RewardButton.tsx  # Feedback buttons for GRPO
│   │   │   └── StatsChart.tsx    # Recharts for Health/Performance
│   │   └── lib/
│   │       └── socket-client.ts # Socket.io initialization
│   ├── tailwind.config.ts
│   └── next.config.js
│
├── models/                     # PYTHON: AI Inference & Learning
│   ├── inference_server.py     # FastAPI: Gemma-3 & Vision Model server
│   ├── training_agent.py       # GRPO logic: Reward calculation & weight updates
│   ├── utils/
│   │   └── embeddings.py       # Custom vector space logic
│   └── requirements.txt        # torch, transformers, fastapi, pymongo
│
├── .env                        # Global: API Keys (GEMMA_API_KEY, MONGO_URI)
├── docker-compose.yml          # Optional: To spin up MongoDB and API quickly
└── README.md                   # Project documentation

```

---