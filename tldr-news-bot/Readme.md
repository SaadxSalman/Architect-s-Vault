
# 📰 TL;DR News Bot

A modern, fast web application that scrapes news articles and generates a concise **3-sentence summary** using the **Llama 3.2 1B** Large Language Model. Built with Node.js and Tailwind CSS.

## 🚀 Features

* **Instant Summarization:** Uses Hugging Face's Inference API for lightning-fast results.
* **Smart Scraping:** Automatically extracts main article text while filtering out ads and navigation menus using `cheerio`.
* **Token Management:** Handles large text inputs by intelligently trimming content to fit model constraints.
* **Modern UI:** A clean, responsive interface built with Tailwind CSS.

## 🛠️ Tech Stack

* **Backend:** Node.js, Express
* **Scraping:** Axios, Cheerio
* **AI Model:** Llama 3.2 1B (via `@huggingface/inference`)
* **Frontend:** HTML5, Tailwind CSS

---

## 📋 Prerequisites

* [Node.js](https://nodejs.org/) (v18+ recommended)
* A **Hugging Face Access Token** (Free) — [Get it here](https://huggingface.co/settings/tokens)

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/saadxsalman/tldr-news-bot.git
cd tldr-news-bot

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the root directory and add your Hugging Face token:
```env
HF_TOKEN=your_hugging_face_token_here
PORT=3000

```


4. **Run the application:**
```bash
npm start

```


The app will be live at `http://localhost:3000`.

---

## 🧪 Links to Test

You can use these 2026-relevant links to test the bot's ability to summarize complex or long articles:

1. **Space & Science:** [NASA selects proposals for Habitable Worlds Observatory (Jan 2026)](https://www.openaccessgovernment.org/nasa-advances-ambitious-mission-to-search-for-life-beyond-earth/203169/)
2. **Tech & Education:** [AI and Climate Focus at Stripe YSTE 2026](https://www.siliconrepublic.com/innovation/ai-and-climate-prove-major-focuses-among-stripe-yste-2026-entries)
3. **Reference/Long Text:** [Wikipedia: Applications of Artificial Intelligence](https://en.wikipedia.org/wiki/Applications_of_artificial_intelligence)

---

## 📝 Learning Goals Achieved

* **Handling Model Constraints:** Implemented text-trimming logic to manage LLM context windows.
* **API Routing:** Managed the shift from `text-generation` to `conversational` (ChatCompletion) tasks to satisfy modern Inference Providers.
* **Data Sanitization:** Cleaning raw HTML into usable "context" for an AI model.

## 📄 License

ISC License - feel free to use this for your own learning projects!

---

**Developed by [saadxsalman**](https://www.google.com/search?q=https://github.com/saadxsalman)