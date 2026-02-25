# Bio-Stat-Agent: Autonomous Biostatistics and Public Health Modeler 📈🩺

An agentic system that can autonomously design and execute biostatistical analyses for public health. Given a high-level research question, Bio-Stat-Agent gathers data from public health databases, selects and applies appropriate statistical models, and generates a comprehensive report with visualizations, making complex public health research accessible and efficient.

-----

## ✨ Features

  * **Autonomous Research:** The system handles the entire research workflow from a high-level question to a final report.
  * **Intelligent Data Retrieval:** A **Data Retrieval Agent** connects to public health databases to gather relevant, up-to-date information.
  * **Hypothesis Formulation:** A **Hypothesis Agent** translates natural language research questions into formal statistical hypotheses.
  * **Sophisticated Modeling:** The **Modeling Agent** selects and runs appropriate biostatistical analyses, including correlation studies and epidemic modeling.
  * **Comprehensive Reporting:** The **Reporting Agent** synthesizes all findings into a clear, visual, and easy-to-understand report.
  * **Expert-Level Knowledge:** A specialized language model fine-tuned on biostatistical literature provides expert-level domain knowledge.

---

### 💻 Final Stack

#### **1. Frontend (Interface & Visualization)**

* **Framework:** [Next.js 14/15](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [Radix UI](https://www.radix-ui.com/) / [shadcn/ui](https://ui.shadcn.com/)
* **Data Visualization:** [Recharts](https://recharts.org/) (for interactive dashboards)
* **Markdown Rendering:** `react-markdown` (to display agent-generated reports)

#### **2. Backend Core (Performance & Logic)**

* **Runtime:** [Rust](https://www.rust-lang.org/)
* **Web Framework:** [Actix-web](https://actix.rs/) or [Axum](https://github.com/tokio-rs/axum)
* **Concurrency:** [Tokio](https://tokio.rs/)
* **API Client:** `reqwest` (to communicate with the Python Agent Bridge)

#### **3. AI Agent Layer (Orchestration & Reasoning)**

* **Agent Framework:** [smolagents](https://huggingface.co/docs/smolagents/) (by Hugging Face)
* **Bridge API:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
* **Language Model:** **Gemma-3** (Fine-tuned for Biostatistics)
* **Inference:** Hugging Face Inference Endpoints or local execution.

#### **4. Data Layer (The Triple-Threat Storage)**

* **Metadata DB:** [MongoDB](https://www.mongodb.com/) (Stores user profiles, research history, and agent logs).
* **Vector DB:** [Qdrant](https://qdrant.tech/) (Stores embedded medical literature and documentation for RAG).
* **OLAP DB:** [ClickHouse](https://clickhouse.com/) (Handles massive public health datasets for lightning-fast statistical queries).

#### **5. DevOps & Infrastructure**

* **Containerization:** [Docker](https://www.docker.com/) & **Docker Compose**
* **Environment:** Node.js (Frontend), Cargo (Rust), Python 3.10+ (Agents).

---

## 🚀 Getting Started

### Prerequisites

  * Rust
  * Node.js (for Next.js)
  * Python 3.10+ (for smolagents)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saadsalmanakram/Bio-Stat-Agent.git
    cd Bio-Stat-Agent
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
4.  **Configure the agents:**
    Follow the instructions to set up your chosen agent orchestration framework.

### Configuration

Create a `.env` file to store your API keys and configuration variables for data sources and the language model.

### Usage

Run the Next.js server and the Rust backend to start the agent, then submit a research question via the user interface.

-----


To wrap everything up, here is the complete, final directory structure for **Bio-Stat-Agent**. This structure accounts for the hybrid Rust/Python/Node.js stack, the agentic orchestration, and the containerized database layer.

### 📂 Final Project Structure

```text
Bio-Stat-Agent/
├── frontend/                       # Next.js App Router (UI)
│   ├── src/
│   │   ├── app/                    # Routes (Home, Dashboard, Reports)
│   │   │   ├── report/[id]/        # Dynamic report viewer
│   │   │   └── page.tsx            # Main research input
│   │   ├── components/             # Shadcn/UI components & Charts
│   │   ├── hooks/                  # API fetch logic
│   │   └── lib/                    # Utils (Markdown parser, types)
│   ├── public/                     # Static assets & saved plots
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend-core/                   # Rust High-Performance Core
│   ├── src/
│   │   ├── main.rs                 # Actix-web/Axum Entry Point
│   │   ├── agents/
│   │   │   └── bridge.rs           # Communication logic with Python
│   │   ├── stats/                  # High-speed math modules
│   │   ├── db/                     # MongoDB & Qdrant clients
│   │   └── models/                 # Rust structs for hypotheses/data
│   ├── Cargo.toml
│   └── .env
│
├── ai-agents/                      # Python Agent Orchestration
│   ├── main.py                     # FastAPI Bridge & Orchestrator
│   ├── agents.py                   # Data Retrieval Agent
│   ├── hypothesis_agent.py         # Hypothesis Generation Agent
│   ├── modeling_agent.py           # Statistical Modeling Agent
│   ├── reporting_agent.py          # Report Synthesis Agent
│   ├── tools.py                    # Custom Python tools (CDC API, etc.)
│   ├── temp_data.csv               # Cache for active analysis
│   └── requirements.txt
│
├── docker-compose.yml              # MongoDB, Qdrant, and ClickHouse
└── README.md                       # Documentation

```

---