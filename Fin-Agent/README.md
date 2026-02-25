# Fin-Agent 💰📈

A multi-agent system that autonomously monitors financial markets, reads news articles, and analyzes sentiment to make predictions and generate reports. Fin-Agent acts as a personal financial advisor, with a strong focus on risk management and data-driven insights.

-----

## ✨ Features

  * **Autonomous Market Monitoring:** The **Data Retrieval Agent** autonomously pulls and processes real-time financial market data and news.
  * **Sentiment and News Analysis:** The **Sentiment Analysis Agent** reads news articles and social media to gauge market sentiment, providing a crucial leading indicator.
  * **Predictive Modeling:** The **Modeling Agent** runs complex simulations and analyzes historical data to generate predictions and identify potential risks.
  * **Comprehensive Reporting:** The **Reporting Agent** synthesizes all findings into clear and concise reports, making complex financial data accessible to the user.
  * **Chart and Graph Interpretation:** Utilizes a **vision model** to interpret charts and graphs directly from financial reports, adding a powerful layer of visual data analysis.
  * **Specialized Knowledge:** Employs a specialized **embedding model** fine-tuned on financial news and SEC filings for highly accurate and contextually relevant analysis.

-----

## 🛠️ Tech Stack

### **1. Frontend (The Command Center)**

* **Framework:** [Next.js 14+](https://nextjs.org/) (App Router) for Server-Side Rendering (SSR) and optimized performance.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a high-density, "Bloomberg-style" dark UI.
* **State Management & Data Fetching:** [TanStack Query](https://tanstack.com/query/latest) (React Query) for managing server state and caching.
* **Icons & UI:** [Lucide React](https://lucide.dev/) for financial icons and [Framer Motion](https://www.framer.com/motion/) for smooth agent-status transitions.

### **2. Communication (The Bridge)**

* **Protocol:** [tRPC](https://trpc.io/) for end-to-end typesafe API calls. This allows your Frontend to "know" exactly what data the Backend agents return without manually defining types twice.
* **Validation:** [Zod](https://zod.dev/) for strict schema validation of ticker symbols and market data inputs.

### **3. Backend (The Orchestrator)**

* **Runtime:** [Node.js](https://nodejs.org/) with **Express** to manage the tRPC server and coordinate Python agent execution.
* **Database (General):** [MongoDB](https://www.mongodb.com/) (via Mongoose) to store user profiles, saved reports, and watchlists.
* **Agent Bridge:** `child_process` and `spawn` modules to execute Python scripts and stream real-time logs from the AI agents.

### **4. AI & Multi-Agent Logic (The Brains)**

* **Languages:** [Python 3.10+](https://www.python.org/) for the heavy-duty data science and LLM logic.
* **Orchestration:** [LangChain](https://www.langchain.com/) or a custom Agent class to manage the flow between retrieval and reporting.
* **Models:**
* **Reasoning:** `gpt-4o` for synthesizing complex financial reports.
* **Vision:** `gpt-4o-vision` for interpreting candlestick charts and technical indicator graphs.
* **Embeddings:** `text-embedding-3-small` for specialized financial news processing.



### **5. Specialized Data Storage**

* **Vector Database:** [Qdrant](https://qdrant.tech/) (Running in Docker) for high-speed retrieval of SEC filings and historical news using RAG (Retrieval-Augmented Generation).
* **Time-Series Database:** [QuestDB](https://questdb.io/) or [TimescaleDB](https://www.timescale.com/) for storing millions of real-time price ticks with sub-millisecond query times.

### **6. DevOps & Infrastructure**

* **Containerization:** [Docker](https://www.docker.com/) and **Docker Compose** to standardize the environment (Qdrant, Mongo, and the Python environment).
* **CI/CD:** [GitHub Actions](https://github.com/features/actions) for automated `pytest` and TypeScript build checks.
* **Testing:** `Pytest` for Python agents and `Jest` for frontend components.

---

## 📊 Stack Interoperability Summary

| Layer | Technology | Key Benefit |
| --- | --- | --- |
| **Type Safety** | TypeScript + tRPC | Prevents runtime crashes between Frontend and Backend. |
| **Intelligence** | OpenAI GPT-4o | Allows the "Reporting Agent" to sound like a human analyst. |
| **Memory** | Qdrant | Allows agents to remember news from 2 years ago instantly. |
| **Real-time** | Custom Time-Series DB | Handles the high-frequency nature of market price updates. |


-----

## 🚀 Getting Started

### Prerequisites

  * Node.js (for Next.js)
  * Python 3.10+ (for backend services and models)
  * Docker (for the time-series database and Qdrant)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saadsalmanakram/Fin-Agent.git
    cd Fin-Agent
    ```
2.  **Start Docker containers:**
    ```bash
    docker-compose up -d
    ```
3.  **Set up the frontend and backend:**
    Follow the instructions in the `frontend/` and `backend/` directories to install dependencies and configure the services.

### Configuration

Create a `.env` file to store your API keys for financial data providers and other necessary environment variables.

### Usage

Run the Next.js server and the backend agent services to begin autonomous market monitoring and reporting.

-----

To pull everything together for **saadsalmanakram/Fin-Agent**, here is the final, comprehensive directory structure. This includes the multi-agent Python scripts, the tRPC-powered backend, the Next.js frontend, and the automated CI/CD configurations.

### 📂 Project Structure

```text
Fin-Agent/
├── .github/
│   └── workflows/
│       └── ci.yml                # GitHub Actions pipeline
├── docker-compose.yml            # Qdrant, MongoDB, & Time-Series DB
├── .env                          # API Keys (OpenAI, Qdrant, etc.)
├── .gitignore
├── backend/
│   ├── src/
│   │   ├── agents/               # Python Multi-Agent Logic
│   │   │   ├── data_retrieval.py
│   │   │   ├── sentiment_analysis.py
│   │   │   ├── vector_storage.py # Qdrant / RAG logic
│   │   │   ├── modeling_agent.py # Prediction logic
│   │   │   ├── reporting.py      # Markdown synthesis
│   │   │   └── tests/            # Pytest suite for CI
│   │   ├── routers/              # tRPC Router definitions
│   │   │   ├── index.ts          # Root router
│   │   │   ├── sentiment.ts
│   │   │   ├── memory.ts
│   │   │   └── orchestrator.ts   # Master agent coordinator
│   │   ├── models/               # MongoDB Schemas
│   │   ├── trpc.ts               # tRPC initialization
│   │   └── index.ts              # Express server entry
│   ├── package.json
│   ├── tsconfig.json
│   └── requirements.txt          # Python deps (pandas, openai, etc.)
├── frontend/
│   ├── src/
│   │   ├── app/                  # Next.js App Router
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx          # Main Dashboard UI
│   │   ├── components/           # UI Components
│   │   │   ├── RiskGauge.tsx     
│   │   │   ├── SentimentCard.tsx
│   │   │   └── ReportMarkdown.tsx
│   │   ├── utils/
│   │   │   └── trpc.ts           # tRPC Client & Hooks
│   │   └── styles/
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
└── data/                         # Local volume for DB persistence

```

---