
---

## `README.md`

```markdown
# 🧵 CPU-Intensive Fibonacci Calculator (Node.js Worker Threads)

A high-performance Node.js application that calculates the $n^{th}$ Fibonacci number using **Worker Threads**. This project demonstrates how to offload heavy, blocking CPU tasks to background threads, keeping the main Event Loop responsive.

## 🚀 The Challenge
Node.js is single-threaded. If you run a heavy recursive calculation (like Fibonacci) on the main thread, the entire server freezes—meaning no other users can connect until the math is finished. 

**This solution solves that by:**
1. Receiving the request on the **Main Thread**.
2. Spawning a **Worker Thread** for the heavy math.
3. Returning the result via message passing once complete.

## 🛠️ Tech Stack
- **Backend:** Node.js (ES Modules)
- **Framework:** Express.js
- **Frontend:** HTML5 & Tailwind CSS
- **Concurrency:** Node.js `worker_threads` module

## 📂 Project Structure
```text
.
├── public/
│   └── index.html    # Frontend UI with Tailwind CSS
├── server.js         # Express server (Main Thread)
├── fib-worker.js     # Fibonacci logic (Worker Thread)
├── .env              # Environment variables
├── .gitignore        # Git ignore rules
└── package.json      # Dependencies and scripts

```

## ⚡ Quick Start

### 1. Clone the repository

```bash
git clone [https://github.com/saadxsalman/fibonacci-worker.git](https://github.com/saadxsalman/fibonacci-worker.git)
cd fibonacci-worker

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Setup Environment

Create a `.env` file in the root directory:

```env
PORT=3000

```

### 4. Run the Application

```bash
npm start

```

Visit `http://localhost:3000` in your browser.

## 🧪 How to Test Concurrency

1. Open the application in your browser.
2. Enter a high number (e.g., `45`) and click **Calculate**.
3. While it is calculating, open a new tab and try to visit the site again or trigger a smaller calculation (e.g., `10`).
4. **Result:** The second request will resolve instantly because the main thread is not blocked by the first calculation!

## 📝 Concepts Mastered

* **Event Loop Management:** Preventing blocking operations.
* **Worker Threads:** Parallelism in Node.js.
* **ES Modules:** Using `import/export` syntax in Node.js.
* **Message Passing:** Communicating between `parentPort` and `Worker`.

---

Developed by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)
