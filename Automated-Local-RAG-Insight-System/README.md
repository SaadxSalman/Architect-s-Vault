
---

<p align="center">
<img src="ALRIS.png" alt="ALRIS Logo" width="600">
</p>

# Automated-Local-RAG-Insight-System (ALRIS) 🔍🧠

**ALRIS** is a high-performance, full-stack Retrieval-Augmented Generation (RAG) engine designed to transform your local file system into a searchable intelligence hub. By leveraging **Hybrid Vector Search**, ALRIS understands semantic intent and keyword precision to provide high-accuracy insights from your private data.

Built with **Node.js**, **Weaviate Cloud**, and **Hugging Face**, this project offers a professional-grade, local-first approach to AI-driven document retrieval and analysis..

---

## 🚀 Key Features

* **Multi-Format Ingestion:** Seamlessly processes `.pdf` files with intelligent sliding-window chunking.
* **Hybrid Retrieval:** Balances Vector Similarity (semantic) and BM25 (keyword) search with a tuned  for optimal results.
* **Llama-3.2 Powered:** Utilizes `Llama-3.2-3B-Instruct` for concise, context-aware synthesis of your data.
* **High-Performance Embeddings:** Powered by `Snowflake/snowflake-arctic-embed-l-v2.0` for high-dimensional semantic mapping.
* **Modern Dashboard:** A sleek **Next.js 15** frontend with a responsive dark-mode UI, Lucide icons, and real-time processing animation.
* **Privacy-Centric:** Your raw data stays local; only anonymized vectors are used for cloud-based indexing and inference.

---

## 🌟 Real-World Use Cases

* **📚 Personal Knowledge "Brain":** For students and researchers managing hundreds of PDFs. Ask: *"What are the three main criticisms of the paper on Quantum Computing I saved last month?"*
* **📁 Instant Technical Documentation Assistant:** Point ALRIS at your GitHub repositories' `/docs` folders. Ask: *"How do I configure the authentication middleware in our internal API?"*
* **⚖️ Legal & Contract Analysis:** Drop lease agreements or contracts into the `/data` folder. Ask: *"What is the notice period for terminating this contract?"*
* **✍️ Content Creation Partner:** Maintain consistency in your creative work. Ask: *"How did I describe the protagonist's childhood in the first three chapters?"*

---

## 📐 Architecture & Pipeline

The system follows a standard RAG pipeline:

1. **Ingestion & ETL:** Local files are read and split into 2000-character chunks with a 200-character overlap to preserve context across boundaries.
2. **Embedding:** Chunks are vectorized using the **Snowflake Arctic M** model via the Hugging Face Inference API.
3. **Storage:** Vectors and metadata (fileName) are stored in a Weaviate "ALRIS_Documents" collection.
4. **Retrieval:** User queries are processed through a **Hybrid Search** that combines keyword matching and cosine similarity.
5. **Synthesis:** The top 6 relevant chunks are fed to **Llama-3.2-3B** to generate a natural language response.

---

## 📂 File Structure

```text
Automated-Local-RAG-Insight-System/
├── backend/                # Express/Node.js logic
│   ├── data/               # Source documents (.pdf, .md, .txt)
│   ├── src/
│   │   ├── index.js        # Express API (Hybrid search & Llama logic)
│   │   ├── ingest.js       # Ingestion & Chunking script
│   │   └── weaviateClient.js # Weaviate & HF Configuration
│   ├── .env                # Backend keys (WEAVIATE_API_KEY, HUGGINGFACE_API_KEY)
│   └── package.json
│
├── frontend/               # Next.js Application
│   ├── src/app/            # App Router (Next.js 15)
│   │   ├── layout.tsx      # Global styling & fonts
│   │   ├── page.tsx        # Modern Search UI with Lucide & Tailwind
│   │   └── globals.css     # Custom animations & Tailwind directives
│   ├── .env.local          # NEXT_PUBLIC_API_URL
│   └── package.json

```

---

## ⚙️ Installation & Setup

### 1. Prerequisites

* Node.js (v18+)
* [Weaviate Cloud](https://console.weaviate.cloud/) Cluster (Free Tier)
* [Hugging Face](https://huggingface.co/settings/tokens) API Token

### 2. Clone and Install

```bash
git clone https://github.com/saadxsalman/Automated-Local-RAG-Insight-System.git
cd Automated-Local-RAG-Insight-System

# Install Dependencies
cd backend && npm install
cd ../frontend && npm install

```

### 3. Environment Configuration

**Backend (`backend/.env`):**

```env
HUGGINGFACE_API_KEY=your_hf_token
WEAVIATE_URL=your_weaviate_cluster_url
WEAVIATE_API_KEY=your_weaviate_api_key
PORT=3002

```

**Frontend (`frontend/.env.local`):**

```env
NEXT_PUBLIC_API_URL=http://localhost:3002

```

### 4. Run the Engine

1. **Index Documents:** Place files in `backend/data`, then:
```bash
cd backend
node src/ingest.js

```


2. **Start Backend Server:**
```bash
node src/index.js

```


3. **Start Next.js UI:**
```bash
cd ../frontend
npm run dev

```



---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Runtime** | Node.js |
| **Backend** | Express.js, @cedrugs/pdf-parse |
| **Frontend** | Next.js 15 (React), Tailwind CSS, Lucide |
| **Vector DB** | Weaviate Cloud |
| **Embeddings** | Snowflake Arctic Embed L v2.0 |
| **LLM** | Meta Llama-3.2-3B-Instruct |

---

Developed with ❤️ by **[Saad Salman](https://www.google.com/search?q=https://github.com/saadxsalman)**

---
