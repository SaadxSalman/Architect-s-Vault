# OmniLingua-Agent 🗣️🌍

Building on the OmniLingua-SEA project, this is an advanced agent that not only translates but also generates new, culturally nuanced content (text, audio, video) in dozens of languages. OmniLingua-Agent ensures that content remains culturally relevant and contextually accurate, transcending simple word-for-word translation.

-----

## ✨ Features

  * **Culturally-Aware Generation:** A **Cultural Context Agent** ensures that all generated content is sensitive to and reflective of the target culture's nuances and customs.
  * **Multi-Modal Translation & Generation:** Capable of translating and generating new content in multiple formats, including text, audio, and video.
  * **Emotional Subtext Analysis:** Utilizes a **vision model** to interpret gestures and facial expressions, allowing the agent to understand and respond to the emotional tone of a conversation.
  * **Advanced Cross-Lingual Understanding:** Employs a massive, cross-lingual **embedding model** fine-tuned on a unique dataset to capture subtle linguistic differences.
  * **Seamless User Experience:** The **Next.js** and **tRPC** tech stack ensures a fast, responsive, and real-time user interface.

-----

## 🛠️ Tech Stack

#### 1. Frontend (The Experience Layer)

* **Next.js (React):** The foundation for a fast, SEO-friendly, and responsive user interface.
* **tRPC (Client):** Provides end-to-end type safety. It allows the frontend to call backend functions with full TypeScript autocomplete, ensuring you never send the wrong data to your agent.
* **Tailwind CSS:** For rapid, utility-first UI development (used for the Emotion Dashboard and layout).
* **Lucide React:** For the iconography in the analysis dashboards.

#### 2. Backend (The Orchestration Layer)

* **Node.js & Express:** The primary web server that manages user sessions, authentication, and coordinates between the frontend and the AI services.
* **tRPC (Server):** Handles the API contract between the Next.js app and the server logic.
* **Axios:** Used as the bridge to send requests from the Node.js server to the Python FastAPI service.

#### 3. AI & Data Layer (The Intelligence Layer)

* **Python 3.10+:** The industry standard for AI and Machine Learning.
* **FastAPI:** A high-performance Python web framework used to expose your AI models as an internal microservice.
* **Sentence-Transformers:** The core engine for "Advanced Cross-Lingual Understanding," generating vector embeddings for text in dozens of languages.
* **ChromaDB:** A specialized vector database (VectorDB) used for **Contextual Retrieval (RAG)**. It stores cultural nuances and norms.
* **MongoDB:** Used for persistent storage of "Interactions" (the MERN core), keeping a record of all generated content and metadata.

#### 4. DevOps & Infrastructure (The Deployment Layer)

* **Docker & Docker Compose:** Containerizes the entire stack so that MongoDB, ChromaDB, the Python Engine, and the Web App all run in a unified environment with one command.
* **TypeScript:** Used across the entire JavaScript/Node.js stack to catch errors during development.

---

### 🔄 Data Flow Summary

1. **User** uploads a video/text via the **Next.js** frontend.
2. **Next.js** sends a request via **tRPC** to the **Express** backend.
3. **Express** saves the raw data in **MongoDB** and forwards the task to **FastAPI (Python)**.
4. **Python** processes the input using **Sentence-Transformers**, pulls context from **ChromaDB**, and generates the final output.
5. **Express** receives the AI response, updates **MongoDB**, and sends the result back to the user's dashboard.

-----

## 🚀 Getting Started

### Prerequisites

  * Node.js
  * Python 3.10+
  * Access to the massive multimodal model

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saadsalmanakram/OmniLingua-Agent.git
    cd OmniLingua-Agent
    ```
2.  **Set up the frontend:**
    ```bash
    npm install
    ```
3.  **Configure the backend:**
    Follow the instructions in the `backend/` directory to set up the agent services and connect them to the necessary models.

### Configuration

Create a `.env` file to store your API keys and model credentials.

### Usage

Run the Next.js server and the backend services to start the agent. You can then interact with it via the web interface.

-----

Here is the comprehensive final file structure for **OmniLingua-Agent**. This structure integrates the **Next.js** frontend, **Express** backend, **Python AI Engine**, and **Docker** configurations we've built.

```text
OmniLingua-Agent/
├── apps/
│   ├── web/                         # Frontend (Next.js + Tailwind)
│   │   ├── components/
│   │   │   └── EmotionDashboard.tsx # UI for Vision/Emotion analysis
│   │   ├── pages/
│   │   │   ├── _app.tsx             # tRPC Provider wrapping
│   │   │   └── index.tsx            # Main Landing Page
│   │   ├── utils/
│   │   │   └── trpc.ts              # tRPC Frontend Client logic
│   │   ├── public/                  # Static assets (logos, icons)
│   │   ├── Dockerfile               # Frontend Containerization
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   └── package.json
│   │
│   └── server/                      # Backend (Node.js + Express)
│       ├── src/
│       │   ├── router.ts            # tRPC Router (Business Logic)
│       │   └── server.ts            # Express Entry point
│       ├── Dockerfile               # Backend Containerization
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   ├── ai-engine/                   # AI Layer (Python + FastAPI)
│   │   ├── agent.py                 # Cultural Context & RAG logic
│   │   ├── main.py                  # FastAPI Wrapper
│   │   ├── chroma_db/               # Local Vector Database storage
│   │   ├── Dockerfile               # AI Engine Containerization
│   │   └── requirements.txt         # Python dependencies
│   │
│   └── database/                    # Shared Data Layer
│       └── models/
│           └── Interaction.ts       # Mongoose (MongoDB) Schema
│
├── .env                             # Environment Variables
├── .gitignore                       # Git exclusion rules
├── docker-compose.yml               # Multi-container orchestration
├── package.json                     # Root workspace configuration
└── README.md                        # Project documentation

```

----
