# Agri-Agent 🧑‍🌾🌱☀️

A fully autonomous agent that revolutionizes agriculture by using real-time satellite imagery, local weather data, and soil sensor readings to manage farming operations. Agri-Agent predicts crop yields, recommends precise watering schedules, and even dispatches autonomous drones for targeted pest control, all to optimize crop health and maximize output.

-----

## ✨ Features

  * **Autonomous Farm Management:** Operates as a complete system, from data collection to physical action, autonomously handling critical farming tasks.
  * **Multi-Source Data Integration:** Gathers and processes data from diverse sources including satellite imagery, local weather forecasts, and on-site soil sensors.
  * **Predictive Modeling:** The **Predictive Agent** runs advanced simulations to forecast crop yields and anticipate potential issues before they arise.
  * **Targeted Robotics:** A **Robotics Agent** controls autonomous drones for precise pest control and manages irrigation systems for optimal water usage.
  * **Advanced Vision Capabilities:** Utilizes a **LiquidAI vision-language model** fine-tuned on agricultural data to identify crop health issues, such as nutrient deficiencies, water stress, and pest infestations.
  * **Context-Aware Recommendations:** Creates a sophisticated vector space of agricultural practices and plant biology using **Qdrant**, allowing the system to provide hyper-localized, context-aware recommendations.

-----

## ⚙️ Tech Stack

### **1. Autonomous Core (The "Brain & Muscles")**

* **Language:** [Rust](https://www.rust-lang.org/)
* **Why:** Provides memory safety and high performance required for processing high-frequency sensor data and satellite imagery without the overhead of a garbage collector.


* **Concurrency:** [Tokio](https://tokio.rs/)
* **Why:** An asynchronous runtime that allows the "Robotics Agent" to manage dozens of drones and irrigation zones simultaneously in a non-blocking manner.


* **Networking:** `reqwest` & `Serde`
* **Why:** For type-safe handling of JSON data from Weather and Satellite APIs.



### **2. Intelligence Layer (The "Vision & Memory")**

* **VLM:** [LiquidAI](https://www.liquid.ai/) (Fine-tuned)
* **Why:** Liquid structural models are highly efficient at processing long-form environmental data and visual inputs, making them superior for identifying crop stressors in varying light/weather.


* **Vector Database:** [Qdrant](https://qdrant.tech/)
* **Why:** Stores high-dimensional embeddings of agricultural biology. It allows the agent to perform "Semantic Retrieval"—matching a visual symptom (e.g., yellowing leaves) to a specific localized treatment.


* **Embeddings:** `sentence-transformers` (Python)
* **Why:** To convert raw agricultural text into vectors during the data-seeding phase.



### **3. API & Orchestration (The "Bridge")**

* **Runtime:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
* **Why:** Acts as the middleware gateway. It handles user authentication and serves as the CRUD layer for historical telemetry data stored in MongoDB.


* **Authentication:** [JWT](https://jwt.io/) & [Bcrypt.js]
* **Why:** Ensures secure communication between the dashboard and the robotics controller.


* **Database:** [MongoDB](https://www.mongodb.com/)
* **Why:** Flexible schema-less storage for diverse data types like soil logs, drone flight paths, and user profiles.



### **4. Command Center (The "Eyes")**

* **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
* **Why:** Provides Server-Side Rendering (SSR) for fast initial loads of complex data dashboards.


* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Why:** Prevents "undefined" errors when dealing with complex real-time telemetry objects.


* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Why:** Rapidly build a responsive, "glassmorphic" agricultural dashboard that works on mobile (for farmers in the field) and desktop.


* **Icons:** [Lucide React](https://lucide.dev/)
* **Why:** Clean, consistent iconography for drones, weather, and sensors.



### **5. Infrastructure & DevSecOps**

* **Containerization:** [Docker](https://www.docker.com/) & **Docker Compose**
* **Why:** Ensures that the Qdrant and MongoDB environments are identical across development and production.


* **Task Scheduling:** `mpsc` (Multi-Producer, Single-Consumer) Channels
* **Why:** A Rust pattern for safe communication between the "Predictive Brain" and the "Robotics Actuators."



---

## 📊 Summary Table

| Layer | Technology | Primary Purpose |
| --- | --- | --- |
| **Logic** | Rust / Tokio | Real-time multi-agent orchestration. |
| **Vision** | LiquidAI | Analyzing drone/satellite images for disease. |
| **Memory** | Qdrant | Vector-search for biology & best practices. |
| **Storage** | MongoDB | Historical logs and user data. |
| **Gateway** | Express.js | Secure API access and data routing. |
| **UI** | Next.js | Live-monitoring dashboard and manual overrides. |

-----

## 🚀 Getting Started

### Prerequisites

  * Rust
  * Node.js (for Next.js)
  * Docker (for Qdrant)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saadsalmanakram/Agri-Agent.git
    cd Agri-Agent
    ```
2.  **Set up the backend:**
    Navigate to the `backend/` directory and build the Rust project.
    ```bash
    cargo build --release
    ```
3.  **Set up the frontend:**
    Navigate to the `frontend/` directory and install dependencies.
    ```bash
    npm install
    ```
4.  **Start Docker containers:**
    Use the provided `docker-compose.yml` to run the Qdrant instance.

### Configuration

Configure API keys for satellite imagery services and other necessary environmental variables in a `.env` file.

### Usage

Run the main executable and the Next.js server. The system will then begin autonomous operations based on the configured inputs.

-----

To wrap everything up for the **Agri-Agent** repository, here is the consolidated and final file structure. This architecture ensures a clean separation between the **High-Performance Engine (Rust)**, the **API Bridge (Node/Express)**, and the **User Interface (Next.js)**.

### 📂 Repository Structure

```text
Agri-Agent/
├── backend-engine/              # 🦀 RUST: Core Autonomous Logic
│   ├── src/
│   │   ├── agents/
│   │   │   ├── mod.rs
│   │   │   ├── robotics.rs      # Drone & Irrigation control (Tokio)
│   │   │   └── predictive.rs    # Yield & Health simulations
│   │   ├── services/
│   │   │   ├── mod.rs
│   │   │   ├── qdrant.rs        # Vector DB search logic
│   │   │   ├── vision.rs        # LiquidAI VLM client
│   │   │   └── weather.rs       # OpenWeather/Satellite API
│   │   └── main.rs              # Orchestrator & Task Scheduler
│   └── Cargo.toml
├── backend-api/                 # 🟢 NODE: Express Gateway & Auth
│   ├── src/
│   │   ├── controllers/
│   │   │   └── auth.js          # JWT & Login logic
│   │   ├── models/
│   │   │   ├── User.js          # MongoDB User schema
│   │   │   └── Telemetry.js     # Farm data history
│   │   ├── routes/
│   │   └── server.js            # Express entry point
│   └── package.json
├── frontend/                    # 🔵 NEXT.JS: Dashboard UI
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/auth/        # NextAuth.js handlers
│   │   │   ├── dashboard/       # Protected dashboard pages
│   │   │   └── login/           # Authentication UI
│   │   ├── components/          # UI components (Lucide icons)
│   │   └── middleware.ts        # Route protection logic
│   └── tailwind.config.ts
├── ai-training/                 # 🤖 AI: Fine-tuning & Seeding
│   ├── dataset/                 # Images & metadata.jsonl
│   ├── scripts/
│   │   ├── seed_qdrant.py       # Knowledge base injector
│   │   └── finetune_vlm.py      # LiquidAI training script
│   └── requirements.txt
├── docker-compose.yml           # Qdrant & MongoDB infrastructure
└── .env.example                 # Template for API keys

```

---