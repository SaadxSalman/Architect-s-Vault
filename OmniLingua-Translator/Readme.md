
# OmniLingua-Translator: A Culturally-Aware, Multimodal Translation Agent 🗣️🌍

**OmniLingua-Translator** is an advanced, multi-agent translation system that transcends simple word-for-word translation. Built upon the massive **OmniLingua-SEA** dataset, this project is designed to capture and convey the **cultural context, idioms, and emotional tone** of the languages of India and Pakistan. With its multimodal capabilities, it can translate not only text but also speech and even visual cues, providing a truly comprehensive and culturally resonant translation.

## ✨ Key Features

-   **Culturally-Aware Translation:** The system goes beyond literal translation to preserve and convey the nuances, proverbs, and social context embedded within the source language.
-   **Multimodal Capabilities:** It processes and translates text, audio, and video, integrating all forms of communication for a more complete understanding.
-   **Intelligent Agent Workflow:** A system of specialized agents works collaboratively to ensure accuracy, cultural relevance, and natural-sounding output.
-   **Grounded in Real Data:** It uses a Retrieval-Augmented Generation (RAG) system to pull from the original OmniLingua-SEA dataset, reducing hallucinations and ensuring translations are accurate and up-to-date. 

---

## 💻 Tech Stack

The application is built using a modern, scalable **MERN** architecture with a specialized frontend for high-performance interaction:

