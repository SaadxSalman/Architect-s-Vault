# Synapse-360 🔎⚛️

An advanced version of your SynapseSearch project, **Synapse-360** is a cognitive agent for code. It moves beyond keyword-based search to understand the **intent and logic of code**, providing intelligent suggestions, refactoring recommendations, and even automatic bug fixes.

-----

## ✨ Features

  * **Cognitive Code Understanding:** Instead of just matching keywords, the agent understands the semantic meaning and intent behind code snippets.
  * **Intelligent Refactoring:** The **Code Analysis Agent** can identify inefficient or problematic code and suggest optimal refactored solutions.
  * **Automated Bug Fixes:** The **Suggestion Agent** can generate and propose new code to fix identified bugs, streamlining the debugging process.
  * **Chain of Thought (CoT) Prompting:** Uses CoT prompting with a fine-tuned **Gemma-CodeVec** model to reason through complex code logic and provide more accurate results.
  * **Elastic Scalability:** Built to handle massive codebases with **Milvus**, a high-performance vector database that ensures fast and scalable semantic searches.
  * **High-Performance Backend:** The core logic is written in **Rust**, providing a low-latency, real-time code analysis engine.

-----

### ⚛️ The Core Logic (Systems Layer)

This layer handles the heavy computational "cognitive" tasks.

* **Language:** **Rust** (High-performance, memory-safe engine).
* **Inference Engine:** **Candle** (Hugging Face’s lightweight ML framework for Rust).
* **Model:** **Gemma-CodeVec** (Fine-tuned for code semantic understanding).
* **Communication:** **gRPC** (Using the `Tonic` crate) for low-latency communication with the Node.js layer.

---

### 🔎 The Intelligent Storage (Data Layer)

* **Vector Database:** **Milvus** (Handles billions of code embeddings for semantic search).
* **Primary Database:** **MongoDB** (Stores user profiles, project metadata, and analysis history).
* **Coordination:** **Etcd** & **MinIO** (Internal dependencies for Milvus to manage state and object storage).

---

### 🌐 The Orchestration (Backend Layer)

* **Runtime:** **Node.js** with **TypeScript**.
* **Framework:** **Express.js** (Serves as the API Gateway).
* **Communication:** **Server-Sent Events (SSE)** for pushing real-time Chain of Thought (CoT) updates to the UI.
* **ORM/ODM:** **Mongoose** (For structured data interaction).

---

### 💻 The Interface (Frontend Layer)

* **Framework:** **Next.js 15+** (App Router for optimized performance).
* **Styling:** **Tailwind CSS** (Utility-first styling for a sleek, dark-mode developer aesthetic).
* **Code Editor:** **Monaco Editor** (The core engine behind VS Code) for code input and syntax highlighting.
* **Animations:** **Framer Motion** (For smooth "Chain of Thought" transitions).
* **Icons:** **Lucide React**.

---

### 🛠️ DevOps & Tooling

* **Containerization:** **Docker** and **Docker Compose** (For local development and Milvus orchestration).
* **API Testing:** **Postman** (for REST) and **gRPCurl** (for testing the Rust engine).
* **Environment Management:** **Dotenv** for cross-service configuration.


-----

## 🚀 Getting Started

### Prerequisites

  * Rust
  * Node.js and npm (for Next.js)
  * Docker (for Milvus)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saadsalmanakram/Synapse-360.git
    cd Synapse-360
    ```
2.  **Start Docker containers:**
    ```bash
    docker-compose up -d
    ```
3.  **Build the Rust core:**
    ```bash
    cargo build --release
    ```
4.  **Set up the frontend:**
    ```bash
    cd frontend
    npm install
    ```

### Configuration

Create a `.env` file to configure your API keys or model paths for Gemma-CodeVec.

### Usage

Run the Rust backend and the Next.js frontend to begin your cognitive code searches.

-----

To tie everything together for **Synapse-360**, here is the final, comprehensive directory structure. This organization supports the **Rust-to-Node gRPC bridge**, the **SSE real-time streaming**, and the **Milvus/MongoDB** data layer.

### 📂 Project Structure

```text
Synapse-360/
├── proto/                          # Shared gRPC definitions
│   └── synapse.proto               # Service and Message definitions
├── core-engine/                    # Rust: High-performance logic
│   ├── src/
│   │   ├── main.rs                 # gRPC Server & orchestration
│   │   ├── embedder.rs             # Candle + Gemma-CodeVec logic
│   │   └── milvus_client.rs        # Vector DB operations
│   ├── models/                     # Gemma weights (.safetensors)
│   ├── build.rs                    # Tonic/gRPC build script
│   └── Cargo.toml                  # Rust dependencies
├── server/                         # Node.js/Express: API Gateway
│   ├── src/
│   │   ├── grpc/
│   │   │   └── client.ts           # gRPC Client to talk to Rust
│   │   ├── routes/
│   │   │   └── analyze.ts          # SSE Streaming & Meta-data routes
│   │   ├── models/                 # MongoDB Schemas (CodeMetadata.ts)
│   │   └── index.ts                # Server entry point
│   ├── package.json
│   └── .env                        # Port, Mongo URI, Milvus URL
├── frontend/                       # Next.js: User Interface
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx            # Main dashboard with EventSource
│   │   ├── components/
│   │   │   ├── AnalysisSteps.tsx   # CoT Visualizer
│   │   │   └── CodeEditor.tsx      # Monaco Editor wrapper
│   │   └── hooks/
│   │       └── useSSE.ts           # Custom hook for stream management
│   └── tailwind.config.ts
├── docker-compose.yml              # Milvus, Etcd, MinIO, MongoDB
└── .gitignore

```

---