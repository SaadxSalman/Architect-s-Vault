# Bio-Lit-LM: Fine-Tuned Language Model for Scientific Literature 📚💡

**Bio-Lit-LM** is a specialized, fine-tuned language model designed to be an expert in biological and scientific literature. By training on a massive corpus of research papers, abstracts, and clinical trial data, this project aims to create a powerful tool for researchers. It can instantly summarize complex papers, uncover hidden connections between seemingly unrelated research findings, and generate innovative research hypotheses, accelerating the pace of scientific discovery. 

## ✨ Core Features

-   **Intelligent Summarization:** Condenses lengthy and complex scientific papers into concise, easy-to-understand summaries.
-   **Inter-disciplinary Connection Discovery:** Finds and highlights novel connections between disparate research areas by identifying shared concepts and data across papers.
-   **Hypothesis Generation:** Assists researchers by suggesting plausible new research questions and hypotheses grounded in existing literature.
-   **Hallucination Reduction:** Utilizes a Retrieval-Augmented Generation (RAG) system to ensure all outputs are verifiable and directly traceable to their source material.

---

### 🏗️ The Final Stack (Bio-Lit-LM)

#### **1. Core Artificial Intelligence & RAG**

* **LLM (Inference):** **Llama-3** fine-tuned on scientific corpora.
* **Embedding Model:** **Sentence-Transformers** (specifically `all-MiniLM-L12-v2` or `BioBERT`).
* **RAG Framework:** **LangChain** (integrated into the Node.js layer for orchestration).
* **Local LLM Runner:** **Ollama** (for running the model locally in a container).

#### **2. High-Performance Engine (The "Brain")**

* **Language:** **Rust 🦀**
* **Binding Layer:** **NAPI-RS** (bridges Rust logic into the Node.js environment).
* **Vector Database:** **Qdrant** (high-speed similarity search for paper embeddings).
* **Key Libraries:** `tokio` (async), `pdf-extract` (text parsing), `qdrant-client`.

#### **3. Backend & API Layer**

* **Runtime:** **Node.js**
* **API Framework:** **tRPC** (provides end-to-end typesafety between the server and the UI).
* **Server Logic:** **Express** (hosting the tRPC router).
* **Database:** **MongoDB** (storing user accounts, chat history, and research metadata).
* **Validation:** **Zod** (schema validation for all incoming requests).

#### **4. Frontend & User Interface**

* **Framework:** **Next.js 14+** (App Router).
* **Language:** **TypeScript** (strict type definitions for scientific data).
* **Styling:** **Tailwind CSS** (minimalist research-focused UI).
* **State Management:** **TanStack Query** (React Query) via the tRPC client.
* **Visualization:** **React Force Graph** (for inter-disciplinary connection discovery).

#### **5. Infrastructure & DevOps**

* **Containerization:** **Docker & Docker Compose**.
* **Monorepo Management:** **NPM Workspaces**.
* **Package Manager:** **NPM**.

---

## ⚙️ Key Components

### Fine-Tuned Language Model

The core of Bio-Lit-LM is a **Large Language Model (LLM)**, **Llama-3**, fine-tuned specifically on a curated corpus of scientific literature. This process, known as **domain-specific fine-tuning**, imbues the model with a deep understanding of scientific concepts, terminology, and reasoning patterns, allowing it to perform complex tasks that a general-purpose model would struggle with.

### Embeddings Model

To enable highly efficient and context-aware search, the system uses **Sentence-Transformers**. This tool converts every paragraph or section of the scientific papers in the corpus into a **vector embedding**. These embeddings are numerical representations that capture the semantic meaning of the text. Papers with similar concepts will have embeddings that are mathematically close to each other in a multi-dimensional space.

### Retrieval-Augmented Generation (RAG)

To prevent the LLM from generating inaccurate or "hallucinated" information, Bio-Lit-LM uses a **Retrieval-Augmented Generation (RAG)** system built with **LangChain**.
1.  **Retrieval:** When a user submits a query, the system first performs a semantic search using the embeddings to find the most relevant paragraphs from the scientific literature.
2.  **Augmentation:** The retrieved text is then provided to the LLM as additional context.
3.  **Generation:** The LLM generates its response based on the user's query and the factual context retrieved from the database, ensuring the output is grounded in verifiable data.

---

## 🛠️ Tech Stack

-   **User Interface:** **Next.js** and **tRPC** 🚀 - A modern full-stack framework for building the front-end (Next.js) and a powerful tool for creating a type-safe API (tRPC), ensuring a robust and bug-free user experience.
-   **Vector Database:** **Qdrant** - Chosen for its high performance and efficient similarity search, Qdrant stores the vast collection of scientific text embeddings, enabling lightning-fast retrieval for the RAG system.
-   **Core Logic:** **Rust** 🦀 - The core RAG logic, including the embedding generation and retrieval pipeline, is implemented in Rust for its speed and memory safety. This is crucial for handling large volumes of data and complex search operations efficiently.

---

## 🚀 Getting Started

Instructions on how to get the project up and running will be provided here, including:

1.  **Data Ingestion:** How to process and embed new scientific papers into the vector database.
2.  **Model Setup:** Steps for fine-tuning the base language model.
3.  **Running the App:** Commands to launch the Next.js application and start interacting with the model.

---

To wrap everything up, here is the complete, final folder structure for **Bio-Lit-LM**. This layout accounts for the **NAPI-RS** bridge between Rust and Node, the **tRPC** communication layer, and the **Next.js** frontend.

### 📂 Project Structure

```text
bio-lit-lm/
├── apps/
│   ├── web/                         # Next.js Frontend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx         # Dashboard / Entry
│   │   │   │   └── research/        # Research & RAG Interface
│   │   │   ├── components/
│   │   │   │   ├── DiscoveryGraph.tsx
│   │   │   │   └── UploadPaper.tsx
│   │   │   └── utils/
│   │   │       └── trpc.ts          # tRPC Frontend Hooks
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   └── server/                      # Node.js / Express Backend
│       ├── src/
│       │   ├── routers/
│       │   │   ├── _app.ts          # Main tRPC Router
│       │   │   ├── paper.ts         # Ingestion & Retrieval Logic
│       │   │   └── discovery.ts     # Inter-disciplinary Logic
│       │   └── index.ts             # Server entry point
│       ├── tsconfig.json
│       └── package.json
│
├── core-engine/                     # Rust High-Performance Engine
│   ├── src/
│   │   └── lib.rs                   # NAPI-RS functions (Search/Ingest)
│   ├── Cargo.toml
│   ├── package.json                 # NAPI-RS build scripts
│   └── index.d.ts                   # Auto-generated TS types for Rust
│
├── docker-compose.yml               # Qdrant, MongoDB, Ollama
├── package.json                     # Root Monorepo configuration
└── .gitignore

```

---

