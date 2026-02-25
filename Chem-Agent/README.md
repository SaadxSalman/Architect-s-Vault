# Chem-Agent 🧪⚛️

An AI agent that autonomously designs new molecules and chemical synthesis pathways. Chem-Agent leverages a knowledge graph of chemical properties and reaction mechanisms to propose novel compounds for drug discovery, material science, and other chemical applications.

-----

## ✨ Features

  * **Autonomous Molecule Design:** The **Molecule Design Agent** generates novel chemical structures based on specified properties and objectives.
  * **Reaction Pathway Prediction:** The **Reaction Prediction Agent** analyzes a knowledge graph of chemical reactions to propose viable synthesis pathways.
  * **Chemical Simulation:** The **Simulation Agent** models the properties and behaviors of proposed molecules and reactions, validating their feasibility.
  * **Graph-based Analysis:** Utilizes **GATv2** to analyze complex molecular graphs, understanding the relationships between atoms and bonds.
  * **Specialized Chemical Intelligence:** Employs a massive language model fine-tuned on chemical literature, providing expert-level knowledge of chemical concepts and reactions.

-----
## 🛠️ Stack

## 💻 1. The Frontend (Client Layer)

* **Framework:** **Next.js 15 (App Router)** – Chosen for its Server-Side Rendering (SSR) capabilities, which are vital for rendering complex chemical data and SEO.
* **Language:** **TypeScript** – Ensures strict type safety between your UI and the chemical data structures.
* **Styling:** **Tailwind CSS + Shadcn UI** – For a high-end, responsive "Laboratory Dashboard" aesthetic.
* **Molecular Visualization:** **RDKit.js** (MinimalLib) – Used for high-fidelity 2D rendering of SMILES directly in the browser.
* **State Management:** **TanStack Query (React Query)** – Manages the asynchronous states of your AI agent’s "thinking" process.

## 🔗 2. The Communication Layer (The Bridge)

* **Protocol:** **tRPC** – Provides **End-to-End Type Safety**. When your Python model defines a new property (e.g., `toxicity_score`), tRPC ensures your Frontend knows exactly what that data looks like without manual API documentation.
* **Validation:** **Zod** – Used to validate chemical strings (SMILES) and agent parameters at the schema level before they hit your database.

## ⚙️ 3. The Backend (Orchestration Layer)

* **Runtime:** **Node.js (Express)** – Acts as the "Brain's Secretary," handling user authentication, request routing, and job queuing.
* **Database:** **MongoDB (via Mongoose)** – A NoSQL document store ideal for chemical data, where molecular properties and reaction pathways can vary significantly in structure.
* **AI Bridge:** **Axios / Fetch** – Used by Express to communicate with the internal Python FastAPI service.

## 🧪 4. The AI Engine (Intelligence Layer)

* **Framework:** **FastAPI (Python 3.10+)** – A high-performance Python framework designed to serve machine learning models with minimal latency.
* **Graph Model:** **PyTorch Geometric (GATv2)** – The core Graph Attention Network that analyzes molecular structures as nodes (atoms) and edges (bonds).
* **Cheminformatics:** **RDKit (Python)** – The gold standard for chemical informatics; used for featurizing molecules, calculating molecular weight, and validating chemical valence.
* **LLM Integration:** **OpenAI API / LangChain** – Orchestrates the Large Language Model to provide "Agentic Reasoning" and synthesis summaries.

## 🏗️ 5. Infrastructure & DevOps

* **Containerization:** **Docker & Docker Compose** – Essential for packaging the RDKit C++ dependencies and PyTorch environment so they run anywhere.
* **CI/CD:** **GitHub Actions** – Automatically runs your Python unit tests and Next.js builds on every push to `saadsalmanakram/Chem-Agent`.
* **Environment:** **Python Virtual Environments (venv)** – Keeps your AI dependencies isolated from the rest of the system.

-----

## 🚀 Getting Started

### Prerequisites

  * Node.js (for Next.js)
  * Python 3.10+ (for backend models)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saadsalmanakram/Chem-Agent.git
    cd Chem-Agent
    ```
2.  **Set up the frontend and backend:**
    Follow the instructions in the `frontend/` and `backend/` directories to install dependencies and configure the agent services.

### Configuration

Create a `.env` file to store your API keys and model credentials.

### Usage

Run the Next.js server and backend services to begin designing molecules and chemical synthesis pathways.

-----

## 📂 Project Structure

```text
Chem-Agent/
├── .github/
│   └── workflows/
│       └── main.yml              # CI/CD (Node + Python testing)
├── apps/
│   ├── web/                      # Frontend (Next.js + Tailwind)
│   │   ├── src/
│   │   │   ├── app/              # App Router (Pages & Layouts)
│   │   │   ├── components/       # MoleculeViewer, AgentLog, MoleculeCanvas
│   │   │   ├── hooks/            # Custom React hooks for tRPC
│   │   │   ├── utils/            # trpc.ts (Client setup)
│   │   │   └── types/            # Frontend-specific TS interfaces
│   │   ├── public/               # Static assets
│   │   ├── next.config.js
│   │   └── tailwind.config.js
│   └── server/                   # Backend (Express + tRPC Server)
│       ├── src/
│       │   ├── models/           # MongoDB Schemas (Molecule.ts)
│       │   ├── trpc/             # Router definitions & procedures
│       │   ├── services/         # pythonBridge.ts (Communicates with AI API)
│       │   └── index.ts          # Server entry point
│       ├── package.json
│       └── tsconfig.json
├── services/
│   └── ai-engine/                # Python AI Engine (FastAPI)
│       ├── data/                 # Training datasets (CSV/SMILES)
│       ├── models/               # gatv2.py (Graph Neural Network)
│       ├── utils/
│       │   ├── data_loader.py    # RDKit featurization logic
│       │   └── llm_wrapper.py    # Chemical Intelligence prompt logic
│       ├── main.py               # FastAPI entry (The "Agent" API)
│       ├── train.py              # Script to train GATv2
│       └── requirements.txt      # Python dependencies
├── .env.example                  # Template for API keys & DB URIs
├── docker-compose.yml            # Multi-container orchestration
└── README.md

```

---