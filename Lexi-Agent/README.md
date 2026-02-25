# Lexi-Agent ⚖️

A private, on-premise AI assistant designed for legal professionals. Lexi-Agent is a **sovereign AI** solution that ensures all sensitive data remains confidential. It is capable of drafting contracts, summarizing complex legal documents, and identifying relevant case law to assist in legal research.

-----

## ✨ Features

  * **On-Premise Privacy:** All operations are conducted locally, guaranteeing that sensitive legal data never leaves your environment.
  * **Comprehensive Legal Assistance:** Acts as a complete legal assistant, handling tasks from document analysis to drafting and research.
  * **Specialized AI Agents:** Utilizes a multi-agent system with a **Document Analyst Agent** for summaries, a **Case Law Agent** for research, and a **Drafting Agent** for creating legal documents.
  * **Domain-Specific Embeddings:** Employs a highly specialized legal embedding model fine-tuned on extensive case law and legal texts to ensure high accuracy in searches and analysis.
  * **Efficient Local-First Architecture:** Leverages an embedded database like **LanceDB** for fast, local data access, combined with the performance of **Rust** for core logic.

-----

## ⚙️ Tech Stack

### 1. The Reasoning Engine (Brain)

* **Model:** **Gemma-2 (9B or 27B)**.
* *Why:* Gemma-2 9B is the "Goldilocks" model for 2025; it outperforms Llama-3 in specific reasoning benchmarks while being small enough to run on consumer GPUs (RTX 3060/4060).


* **Inference Framework:** **Candle (Rust)**.
* *Why:* Unlike Python-based frameworks, Candle is a minimalist ML library by Hugging Face that compiles to a single binary, reducing the "DLL hell" common in local AI setups.



### 2. The Native Bridge (The Nervous System)

* **Bridge:** **NAPI-RS v3**.
* *Why:* It provides a zero-cost abstraction. According to 2025 benchmarks, NAPI-RS can outperform pure JS by up to **115x** for compute-heavy tasks like document parsing, making it significantly faster than WebAssembly (WASM) for server-side file system access.


* **Runtime:** **Node.js 22+ (LTS)**.

### 3. The Sovereign Data Layer (Memory)

* **Vector Database:** **LanceDB (Embedded)**.
* *Why:* Unlike Pinecone or Milvus, LanceDB is "serverless" and runs in-process. It stores raw text and vectors in the `.lance` format (based on Apache Arrow), allowing for sub-millisecond local searches without an external database server.


* **Metadata & Session DB:** **MongoDB (Local Container)**.
* *Why:* Perfect for storing JSON-heavy legal document metadata and user chat histories.



### 4. The Interface (User Experience)

* **Framework:** **Next.js 15 (App Router)**.
* **Styling:** **Tailwind CSS**.
* **State & Icons:** **Lucide React** & **Zustand** (for lightweight local state management).

---

## 🏗️ Technical Specifications for 2025

| Component | Technology | Role in Lexi-Agent |
| --- | --- | --- |
| **Logic** | Rust 1.80+ | High-speed legal document chunking & search. |
| **API** | Express + TypeScript | Orchestrating agent tasks. |
| **Streaming** | Server-Sent Events (SSE) | Word-by-word real-time legal drafting. |
| **Embedding** | `all-MiniLM-L6-v2` (Local) | Turning legal clauses into math vectors. |
| **Container** | Docker + Compose | Ensuring "one-click" private deployment. |

-----

## 🚀 Getting Started

### Prerequisites

  * Rust
  * Python 3.10+ (for model inference)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saadsalmanakram/Lexi-Agent.git
    cd Lexi-Agent
    ```
2.  **Build the Rust core:**
    ```bash
    cargo build --release
    ```
3.  **Set up the local model:**
    Download and configure the fine-tuned Gemma-2 model and ensure the environment is set up for local inference.

### Configuration

Follow the configuration guides in the project's documentation to set up the data directories and model paths.

### Usage

Run the main executable to start the Lexi-Agent server. You can then interact with the assistant via a local API or CLI interface.

-----

To wrap everything up, here is the finalized, professional folder structure for **Lexi-Agent**.

This setup follows a **Monorepo** pattern, which is the industry standard for 2025. It keeps your high-performance Rust logic, your Node.js orchestrator, and your Next.js interface organized while sharing a single source of truth for configuration and deployment.

### 📂 Project Structure

```text
Lexi-Agent/
├── frontend/                # Next.js App (TypeScript + Tailwind)
│   ├── src/
│   │   ├── app/             # App Router (Home, Chat, Documents)
│   │   ├── components/      # UI: ChatWindow, Sidebar, FileUpload
│   │   ├── hooks/           # useStreamingDraft, useLanceSearch
│   │   └── lib/             # Axios instance, formatting utils
│   ├── public/              # Static assets (Logo, PDF Icons)
│   ├── next.config.ts
│   └── tailwind.config.ts
├── backend/                 # Node.js Express Server
│   ├── src/
│   │   ├── controllers/     # Bridges HTTP requests to Rust functions
│   │   ├── routes/          # API endpoints (/api/agent, /api/auth)
│   │   ├── models/          # MongoDB schemas (User, Session, History)
│   │   └── server.ts        # Entry point
│   ├── native/              # Destination for compiled Rust binary (.node)
│   └── package.json
├── rust-core/               # The Sovereign Engine (Rust + NAPI-RS)
│   ├── src/
│   │   ├── lib.rs           # NAPI-RS entry & Bridge functions
│   │   ├── agents/          # Agent logic: drafting.rs, analyst.rs
│   │   └── storage/         # LanceDB table management logic
│   ├── .lexi_data/          # Local LanceDB vector files (Sovereign Storage)
│   ├── Cargo.toml
│   └── index.js             # Auto-generated by NAPI-RS
├── models/                  # Local Gemma-2 model weights (git-ignored)
│   └── gemma-2-9b/          # Safetensors and config files
├── docker-compose.yml       # Production orchestration
├── .gitignore               # Excludes /models, /node_modules, and /.lexi_data
└── README.md                # Documentation by saadsalmanakram

```

---