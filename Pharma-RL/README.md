---
# Pharma-RL: Reinforcement Learning for De Novo Drug Discovery 💊🧪

Welcome to Pharma-RL, a groundbreaking project that harnesses the power of **reinforcement learning (RL)** to revolutionize de novo drug discovery. By framing molecular design as a game, an AI agent is trained to construct novel drug molecules from the ground up, one atom at a time. This project aims to navigate the vast and complex chemical space efficiently, seeking out molecules with specific, desirable properties such as high binding affinity, low toxicity, and ease of synthesis.

## ✨ Key Features

-   **Intelligent Molecule Generation:** An RL agent learns to "play a game" of molecular construction, making intelligent decisions on how to add or modify atoms and bonds.
-   **Tailored Feedback Mechanism:** A sophisticated property prediction model acts as a **dynamic reward function**, guiding the agent's exploration towards molecules that satisfy a predefined set of criteria.
-   **Molecular Representation:** Utilizes a specialized deep learning model, such as a **graph neural network (GNN)**, to create rich molecular embeddings that serve as the state representation for the RL agent.
-   **Transparent and Decentralized Ledger:** Integrates the Solana blockchain to provide a transparent and immutable log of successful drug candidates and their properties.

---

---

## 🛠️ Tech Stack

-   **Core Simulation & Molecular Manipulation:** **Rust** 🦀 - Chosen for its performance, memory safety, and concurrency, making it ideal for computationally intensive molecular simulations.
-   **Reinforcement Learning & Deep Learning:** **PyTorch** 🔥 - A flexible and powerful deep learning framework that provides the tools needed to build and train our complex RL and GNN models.
-   **Decentralized Ledger:** **Solana** ☀️ - Utilized for its high throughput and low transaction costs, enabling an efficient and transparent log of successful drug candidates.
-   **Web Interface & Dashboard (MERN Stack):**
    -   **Frontend:** **Next.js** (React) with **TypeScript** - For a type-safe, high-performance user interface to visualize molecular structures and RL progress.
    -   **Styling:** **Tailwind CSS** - A utility-first CSS framework for rapid and responsive UI development.
    -   **Backend:** **Node.js** & **Express** - Handling API requests and orchestrating communication between the RL engine and the database.
    -   **Database:** **MongoDB** - A flexible NoSQL database used to store historical training data, user configurations, and cached molecular properties.

---

## ⚙️ Core Components

### Reinforcement Learning Framework

The heart of Pharma-RL is a deep RL agent.
-   **State:** The current molecular structure, represented by a specialized molecular embedding.
-   **Actions:** Discrete chemical operations such as adding an atom, creating a bond, or modifying an existing bond.
-   **Reward:** A scalar value provided by the property prediction model, rewarding the agent for generating molecules with desired characteristics.

### Molecular Embeddings

To effectively represent a molecule's structure for the RL agent, we use a **Graph Neural Network (GNN)**. A GNN processes the molecule's atoms and bonds as nodes and edges in a graph, producing a vector-based embedding that captures the molecule's structural and chemical properties.

### Property Prediction & Feedback Loop

The reward function is not static; it is powered by a machine learning model that predicts crucial molecular properties. This could include models for:
-   Target protein binding affinity
-   Toxicity
-   Solubility
-   Synthesizability

The predictions from this model serve as the "reward signal," steering the RL agent toward promising regions of the chemical space.

### Decentralized Logging with Solana

To ensure transparency and create a verifiable record of our findings, we use the **Solana blockchain**. Each time the RL agent discovers a molecule that meets the success criteria, its structure and key properties are logged as a transaction on the Solana ledger.

---

## 🛠️ Tech Stack

* **Core Simulation & Molecular Manipulation:** **Rust** 🦀
* Chosen for its performance and memory safety, handling high-speed chemical valency validation.
* **PyO3 & Maturin:** Used to bridge Rust logic into Python as a high-performance native module.
* **RDKit (Rust Bindings):** For advanced cheminformatics and molecular coordinate generation.


