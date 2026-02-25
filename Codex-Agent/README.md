# Codex-Agent 🤖💻

An advanced multi-agent system that autonomously plans, writes, tests, and refactors code. Codex-Agent transforms high-level natural language prompts into complete, production-ready codebases, acting as an AI-powered software development team.

## ✨ Features

  * **Autonomous Software Development:** Takes a natural language prompt and autonomously handles the entire software development lifecycle, from planning to deployment.
  * **Multi-Agent Architecture:** Utilizes a team of specialized AI agents—a **Project Manager**, **Code Engineer**, and **QA Engineer**—to handle different stages of the development process.
  * **UI to Code Generation:** Integrates a vision model to analyze UI mockups and diagrams, converting them into functional front-end code.
  * **Semantic Code Retrieval:** Employs a fine-tuned code-embedding model to intelligently retrieve and suggest code snippets based on semantic similarity, ensuring high-quality, relevant code generation.
  * **High-Performance Backend:** Built with Rust for high-performance, concurrent execution of complex coding tasks.

## 🛠 Tech Stack

#### **1. AI & Orchestration Layer (The "Brain")**

* **Orchestration:** [LangGraph](https://github.com/langchain-ai/langgraph) — Used to manage the stateful, multi-agent loop between the PM, Engineer, and QA.
* **LLM (Code Gen):** `Gemma-CodeGen-Py` — A fine-tuned version of Google’s Gemma specifically optimized for Python and TypeScript generation.
* **LLM (Planning):** GPT-4o or Claude 3.5 Sonnet — Utilized via LangChain for high-level project decomposition.
* **Vision:** **Vision Transformer (ViT)** — Specifically `google/vit-base-patch16-224` (via Hugging Face Transformers) for UI mockup analysis.

#### **2. Performance & System Layer (The "Muscle")**

* **Language:** **Rust** — Chosen for its memory safety and speed in handling concurrent I/O operations.
* **Runtime:** **Tokio** — For asynchronous execution of file system tasks.
* **Serialization:** **Serde / Serde_JSON** — For high-speed parsing of the JSON manifests sent from the Python agents to the Rust core.

#### **3. Memory & Data Layer (The "Knowledge")**

* **Vector Database:** [LanceDB](https://github.com/lancedb/lancedb) — A serverless, high-performance vector DB used for semantic code retrieval and RAG (Retrieval-Augmented Generation).
* **Embeddings:** `all-MiniLM-L6-v2` (Sentence-Transformers) — For converting code snippets into 384-dimensional vectors.
* **Primary Database:** **MongoDB** — Used by the Node.js/Express server to store user metadata and project history.

#### **4. Fullstack & UI Layer (The "Face")**

* **Frontend Framework:** [Next.js 15+](https://nextjs.org/) — Utilizing the App Router and Server Components.
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) — For rapid, utility-first UI generation.
* **Backend API:** **Node.js / Express.js** — Providing a RESTful API for the frontend to communicate with the database.
* **Language:** **TypeScript** — Ensuring type safety across the entire fullstack application.

---

### 📊 Stack Overview Table

| Category | Technology | Why we used it |
| --- | --- | --- |
| **Agent State** | LangGraph | Handles the "Self-Correction" loops between agents. |
| **I/O Operations** | Rust + Tokio | Python is too slow for concurrent writing of 100+ files. |
| **UI Design-to-Code** | ViT + Tailwind | Converts visual hierarchy into utility classes. |
| **Code Retrieval** | LanceDB | Low-latency vector search without a separate DB server. |
| **Database** | MERN Stack | Industry standard for modern web applications. |

---

### 🚀 Summary of Key Commands (Final)

| Component | Installation Command |
| --- | --- |
| **Agents** | `pip install langgraph lancedb transformers torch` |
| **Rust Core** | `cargo add tokio serde serde_json --manifest-path core/Cargo.toml` |
| **Frontend** | `npx create-next-app@latest apps/web --ts --tailwind` |
| **Server** | `npm install express mongoose dotenv cors` |

## 🚀 Getting Started

### Prerequisites

  * Python 3.10+
  * Cargo (Rust's package manager)
  * Access to the necessary APIs (e.g., for the Gemma model)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/saadsalmanakram/Codex-Agent.git
    cd Codex-Agent
    ```

2.  **Set up the Python environment:**

    ```bash
    pip install -r requirements.txt
    ```

3.  **Set up the Rust backend:**

    ```bash
    cargo build --release
    ```

### Configuration

Create a `.env` file in the root directory and add your API keys:

```ini
OPENAI_API_KEY=your_openai_api_key
GEMMA_API_KEY=your_gemma_api_key
```

### Usage

To start the Codex-Agent, run the main Python script with your high-level natural language prompt:

```bash
python main.py "Create a SvelteKit e-commerce site with a shopping cart and user authentication."
```

---

You're absolutely right to catch that. In the final structure, I integrated the **Node.js/Express** server logic directly into the **Next.js** `apps/web` folder (using Next.js API routes) to simplify the full-stack architecture.

However, if you prefer to keep the **Backend API Layer** and the **Frontend** explicitly separated as in your initial plan, here is the corrected and fully expanded structure that includes every module we've built.

### 📂 Folder Structure

```text
Codex-Agent/
├── apps/
│   ├── web/                        # FRONTEND (Next.js + Tailwind)
│   │   ├── src/
│   │   │   ├── app/                # App Router (Pages/Layouts)
│   │   │   └── components/         # Shared UI Components
│   │   └── package.json
│   └── server/                     # API LAYER (Node.js + Express)
│       ├── src/
│       │   ├── controllers/        # Business logic
│       │   ├── routes/             # Express API routes
│       │   └── index.ts            # Server entry point
│       └── package.json
├── performance-core/                           # PERFORMANCE CORE (Rust)
│   ├── src/
│   │   ├── main.rs                 # CLI Entry for Batch-Writing
│   │   └── file_manager.rs         # Concurrent I/O logic
│   └── Cargo.toml                  # Dependencies: tokio, serde, serde_json
├── agents/                         # AI ORCHESTRATION (Python)
│   ├── graph.py                    # LangGraph workflow definition
│   ├── manager.py                  # PM Agent (System Prompts/Planning)
│   ├── engineer.py                 # Code Engineer (Generation logic)
│   ├── qa.py                       # QA Agent (Linting/Testing logic)
│   ├── vision.py                   # Vision Transformer (Image analysis)
│   └── memory.py                   # LanceDB (Semantic search logic)
├── data/                           # PERSISTENCE
│   └── codex_lancedb/              # Vector DB files (Lance format)
├── scripts/                        # UTILITIES
│   └── index_codebase.py           # Script to embed code into LanceDB
├── .env                            # API Keys (OpenAI, Gemma, MongoDB)
├── requirements.txt                # Python Deps (LangGraph, LanceDB, Torch)
└── main.py                         # CLI Entry point for the whole system

```

---