# GeneLedger-DAO 🧬🔗

A decentralized autonomous organization (DAO) designed for genomic research. GeneLedger-DAO expands on the GeneLedger concept by providing a secure, transparent platform where researchers can query genomic data and data owners are automatically compensated via smart contracts, empowering a new model for collaborative and ethical scientific discovery.

-----

## ✨ Features

  * **Decentralized Data Marketplace:** Enables a peer-to-peer ecosystem for genomic data, eliminating the need for a central authority.
  * **Automated Compensation:** Data owners are automatically and transparently compensated via on-chain smart contracts for every query of their data.
  * **Privacy-Preserving Access:** An **Access Control Agent** enforces strict privacy rules, while genomic data is stored in **off-chain encrypted shards**.
  * **Intelligent Querying:** A **Query Agent** translates complex research questions into efficient vector searches using hybrid search with **Weaviate**, combining both semantic and keyword capabilities.
  * **On-Chain Governance:** The system's rules and decision-making are managed by a DAO, allowing the community to govern the platform's evolution.

-----

## ⚙️ Tech Stack

#### 🌐 Frontend & User Interface

* **Framework:** **Next.js 15+ (App Router)** - Chosen for Server-Side Rendering (SSR) to optimize SEO for research papers and lightning-fast client-side navigation.
* **Styling:** **Tailwind CSS** - Used for rapid, responsive UI development with a "Clean Science" aesthetic.
* **Icons:** **Lucide React** - For lightweight, accessible vector icons.
* **State Management:** **React Context + TanStack Query** - To handle complex data fetching states from both Weaviate and Solana.

---

#### ⛓️ Blockchain & Governance (On-Chain)

* **Network:** **Solana** - High-throughput, low-latency L1 blockchain essential for micro-payments per query.
* **Framework:** **Anchor (Rust)** - The industry standard for writing secure, audited Solana smart contracts.
* **Wallet Integration:** **Solana Wallet Adapter** - Supports Phantom, Solflare, and Ledger for researcher authentication.
* **Logic:**
* **Data Registry:** Maps IPFS CID to Data Owner Pubkey.
* **Automated Compensation:** Escrow-based logic that releases SOL to owners upon successful Query Agent verification.
* **DAO Governance:** SPL-Governance based voting for platform upgrades and ethical data standards.



---

#### 🤖 AI & Search Agents (Off-Chain)

* **Core Language:** **Rust** - Used for the heavy lifting: encryption, sharding, and high-performance querying.
* **Vector Database:** **Weaviate** - An AI-native multimodal database.
* **Hybrid Search:** Combines BM25 (keyword) and Vector (semantic) search to find genomic variants.
* **Deployment:** Self-hosted via **Docker** to maintain data sovereignty.


* **Local Caching:** **LanceDB** - An embedded OOS vector database.
* **Format:** Built on **Apache Arrow** for zero-copy data transport.
* **Purpose:** Allows researchers to save a local "snapshot" of their purchased data for offline analysis without re-paying.



---

#### 🔐 Security & Data Infrastructure

* **Encryption:** **AES-256-GCM** - Symmetric encryption for genomic shards.
* **Storage:** **IPFS / Arweave** - Decentralized file storage for encrypted genomic blobs.
* **Data Formats:** Native support for **.VCF** (Variant Call Format) and **.FASTA** for genomic sequences.
* **Communication:** **WASM (WebAssembly)** - Compiling Rust agents to run in the browser, ensuring data is encrypted *before* it ever leaves the researcher's machine.

-----

## 🚀 Getting Started

### Prerequisites

  * Rust
  * Node.js (for Solana CLI)
  * Docker (for Weaviate)
  * Solana CLI

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/saadsalmanakram/GeneLedger-DAO.git
    cd GeneLedger-DAO
    ```
2.  **Start Docker containers:**
    ```bash
    docker-compose up -d
    ```
3.  **Build the smart contract:**
    ```bash
    cd programs/geneledger-dao
    anchor build
    ```
4.  **Set up the agents:**
    Follow the instructions in the `agents/` directory to build the core Rust-based agents.

### Configuration

Set up your Solana wallet and configure the smart contract address in the `Anchor.toml` file.

### Usage

Interact with the DAO by using the CLI tools provided in the `cli/` directory to register data, submit queries, and receive payments.

-----

To finalize **GeneLedger-DAO**, here is the complete, high-level directory structure. This organization follows the **Monorepo** pattern, separating the Solana on-chain logic, the Rust-based agents (off-chain logic), and the Next.js frontend while keeping them integrated through shared types and configurations.

## 📂 Project Structure

```text
GeneLedger-DAO/
├── anchor/                 # Solana Smart Contracts (Anchor)
│   ├── programs/
│   │   └── geneledger_dao/
│   │       └── src/
│   │           ├── lib.rs          # Main program entry & routing
│   │           ├── state.rs        # Account structs (DataRecord, DAOState)
│   │           └── instructions/   # Instruction logic (register, pay)
│   ├── tests/                      # Mocha/Chai TS tests
│   ├── Anchor.toml                 # Program & Network configuration
│   └── deploy.sh                   # Automation script for ID syncing
├── agents/                 # Rust-based Off-chain Services
│   ├── query_agent/        # Vector search & cache logic
│   │   ├── src/
│   │   │   ├── main.rs     # Query entry point
│   │   │   ├── schema.rs   # Weaviate schema setup
│   │   │   └── cache.rs    # LanceDB local storage logic
│   │   └── Cargo.toml
│   └── access_agent/       # Encryption & Sharding
│       ├── src/
│       │   ├── lib.rs      # Encryption (AES-256) functions
│       │   └── shard.rs    # Sharding & IPFS upload logic
│       └── Cargo.toml
├── apps/
│   └── web/                # Next.js Frontend
│       ├── public/         # Static assets
│       ├── src/
│       │   ├── app/        # Next.js App Router (Upload, Search, DAO pages)
│       │   ├── components/ # Tailwind UI components
│       │   ├── idl/        # Synced .json IDL from Anchor
│       │   └── lib/
│       │       ├── solana.ts   # Wallet & Program connection
│       │       └── weaviate.ts # Client for vector DB interaction
│       ├── .env.local      # Local environment variables
│       └── package.json
├── docker-compose.yml      # Orchestrates Weaviate & Local Services
├── local_research_cache/   # Directory for LanceDB (.lance files)
└── README.md

```

---