* **Frontend:** [Next.js](https://nextjs.org/) (App Router) for optimized server-side rendering and routing.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a responsive, utility-first design system.
* **Type Safety:** [TypeScript](https://www.typescriptlang.org/) integrated across the entire stack to ensure robust, maintainable code.
* **Backend:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) handling the API orchestration between AI agents.
* **Database:** [MongoDB](https://www.mongodb.com/) for user data and session management, alongside [Weaviate](https://weaviate.io/) for vector storage.


---

## ⚙️ Core Components

### Agentic AI System

The translation process is orchestrated by a team of specialized AI agents:

-   **Perception Agent:** This agent processes the input. For audio, it uses an audio model to transcribe speech; for video, it uses a vision-language model to analyze visual cues like facial expressions and body language, extracting emotional and contextual information.
-   **Context Agent:** Using the fine-tuned LLM and a hybrid search, this agent analyzes the input's cultural and historical context. It identifies idioms, colloquialisms, and cultural references that require special handling.
-   **Linguistic Agent:** This agent performs the initial translation, converting the text from the source to the target language using the core fine-tuned model.
-   **Refinement Agent:** This agent polishes the translation to ensure it reads naturally and is culturally appropriate. It uses the RAG system to find better phrasing or more accurate terminology from the OmniLingua-SEA dataset.

### Fine-Tuning on OmniLingua-SEA

The project's foundation is a **large language model (LLM)**, Gemma in this case, that has been meticulously fine-tuned on the massive **OmniLingua-SEA** dataset. This process is about more than just vocabulary; it trains the model to understand the subtle linguistic and cultural nuances, idiomatic expressions, and social context of the languages of India and Pakistan.

### Hybrid Search and RAG

To ensure accuracy and prevent hallucinations, OmniLingua-Translator uses a **Retrieval-Augmented Generation (RAG)** system powered by a **Hybrid Search** approach.
-   **Vector Search (Weaviate):** The system uses vector embeddings to perform a semantic search, finding paragraphs or sentences that are conceptually similar to the input query.
-   **Keyword Search:** It also uses traditional keyword search to find specific terms or named entities.
-   **Augmentation:** The retrieved, relevant information is used to augment the LLM's prompt, providing it with real-time, context-specific information from the original corpora. This is especially vital for translating specialized content.

### Multimodal Integration

Beyond text, the system incorporates advanced models to understand different forms of communication:

-   **Vision-Language Model:** Used by the Perception Agent to analyze video inputs, interpreting facial expressions and other visual cues to understand emotional tone.
-   **Audio Model:** Utilized to transcribe and analyze speech, capturing not just the words but also the tone and prosody of the speaker.

---

## 🛠️ Advanced Stack and Workflow

1.  **Input Submission:** A user submits text, audio, or video via the **Next.js** user interface.
2.  **Input Processing:** The **Perception Agent** processes the raw input, converting it into a unified data representation (text + contextual/emotional data).
3.  **Context Analysis:** The **Context Agent** analyzes this data, using the fine-tuned LLM and Hybrid Search to identify all relevant cultural and linguistic nuances.
4.  **Initial Translation:** The **Linguistic Agent** creates a first draft of the translation.
5.  **Refinement:** The **Refinement Agent** refines the translation, using the RAG system to pull in better phrasing from the OmniLingua-SEA dataset.
6.  **Final Output:** The refined, culturally-aware translation is presented to the user. The UI can also provide optional cultural notes to explain the translation choices.

---

## 🚀 Getting Started

Instructions on how to set up the different agents and models will be provided here, covering:

1.  **Model Setup:** Fine-tuning the LLM on the OmniLingua-SEA dataset.
2.  **Vector Database Configuration:** Setting up and populating **Weaviate** for the Hybrid Search and RAG system.
3.  **Agent Orchestration:** Configuring the communication and workflow between the different agents.
4.  **UI Deployment:** Deploying the Next.js user interface.

---

To wrap everything up, here is the finalized, comprehensive file structure for **OmniLingua-Translator**. This structure integrates the Next.js frontend, the Node.js agent orchestrator, the Python perception microservice, and the migration scripts.

### 📂 Project Structure

```text
OmniLingua-Translator/
├── client/                         # NEXT.JS FRONTEND
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx          # Global layout
│   │   │   ├── page.tsx            # Landing/Hero
│   │   │   └── translate/
│   │   │       └── page.tsx        # Main Translation UI & Polling Logic
│   │   ├── components/
│   │   │   ├── ui/                 # Reusable Radix/Tailwind components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── progress.tsx
│   │   │   │   └── card.tsx
│   │   │   └── PerceptionAgentUploader.tsx
│   │   ├── hooks/
│   │   │   ├── useFileUpload.ts    # Handles Axios uploads
│   │   │   └── useTranslationStatus.ts # Handles polling logic
│   │   ├── lib/
│   │   │   └── utils.ts            # Tailwind CSS merger (cn)
│   │   └── services/
│   │       └── api.ts              # Axios instance configuration
│   ├── tailwind.config.ts
│   └── package.json
│
├── server/                         # NODE.JS & AGENT ORCHESTRATOR
│   ├── src/
│   │   ├── agents/                 # Specialized AI Agent Logic
│   │   │   ├── PerceptionAgent.ts  # Calls Python Service
│   │   │   ├── ContextAgent.ts     # Weaviate Hybrid Search
│   │   │   ├── LinguisticAgent.ts  # Initial Gemma Translation
│   │   │   ├── RefinementAgent.ts  # Self-Correction Loop
│   │   │   └── orchestrator.ts     # Job queue & workflow management
│   │   ├── controllers/
│   │   │   └── translationController.ts
│   │   ├── routes/
│   │   │   └── translationRoutes.ts
│   │   ├── services/
│   │   │   └── weaviate.ts         # Weaviate Client Setup
│   │   └── index.ts                # Entry Point
│   ├── uploads/                    # Temp storage for Node.js
│   ├── tsconfig.json
│   └── package.json
│
├── perception_service/             # PYTHON PERCEPTION MICROSERVICE
│   ├── app.py                      # Flask API (Whisper + MoviePy)
│   ├── requirements.txt            # Python deps
│   └── venv/                       # Virtual environment
│
├── scripts/                        # DATA OPS
│   ├── migrateData.ts              # Weaviate Schema & Batch Import
│   └── dataset.json                # OmniLingua-SEA source data
│
├── .env                            # Global Environment Variables
├── docker-compose.yml              # For running Weaviate locally
└── README.md                       # Project Documentation

```

---