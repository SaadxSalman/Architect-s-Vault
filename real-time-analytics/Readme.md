
---

# Real-Time Analytics Dashboard 🚀

A high-performance, event-driven analytics dashboard built with **Node.js**, **Socket.io**, and **Redis**. This project demonstrates how to process and visualize visitor data live without lagging the server or overloading a traditional database.

## 🛠 Tech Stack

- **Backend:** Node.js, Express
- **Real-Time:** Socket.io (WebSockets)
- **Data Layer:** Redis (In-memory data store for high-speed counters)
- **Frontend:** Tailwind CSS, Chart.js
- **Environment:** Dotenv (Secret Management)

## ⚡ Key Features

- **Live Counter:** Tracks concurrent users currently connected to the application.
- **Persistent Aggregates:** Uses Redis atomic increments (`INCR`) to track total page views.
- **Live Graphing:** Visualizes traffic spikes over time using Chart.js with sub-second latency.
- **Efficiency:** Leverages Redis for high-frequency writes to keep the Event Loop unblocked.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [Redis](https://redis.io/download) (Running locally or via cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/saadxsalman/real-time-analytics.git](https://github.com/saadxsalman/real-time-analytics.git)
   cd real-time-analytics

```

2. **Install dependencies:**
```bash
npm install

```


3. **Environment Setup:**
Create a `.env` file in the root directory:
```env
PORT=3000
REDIS_URL=redis://localhost:6379

```


4. **Run the application:**
```bash
# Using nodemon for development
npm run dev 

# Or standard node
node server.js

```



## 🧠 What I Learned

### Handling High-Frequency Data

Standard SQL databases can become a bottleneck when writing every single "page view" event. By using **Redis**, we perform atomic operations in-memory, which allows the server to handle thousands of updates per second with minimal CPU overhead.

### WebSocket Synchronization

Instead of the client polling the server (asking "any new data?"), the server **pushes** data only when a state change occurs in Redis. This ensures the UI is always in sync with the actual server state.