* **Reinforcement Learning & Deep Learning:** **PyTorch** 🔥
* **RL Algorithms:** Implementation of DQN/PPO agents for molecular graph construction.
* **Graph Neural Networks (GNN):** Utilizing **PyTorch Geometric** to create molecular embeddings and dynamic reward functions (Property Prediction).


* **Decentralized Ledger:** **Solana** ☀️
* **Anchor Framework:** Used to develop secure eDSL programs (smart contracts) for molecular logging.
* **Transparency:** Provides an immutable, timestamped record of discovery with high throughput and low transaction fees.


* **Web Interface & Dashboard (MERN Stack):**
* **Frontend:** **Next.js** (React) with **TypeScript** - A type-safe UI for real-time RL progress tracking.
* **3D Visualization:** **3Dmol.js** integration for interactive WebGL molecular rendering.
* **Styling:** **Tailwind CSS** - Utility-first CSS for a responsive, modern laboratory dashboard.
* **Backend:** **Node.js** & **Express** - Orchestrating the flow between the Python ML service, MongoDB, and the Solana Devnet.
* **Database:** **MongoDB** - Storing training metadata, user configurations, and caching blockchain transaction history.


---

## 🚀 Getting Started

Instructions on how to set up the project will be provided here. This will include:

1.  **Installation:** How to install Rust, PyTorch, and other dependencies.
2.  **Environment Setup:** Details on setting up the required environment variables and configurations.
3.  **Running the Simulation:** Commands to run the RL training and molecular generation process.
4.  **Viewing Results:** How to query the Solana blockchain to view the logged drug candidates.

---

This is the final, unified file structure for **Pharma-RL**. It follows a **monorepo** pattern, ensuring that your high-performance Rust logic, PyTorch AI, Solana programs, and MERN stack all work together seamlessly.

## 📂 Complete File Structure

```text
pharma-rl/
├── blockchain/                # Solana / Anchor Program
│   ├── programs/
│   │   └── pharma_log/
│   │       ├── src/lib.rs     # On-chain logging logic
│   │       └── Cargo.toml
│   ├── tests/                 # Anchor integration tests
│   └── Anchor.toml            # Deployment configurations
├── core_engine/               # High-Performance Rust Simulation
│   ├── src/
│   │   ├── lib.rs             # PyO3 Bridge & Chemical logic
│   │   └── mol_logic.rs       # Valency/Atom addition rules
│   ├── Cargo.toml             # PyO3 and chemical crate deps
│   └── pyproject.toml         # For maturin builds
├── ml_service/                # PyTorch RL & GNN (Python)
│   ├── models/
│   │   ├── agent.py           # RL Policy (DQN/PPO)
│   │   └── reward_gnn.py      # Property Prediction GNN
│   ├── utils/
│   │   ├── solana_client.py   # AnchorPy logging bridge
│   │   └── graph_utils.py     # RDKit to PyG conversion
│   ├── train.py               # MAIN TRAINING LOOP
│   └── requirements.txt
├── backend/                   # Node.js API (MERN)
│   ├── src/
│   │   ├── controllers/       # API logic
│   │   ├── models/            # MongoDB Schemas (User/History)
│   │   ├── routes/            # Express endpoints
│   │   └── index.ts           # Server entry point
│   ├── package.json
│   └── .env                   # DB_URI, SOLANA_RPC_URL
└── frontend/                  # Next.js Dashboard
    ├── src/
    │   ├── components/        # 3D Molecule Viewers & UI
    │   ├── hooks/             # useSolanaMolecules.ts
    │   ├── pages/             # Dashboard & Live Feed
    │   └── styles/            # Tailwind CSS
    ├── public/
    │   └── idl.json           # Symlinked from blockchain/target
    └── package.json

```

---

