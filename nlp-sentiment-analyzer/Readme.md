
---

# 🧠 NLP Sentiment Analyzer API

A lightweight, high-performance Sentiment Analysis tool built with **Node.js** and the **Natural** NLP library. This project allows users to input text and receive a sentiment score and classification (Positive, Negative, or Neutral) in real-time.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v18+-green.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)

## 🚀 Features

-   **Instant Analysis:** Real-time sentiment scoring using the AFINN vocabulary.
-   **Custom Lexicon Support:** Fine-tune the AI by adding custom weights for specific words (e.g., brand names or slang).
-   **Modern UI:** A clean, responsive dashboard built with Tailwind CSS.
-   **RESTful API:** Easily integrate the sentiment engine into other applications.
-   **Environment Protection:** Uses `dotenv` to manage configurations securely.

## 🛠️ Tech Stack

-   **Backend:** Node.js, Express.js
-   **NLP Engine:** [Natural](https://www.npmjs.com/package/natural)
-   **Frontend:** HTML5, Tailwind CSS, JavaScript (Fetch API)
-   **Security:** Dotenv, CORS, Gitignore

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/saadxsalman/nlp-sentiment-analyzer.git](https://github.com/saadxsalman/nlp-sentiment-analyzer.git)
    cd nlp-sentiment-analyzer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the root directory:
    ```env
    PORT=3000
    ```

4.  **Run the application:**
    ```bash
    # For development (requires nodemon)
    npm run dev

    # For production
    node index.js
    ```

## ⚙️ Customizing the AI

You can modify word weights without touching the core logic. Open `custom-lexicon.json` and add your own terms:

```json
{
    "saadxsalman": 5,
    "glitchy": -4,
    "fire": 3
}

```

*Higher positive numbers = Happier sentiment. Lower negative numbers = Angrier sentiment.*

## 🔌 API Documentation

### Analyze Sentiment

**Endpoint:** `POST /analyze`

**Content-Type:** `application/json`

**Request Body:**

```json
{
  "text": "The project built by saadxsalman is amazing!"
}

```

**Response:**

```json
{
  "score": "0.850",
  "status": "Positive",
  "tokens": ["the", "project", "built", "by", "saadxsalman", "is", "amazing"],
  "customApplied": true
}

```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://www.google.com/search?q=https://github.com/saadxsalman/nlp-sentiment-analyzer/issues).

---

Developed with ❤️ by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)
