
---

# 🌐 TechNews Scraper

A lightweight, real-time web scraping application built with **Node.js**. This project demonstrates how to extract data directly from HTML structures without relying on official APIs, featuring a modern dashboard styled with **Tailwind CSS**.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Features
- **Engine:** Puppeteer (Headless Chrome) - *Used to bypass 403 Forbidden errors.*
- **Parsing:** Cheerio
- **Live Scraping:** Fetches current technology headlines using `Axios`.
- **HTML Parsing:** Utilizes `Cheerio` to traverse the DOM and extract specific data points.
- **Dynamic UI:** Renders data beautifully using `EJS` templates and Tailwind CSS.
- **Security:** Environment variables managed via `dotenv` to keep configurations private.
- **Bot Mimicry:** Includes custom User-Agent headers to ensure reliable data retrieval.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Scraping:** Axios (HTTP Client), Cheerio (HTML Parser)
- **Frontend:** EJS, Tailwind CSS
- **Environment:** Dotenv

## 📋 Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/saadxsalman/node-scraper-saadxsalman.git](https://github.com/saadxsalman/node-scraper-saadxsalman.git)
   cd node-scraper-saadxsalman

```

2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the root directory:
```env
PORT=3000
TARGET_URL=[https://www.bbc.com/news/technology](https://www.bbc.com/news/technology)

```


4. **Run the application:**
```bash
# Start the server
node index.js

```


5. **View the project:**
Navigate to `http://localhost:3000` in your web browser.

## 🔍 How it Works

1. **The Request:** The app uses `Axios` to send a GET request to the `TARGET_URL`.
2. **The Extraction:** `Cheerio` loads the returned HTML string, allowing us to select elements using jQuery-like syntax (e.g., `$('h2').text()`).
3. **The Presentation:** The extracted array of headlines and links is passed to the EJS engine and displayed in a responsive Tailwind grid.

## 🛡️ Privacy & Security

* Sensitive configurations (like Port and URLs) are stored in `.env`.
* The `.gitignore` file is configured to ensure `node_modules` and `.env` are never tracked by Git.

---

Developed with ❤️ by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)

