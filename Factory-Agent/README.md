# Factory-Agent 🏭

A multi-agent system that autonomously manages a factory floor. Factory-Agent uses vision models to inspect products for defects, optimizes the assembly line in real-time, and handles logistics and supply chain management to maximize efficiency and reduce waste.

-----

## ✨ Features

  * **Autonomous Factory Management:** Manages the entire manufacturing process, from product inspection to supply chain optimization.
  * **Microscopic Defect Detection:** The **Inspection Agent** utilizes a **vision model** to identify product defects at a microscopic level, ensuring a high standard of quality control.
  * **Supply Chain & Logistics:** The **Logistics Agent** optimizes the supply chain and handles logistics, ensuring a smooth and efficient flow of materials.
  * **Real-time Assembly Optimization:** A **Robotics Control Agent** manages the assembly line, dynamically adjusting operations to maximize throughput.
  * **Data-Driven Decision-Making:** Leverages an **OLAP database** to analyze vast amounts of factory data and a local, fine-tuned **Gemma model** for intelligent decision-making.

-----

### 🛠️ The Full Stack Overview

#### **1. Core Logic & AI (The "Brain")**

* **Language:** [Rust](https://www.rust-lang.org/) (Chosen for memory safety and zero-cost abstractions in industrial settings).
* **Framework:** [Axum](https://github.com/tokio-rs/axum) (High-performance web framework built on the `tokio` ecosystem).
* **AI Inference:** [Candle](https://github.com/huggingface/candle) (A minimalist ML framework for Rust to run **Gemma** and **Vision Models** locally).
* **Task Orchestration:** [Tokio](https://tokio.rs/) (Asynchronous runtime for managing concurrent agents).

#### **2. Frontend Dashboard (The "Control Tower")**

* **Framework:** [SvelteKit](https://kit.svelte.dev/) (For a faster, more lightweight UI than React).
* **Language:** [TypeScript](https://www.typescriptlang.org/) (To ensure type safety across the API boundary).
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (For rapid industrial UI development).
* **Icons:** [Lucide-Svelte](https://lucide.dev/) (For clean, professional factory iconography).

#### **3. Data & Storage (The "Memory")**

* **OLAP Database:** [ClickHouse](https://clickhouse.com/) (Used for the high-speed telemetry and trend analysis from the factory floor).
* **Persistent State:** [MongoDB](https://www.mongodb.com/) (Handles user settings, dashboard configurations, and non-analytical data).
* **Caching/State:** In-memory Rust state (for real-time robotics signals).

#### **4. Infrastructure & Deployment**

* **Containerization:** [Docker](https://www.docker.com/) & **Docker Compose** (Standardizes the environment across ClickHouse, Mongo, and your apps).
* **Communication:** **REST API** (Current) / **WebSockets** (Recommended for live sensor data).
* **Environment:** `.env` (Secure handling of model paths and database credentials).

-----

## 🚀 Getting Started

### Prerequisites

  * Rust
  * Node.js (for SvelteKit)
  * Access to a compatible OLAP database

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saadsalmanakram/Factory-Agent.git
    cd Factory-Agent
    ```
2.  **Set up the backend:**
    ```bash
    cargo build --release
    ```
3.  **Set up the frontend:**
    ```bash
    cd frontend
    npm install
    ```
4.  **Configure the OLAP database:**
    Follow the instructions in the documentation to connect the agent to your OLAP database.

### Configuration

Create a `.env` file to store your API keys and configuration variables for the Gemma model and other services.

### Usage

Run the Rust backend and the SvelteKit frontend to begin autonomous factory management and optimization.

-----

To wrap everything up, here is the complete, final file structure for **Factory-Agent**. This reflects the modular Rust backend (Agents + AI), the SvelteKit frontend, and the orchestration layers we've built.

### 🏗️ Project Structure

```text
Factory-Agent/
├── backend/                   # Rust Multi-Agent Core
│   ├── src/
│   │   ├── agents/            # Logic for individual agents
│   │   │   ├── mod.rs         # Module exports
│   │   │   ├── inspection.rs  # Vision & Defect Detection
│   │   │   ├── logistics.rs   # Supply Chain & Inventory
│   │   │   └── robotics.rs    # Assembly Line & Actuator Control
│   │   ├── models/            # AI Integration
│   │   │   ├── mod.rs
│   │   │   └── gemma.rs       # Gemma LLM Inference (Candle)
│   │   ├── db/                # Database Connectors
│   │   │   ├── mod.rs
│   │   │   ├── clickhouse.rs  # OLAP Analytics Logic
│   │   │   └── mongodb.rs     # MERN State Persistence
│   │   └── main.rs            # Axum Server & Orchestrator
│   ├── Cargo.toml             # Rust dependencies (Axum, Tower-HTTP, Candle)
│   ├── Dockerfile             # Multistage Rust build
│   └── .env                   # API Keys, DB URLs, Model Paths
├── frontend/                  # SvelteKit Dashboard
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/    # Reusable UI parts
│   │   │   │   ├── InspectionMonitor.svelte
│   │   │   │   ├── LogisticsChart.svelte
│   │   │   │   ├── RoboticsControl.svelte
│   │   │   │   └── AIReasoning.svelte
│   │   │   └── api.ts         # Fetch logic to talk to Rust
│   │   ├── routes/
│   │   │   └── +page.svelte   # Main Control Center UI
│   │   └── app.d.ts
│   ├── static/                # Assets & Icons
│   ├── tailwind.config.js     # Styling configuration
│   ├── package.json           # Frontend dependencies
│   └── Dockerfile             # Node.js/Svelte build
├── models/                    # Local AI Weights
│   └── gemma-2b-it.gguf       # Local LLM file (ignore in git)
├── scripts/                   # Utility scripts
│   └── init_olap.sql          # Initial ClickHouse schema
├── docker-compose.yml         # Full stack orchestration
└── README.md                  # Project documentation

```

---