
---

# 🎬 Semantic Reddit Search (RAG)

A full-stack Retrieval-Augmented Generation (RAG) application that searches the **r/movies** subreddit by **meaning** rather than just keywords. Powered by Weaviate, Supabase, and Llama 3.2.

## 🚀 Features

* **Semantic Search:** Finds relevant Reddit threads based on context (e.g., searching "space horror" finds *Event Horizon* or *Alien*).
* **Automated Ingestion:** Scrapes Reddit's top posts automatically on backend startup.
* **Vector Storage:** Uses **Weaviate Cloud** with the `Snowflake/snowflake-arctic-embed-l-v2.0` model for high-accuracy embeddings.
* **AI Generation:** Provides concise, context-aware answers using **Llama 3.2 3B Instruct** via Hugging Face.
* **Metadata Persistence:** Stores post metadata in **Supabase** for relational tracking.

## 🛠️ Tech Stack

* **Frontend:** Next.js 14+, Tailwind CSS, TypeScript.
* **Backend:** Node.js (ES Modules), Express, TypeScript.
* **Vector DB:** Weaviate Cloud.
* **Database:** Supabase (PostgreSQL).
* **LLM:** Meta Llama 3.2 3B (Hugging Face Inference).

---

## 📋 Prerequisites

Ensure you have the following API keys:

1. **Supabase:** URL and Anon Key.
2. **Weaviate:** Cluster URL and API Key.
3. **Hugging Face:** API Token (with access to Llama 3.2).

## ⚙️ Installation & Setup

1. **Clone the repo:**
```bash
git clone https://github.com/saadxsalman/semantic-reddit-search.git
cd semantic-reddit-search

```


2. **Environment Variables:**
Create a `.env` file in the root directory:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
WEAVIATE_URL=your_weaviate_url
WEAVIATE_API_KEY=your_weaviate_key
HUGGINGFACE_API_KEY=your_hf_token

```


3. **Database Setup:**
Run the SQL provided in the "Supabase Setup" section of the guide in your Supabase SQL editor to enable `pgvector` and create the `posts` table.
4. **Install Dependencies:**
```bash
# Install backend deps
cd backend && npm install
# Install frontend deps
cd ../frontend && npm install

```



## 🏃 Running the Project

Open two terminal windows:

**Terminal 1 (Backend):**

```bash
cd backend
npm run dev

```

*Wait for the console to log "✅ Ingestion Complete".*

**Terminal 2 (Frontend):**

```bash
cd frontend
npm run dev

```
