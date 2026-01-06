
---

# ⛓️ Node.js Blockchain Ledger

A lightweight, private blockchain implementation built with Node.js to demonstrate the core principles of **data integrity**, **cryptographic hashing**, and **immutability**.



## 🚀 Overview
This project serves as a functional "Proof of Concept" for how a distributed ledger operates. By linking blocks through SHA-256 hashes, the system ensures that any retrospective change to data invalidates the entire chain.

### Key Features
* **Cryptographic Hashing:** Uses `crypto-js` for SHA-256 generation.
* **Linked List Architecture:** Each block contains the hash of the previous block.
* **Integrity Validation:** A built-in logic to verify if the chain has been tampered with.
* **Real-time Dashboard:** A Tailwind CSS frontend to visualize the ledger and its validation status.
* **Environment Security:** Implementation of `.env` and `.gitignore` for best practices.

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express
- **Cryptography:** Crypto-JS (SHA-256)
- **Frontend:** HTML5, Tailwind CSS (via CDN)
- **Environment:** Dotenv

---

## 📂 File Structure
```text
blockchain-ledger/
├── public/
│   └── index.html      # Visualization Dashboard
├── src/
│   ├── block.js        # The Block Class
│   ├── blockchain.js   # Chain Management Logic
│   └── server.js       # Express API Endpoints
├── .env                # Secret configurations
└── .gitignore          # Git exclusion rules

```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
```bash
git clone [https://github.com/saadxsalman/blockchain-ledger.git](https://github.com/saadxsalman/blockchain-ledger.git)
cd blockchain-ledger

```


2. **Install dependencies**
```bash
npm install

```


3. **Configure Environment**
Create a `.env` file in the root directory:
```text
PORT=3000

```


4. **Run the Application**
```bash
node src/server.js

```


Open your browser and navigate to `http://localhost:3000`.

---

## 🧠 How it Works: The Mastery

### 1. Immutability

Every block's hash is calculated based on its contents (index, timestamp, data) **and** the hash of the previous block.

### 2. Validation Logic

The system validates the chain by checking two conditions for every block:

1. Does the block's current hash match its recalculated hash? (Ensures data hasn't changed).
2. Does the block's `previousHash` match the actual hash of the predecessor? (Ensures the link is intact).

> **Note:** If you modify even a single character in Block #1, the hash of Block #1 changes. Since Block #2 depends on that hash, it becomes invalid, causing a domino effect that breaks the entire ledger.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Created with ⚡ by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)
