 
---

# 🌍 Instant Transformers: Multi-Language Translator

An "Instant" language translation engine powered by **Meta's Llama 3.2 3B Instruct** and **Hugging Face Inference**. This project demonstrates how to chain language detection, translation, and linguistic reasoning into a single-pass AI pipeline.

---

## 🚀 Key Features

* **Zero-Latency Translation**: Leverages serverless inference for rapid processing.
* **Llama 3.2 Intelligence**: Uses a 3-billion parameter model optimized for instruction following.
* **Contextual Reasoning**: The AI doesn't just translate; it explains *why* it chose specific words (e.g., formal vs. informal).
* **Clean Architecture**: Built with Node.js, Express, and the official `@huggingface/inference` library.

---

## 🛠️ Tech Stack

- **Backend**: Node.js (ES Modules)
- **Framework**: Express.js
- **AI Model**: `meta-llama/Llama-3.2-3B-Instruct`
- **Client**: Hugging Face Inference SDK
- **Frontend**: Tailwind CSS & HTML5

---

## 🧪 The AI Pipeline

The core logic of this application is a **System Prompt Pipeline**. Instead of making three separate API calls for detection, translation, and reasoning, we use a structured system prompt to get a single, deterministic JSON response.



1. **Input**: User provides raw text and a target language.
2. **Contextual Instruction**: The System Prompt defines the AI's role as a "Linguist."
3. **Structured Output**: The model processes the request and returns a strictly formatted JSON object containing all three data points.

---

## 📦 Installation & Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- A Hugging Face Access Token ([Get it here](https://huggingface.co/settings/tokens))

### 2. Clone & Install
```bash
git clone [https://github.com/saadxsalman/instant-translator.git](https://github.com/saadxsalman/instant-translator.git)
cd instant-translator
npm install

```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
HF_TOKEN=your_hugging_face_token_here
PORT=3000

```

### 4. Run the App

```bash
node index.js

```

The server will start at `http://localhost:3000`.

---

## 📡 API Reference

### POST `/api/translate`

Processes text through the Llama 3.2 pipeline.

**Request Body:**

```json
{
  "text": "Comment ça va?",
  "targetLang": "Spanish"
}

```

**Response Body:**

```json
{
  "success": true,
  "detected": "French",
  "translation": "¿Cómo estás?",
  "reasoning": "Translated from French to Spanish using informal tone."
}

```

---

## 👤 Author

* GitHub: [@saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)
