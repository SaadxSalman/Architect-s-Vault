# Guardian-Agent 🛡️💻

An autonomous agent that revolutionizes cybersecurity by proactively monitoring and defending a network. Guardian-Agent analyzes network traffic, hunts for vulnerabilities, learns from past attacks, and adapts its defense strategy in real-time to neutralize threats.

-----

## ✨ Features

  * **Proactive Threat Hunting:** The **Threat Analysis Agent** actively seeks out vulnerabilities and potential threats rather than just reacting to them.
  * **Real-Time Adaptive Defense:** The **Response Agent** can adapt its strategies and automatically quarantine threats as they are identified.
  * **Large-Scale Data Analysis:** Utilizes an **OLAP database** to analyze massive volumes of network traffic data, identifying subtle patterns of malicious activity.
  * **Vector-Based Threat Intelligence:** Creates a sophisticated **vector space** of network traffic patterns, malicious code, and attack signatures, enabling fast and accurate threat identification.
  * **Fine-Tuned AI Models:** Leverages a local, **fine-tuned Gemma-3 model** for deep analysis of cybersecurity data, ensuring the agent's insights are highly relevant and accurate.

-----

## ⚙️ Tech Stack

### 1. Core Engine (Backend & AI)

* **Language:** **Rust** (Edition 2021)
* **AI Inference:** **Candle** (Hugging Face’s lightweight ML framework for Rust).
* **Model:** **Fine-tuned Gemma-3** (Quantized to `.gguf` for local CPU/GPU execution).
* **Packet Processing:** `pcap` and `etherparse` for raw network layer analysis.
* **Concurrency:** `Tokio` (Async runtime) for handling multiple packet streams.
* **Communication:** `tokio-tungstenite` for high-frequency WebSocket broadcasting.

### 2. Database & Vector Intelligence

* **Vector Database:** **LanceDB** (Serverless, disk-based vector search for threat signatures/embeddings).
* **OLAP Database:** **ClickHouse** (For "Large-Scale Data Analysis" of historical network logs).
* **Application DB:** **MongoDB** (Part of the MERN stack for user auth and dashboard persistent settings).

### 3. Dual-Frontend Architecture

* **Primary Dashboard:** **Next.js 14+** (App Router, TypeScript).
* **Styling:** Tailwind CSS + Shadcn/UI.
* **Charts:** Recharts (for vector similarity scatter plots and traffic spikes).


* **Service/Service UI:** **SvelteKit**.
* **Purpose:** Lightweight "Heartbeat" monitor.
* **State Management:** Svelte Writable Stores (for zero-latency log streaming).



### 4. Security & Simulation

* **Simulation Engine:** **Python 3.11** with **Scapy** (Used to craft malicious packets like SYN floods and Port Scans).
* **System Security:** `iptables` integration for the "Response Agent" to quarantine IPs.
* **Orchestration:** **Docker & Docker Compose** to manage the DB services and environment isolation.

---

### 🛰️ Data Flow Summary

1. **Capture:** Rust `pcap` sniffs a packet.
2. **Analyze:** Gemma-3 (via Candle) determines if the payload is malicious.
3. **Search:** LanceDB checks if this "fingerprint" matches known attack vectors.
4. **Log:** ClickHouse stores the event for long-term trend analysis.
5. **Act:** Response Agent updates `iptables` if the threat is "Critical."
6. **Broadcast:** WebSockets push the event to Next.js and SvelteKit simultaneously.

-----

## 🚀 Getting Started

### Prerequisites

  * Rust
  * Node.js (for SvelteKit)
  * Access to a compatible OLAP database

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saadsalmanakram/Guardian-Agent.git
    cd Guardian-Agent
    ```
2.  **Set up the backend:**
    ```bash
    cargo build --release
    ```
3.  **Set up the frontend:**
    ```bash
    cd frontend
    npm install
    ```
4.  **Configure the OLAP database:**
    Follow the instructions in the documentation to connect the agent to your OLAP database.

### Configuration

Create a `.env` file to store your API keys and configuration variables for the Gemma model and other services.

### Usage

Run the Rust backend and the SvelteKit frontend to begin monitoring your network and receiving real-time threat intelligence.

-----

Here is the comprehensive and final directory structure for **Guardian-Agent**. This structure integrates the **Rust engine (Candle/Gemma/LanceDB)**, the **MERN/Next.js dashboard**, the **Python simulator**, and the **Docker infrastructure**.

### 📂 Guardian-Agent Project Structure

```text
Guardian-Agent/
├── guardian-engine/                # Rust Core (The "Guardian")
│   ├── src/
│   │   ├── main.rs                 # System orchestration & CLI
│   │   ├── network.rs              # Packet sniffing (pcap/etherparse)
│   │   ├── analyzer.rs             # Gemma-3 Inference (Candle)
│   │   ├── vector_store.rs         # LanceDB vector logic
│   │   ├── response_agent.rs       # Firewall/Quarantine logic (iptables)
│   │   └── olap_client.rs          # ClickHouse data ingestion
│   ├── weights/                    # Local storage for Gemma-3 .gguf files
│   ├── data/                       # Local LanceDB vector tables
│   ├── Cargo.toml                  # Rust dependencies
│   └── .env                        # Engine-specific configs
├── dashboard-next/                 # Web Interface (The "Dashboard")
│   ├── src/
│   │   ├── app/                    # Next.js App Router
│   │   │   ├── api/                # Backend routes (Next.js/Express)
│   │   │   │   └── threats/        # Threat data endpoints
│   │   │   └── page.tsx            # Main dashboard UI
│   │   ├── components/             # UI Components
│   │   │   ├── ThreatMap.tsx       # Live SVG/Websocket map
│   │   │   └── VectorChart.tsx     # Recharts similarity visualization
│   │   └── lib/
│   │       ├── mongodb.ts          # Mongoose connection
│   │       └── models/             # Mongoose Schemas (Threat.ts)
│   ├── tailwind.config.ts
│   └── package.json
├── legacy-ui-svelte/               # Service/Status UI (SvelteKit)
│   ├── src/
│   │   ├── lib/                    # Shared Svelte stores & utils
│   │   ├── routes/                 # SvelteKit File-based routing
│   │   │   ├── +layout.svelte      # Shared UI (Nav, Footer)
│   │   │   └── +page.svelte        # The status service entry point
│   │   └── app.html                # HTML Template
│   ├── static/                     # Static assets (favicons, etc.)
│   ├── svelte.config.js            # SvelteKit configuration
│   └── package.json
├── tests/                          # Testing & Simulation
│   ├── adversary_simulator.py      # Python/Scapy attack script
│   └── requirements.txt            # Scapy dependency
├── docker/                         # Container configurations
│   └── clickhouse-init.sql         # Initial OLAP schema setup
├── .env.example                    # Template for environment variables
├── docker-compose.yml              # MongoDB & ClickHouse orchestration
└── README.md                       # Project documentation

```

---