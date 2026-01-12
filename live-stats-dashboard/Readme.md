
---

# 🚀 Real-Time Server Stats Dashboard

A high-performance monitoring solution built with **Node.js**, **TypeScript**, and **Redis Pub/Sub**. This project allows you to monitor CPU and RAM usage across multiple distributed servers in real-time through a centralized web dashboard.

## 🛠 Tech Stack

* **Backend**: Node.js (ES Modules)
* **Language**: TypeScript
* **Communication**: Redis Pub/Sub (Messaging) & Socket.io (WebSockets)
* **Frontend**: HTML5, Tailwind CSS, Chart.js
* **Runtime Tooling**: `tsx` (for modern ESM support), `nodemon`

## 🏗 System Architecture

The project is split into two distinct roles to allow for horizontal scaling:

1. **The Agent**: Lightweight script meant to run on every server you want to monitor. It collects system metrics using the `os` module and publishes them to a Redis channel.
2. **The Dashboard Server**: A centralized hub that subscribes to the Redis channel, receives data from all active agents, and broadcasts that data to connected web browsers via WebSockets.

---

## 🚦 Getting Started

### 1. Prerequisites

* **Node.js**: v20 or higher (Tested on v25.2.1)
* **Redis**: Running locally or on a reachable server
* **npm**: Installed with Node.js

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/saadxsalman/live-stats-dashboard.git
cd live-stats-dashboard
npm install

```

### 3. Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
REDIS_URL=redis://localhost:6379
AGENT_NAME=Production-Server-01

```

---

## 🏃 Execution

### Step 1: Start the Dashboard

This launches the web server and the Redis subscriber.

```bash
npm run dashboard

```

Accessible at: `http://localhost:3000`

### Step 2: Start the Agent(s)

To start the default agent defined in your `.env`:

```bash
npm run agent

```

**To simulate multiple servers** on one machine, override the name in your terminal:

```bash
# For Windows (PowerShell)
$env:AGENT_NAME="Database-Cluster"; npm run agent
$env:AGENT_NAME="Email-Worker-01"; npm run agent

# For Linux/Mac
AGENT_NAME="Database-Cluster" npm run agent

```

---

## 📊 Features

* **Distributed Monitoring**: Monitor 1 or 100+ servers simultaneously.
* **Auto-Discovery**: New agents appear on the dashboard automatically as soon as they start publishing.
* **Historical Data**: Integrated **Chart.js** visuals showing the last 20 data points for CPU and RAM.
* **Responsive UI**: Tailwind CSS grid that adjusts based on the number of active servers.
* **Modern ESM**: Uses TypeScript with the latest Node.js `import` patterns and `tsx` execution.

---

## 📂 Project Structure

```text
├── src/
│   ├── agent.ts         # Metric collection & Redis publishing
│   ├── server.ts        # Redis subscription & Socket.io hub
│   └── public/
│       └── index.html   # Frontend dashboard with Chart.js logic
├── .env                 # Environment variables
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts

```
