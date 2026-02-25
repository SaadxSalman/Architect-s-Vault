# Ed-Agent 🧑‍🏫📖

A comprehensive tutoring agent that creates a personalized and dynamic learning experience for every student. Ed-Agent designs custom learning paths, generates unique practice problems based on a student's individual weaknesses, and adapts its teaching style in real-time to ensure optimal comprehension and engagement.

-----

## ✨ Features

  * **Personalized Learning Paths:** A **Curriculum Planning Agent** assesses student needs and crafts a customized learning journey for them.
  * **Adaptive Tutoring:** The **Teaching Agent** adjusts its teaching style and content based on the student's real-time comprehension, ensuring the material is always at the right difficulty level.
  * **Intelligent Problem Generation:** Automatically generates unique practice problems and quizzes that specifically target the student's identified weaknesses.
  * **Multi-Modal Comprehension:** Integrates a vision model to analyze handwritten work or diagrams, providing deeper insights into a student's thought process beyond just text input.
  * **Knowledge-Based Retrieval:** Uses a comprehensive knowledge graph and **Qdrant** vector space to provide highly relevant and context-aware educational content.

-----

## 🛠️ Tech Stack

### 🧠 AI & Agent Orchestration (The Brain)

* **Framework:** [LangChain.js](https://v03.api.js.langchain.com/) — The glue that connects the LLMs to external data (Qdrant), memory (MongoDB), and structured output.
* **Core LLM:** **Mixtral 8x7B** (Open Source) — High-reasoning model ideal for curriculum planning and tutoring logic.
* **Vision Model:** **Llava** — Multi-modal model used to interpret images of student work.
* **Local LLM Hosting:** [Ollama](https://ollama.com/) — Runs your models locally, ensuring privacy and zero API costs during development.

---

### 🗄️ Database & Memory (The Knowledge)

* **Primary DB:** [MongoDB](https://www.mongodb.com/) (via Mongoose) — Stores persistent student profiles, progress tracking, and session history.
* **Vector Database:** [Qdrant](https://qdrant.tech/) — A high-performance vector store that handles the **Knowledge-Based Retrieval (RAG)**, allowing the agent to "search" textbooks and notes.
* **Embeddings:** **Ollama / All-MiniLM-L6-v2** — Converts text into mathematical vectors that Qdrant can search.

---

### 🚢 Infrastructure (The Environment)

* **Containerization:** [Docker](https://www.docker.com/) — To run Qdrant and MongoDB in isolated environments with a single command.
* **Package Manager:** **NPM** (or Bun/PNPM) — Standardized dependency management.

---

### 🛠️ Summary Table

| Layer | Technology | Why? |
| --- | --- | --- |
| **UI** | Next.js + Tailwind | Speed and ease of development. |
| **API** | tRPC + Zod | Error-free data flow from backend to frontend. |
| **Logic** | LangChain | Standardized way to build multi-step AI agents. |
| **Models** | Mixtral + Llava | Powerful, open-source, and free to run locally. |
| **Storage** | MongoDB + Qdrant | Combines traditional relational data with AI vector search. |

-----

## 🚀 Getting Started

### Prerequisites

  * Node.js (for SvelteKit and tRPC)
  * Python 3.10+ (for LangChain and AI models)
  * Docker (for Qdrant)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saadsalmanakram/Ed-Agent.git
    cd Ed-Agent
    ```
2.  **Set up the frontend:**
    ```bash
    cd frontend
    npm install
    ```
3.  **Set up the backend:**
    Follow the instructions in the `backend/` directory to install dependencies and configure the agent orchestration.

### Configuration

Create a `.env` file in the root directory to store your API keys for the AI models and any other necessary environment variables.

### Usage

Run the frontend and backend services simultaneously to launch the tutoring agent.

-----

To wrap everything up, here is the complete, final file structure for **Ed-Agent**. This structure follows industry best practices for a **Monorepo**-style setup, ensuring that your tRPC types can be shared easily and your agents are modular.

### 📂 Project Structure

```text
Ed-Agent/
├── frontend/                 # Next.js (React) Application
│   ├── src/
│   │   ├── app/              # App Router (Pages)
│   │   │   ├── dashboard/    # Student Dashboard & Roadmap
│   │   │   ├── tutor/        # Real-time Adaptive Chat
│   │   │   └── quiz/         # Dynamic Problem Generation UI
│   │   ├── components/       # Shared UI
│   │   │   ├── QuizView.tsx
│   │   │   ├── VisionUpload.tsx
│   │   │   └── Roadmap.tsx
│   │   ├── utils/
│   │   │   └── trpc.ts       # tRPC Client Hooks
│   │   └── hooks/            # Custom React Hooks
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                  # Node.js + Express + LangChain
│   ├── src/
│   │   ├── agents/           # Core AI Agent Logic
│   │   │   ├── curriculumAgent.ts
│   │   │   ├── adaptiveAgent.ts
│   │   │   ├── visionAgent.ts
│   │   │   └── problemAgent.ts
│   │   ├── services/         # Third-party Integrations
│   │   │   └── vectorStore.ts # Qdrant Logic & Embeddings
│   │   ├── models/           # Database Schemas
│   │   │   └── StudentProfile.ts
│   │   ├── trpc/             # Typesafe API Layer
│   │   │   ├── routers/
│   │   │   │   ├── _app.ts    # Main Router Entry
│   │   │   │   ├── curriculum.ts
│   │   │   │   ├── vision.ts
│   │   │   │   └── quiz.ts
│   │   │   └── context.ts
│   │   └── server.ts         # Express & DB Connection
│   ├── scripts/
│   │   └── ingest.ts         # Qdrant Data Ingestion Script
│   ├── .env                  # API Keys & DB URIs
│   ├── tsconfig.json
│   └── package.json
│
├── docker-compose.yml        # Qdrant & MongoDB Services
└── .gitignore

```

---