
---

# 🎬 Mini-Netflix: Node.js Video Streaming Server

A lightweight, high-performance video streaming server built with **Node.js** and **Express**. This project demonstrates the mastery of **HTTP Range Requests** and **Node.js File Streams** to deliver "Netflix-style" seeking and instant playback.

## 🚀 Features
- **Partial Content Streaming**: Uses HTTP 206 status codes to send video in chunks.
- **Instant Seeking**: Users can jump to any timestamp without waiting for the full video to download.
- **Memory Efficient**: Uses `fs.createReadStream` to ensure low RAM usage, even for 4K video files.
- **Modern UI**: A sleek, dark-themed player built with **Tailwind CSS**.
- **Environment Safety**: Secured with `dotenv` for configuration management.

## 🛠️ Technical Deep Dive

Standard file serving sends the entire file at once. This project implements **Chunked Data Transfer**:
1. The browser requests a specific byte range (e.g., `bytes=0-`).
2. The server calculates the chunk size and reads only that portion of the file using `fs.createReadStream({ start, end })`.
3. The server responds with a `206 Partial Content` header and the specific bytes.



## 📁 Project Structure
```text
mini-netflix/
├── videos/          # Store your MP4 files here (git-ignored)
├── public/          # Frontend assets (HTML/Tailwind)
├── .env             # Environment variables (PORT, etc.)
├── .gitignore       # Prevents sensitive/large files from being pushed
├── index.js         # Core streaming logic
└── package.json     # Project dependencies

```

## ⚙️ Setup & Installation

1. **Clone the repository:**
```bash
git clone [https://github.com/saadxsalman/mini-netflix.git](https://github.com/saadxsalman/mini-netflix.git)
cd mini-netflix

```


2. **Install dependencies:**
```bash
npm install

```


3. **Prepare your video:**
* Create a folder named `videos`.
* Add an MP4 file and rename it to `sample.mp4`.


4. **Set up Environment Variables:**
Create a `.env` file in the root:
```env
PORT=3000

```


5. **Run the server:**
```bash
node index.js

```


Visit `http://localhost:3000` in your browser.

## 🛠️ Built With

* **Node.js**: Runtime environment.
* **Express**: Web framework.
* **Tailwind CSS**: Modern styling.
* **Dotenv**: Environment variable management.

---

Developed by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)
