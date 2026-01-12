
---

# 🚀 High-Speed Cryptography Tool (Node.js + Rust)

A performance-focused web application that benchmarks **Pure JavaScript** against **Rust (N-API)** for heavy AES-256-GCM encryption tasks. This project demonstrates the power of **Foreign Function Interface (FFI)** in Node.js applications.

## 🏗️ Architecture

* **Frontend**: Next.js 16 (App Router) + Tailwind CSS
* **Backend**: Node.js Server Actions
* **Native Core**: Rust via `napi-rs`
* **Crypto Engines**:
* **JS**: `crypto-js` (Pure JS implementation)
* **Rust**: `aes-gcm` (Hardware-accelerated via AES-NI)



## ⚡ Performance Insights

As seen in our benchmarks for **saadxsalman/crypto-tool**:

* **Small Payloads**: JavaScript often wins due to the zero-latency of local browser execution.
* **Large Payloads (1MB+)**: Rust significantly outperforms JavaScript by utilizing low-level memory management and hardware-level CPU instructions, even when accounting for the network round-trip.

## 🛠️ Installation & Setup

### 1. Prerequisites

* **Node.js** (v18+)
* **Rust** (Install via [rustup.rs](https://rustup.rs/))
* **napi-rs CLI**: `npm install -g @napi-rs/cli`

### 2. Build the Native Module

Before running the web app, you must compile the Rust code into a Node.js binary:

```bash
cd native
npm install
npm run build
cd ..

```

### 3. Run the Development Server

Next.js 16 uses Turbopack by default. To support native `.node` loaders, run using the Webpack flag:

```bash
npm install
npx next dev --webpack

```

## 🧪 Testing the Benchmark

To see the "Rust Flip" (where Rust becomes faster than JS):

1. Open `http://localhost:3000`.
2. Paste approximately **2MB of text** into the input area.
3. Click **Run 100x Benchmark**.
4. Observe the terminal for server-side Rust logs and the browser for JS results.

## 📂 Project Structure

* `/native` - The Rust sub-project containing `lib.rs` and the NAPI configuration.
* `/src/app/page.tsx` - The UI and Client-side JS benchmark logic.
* `/src/app/actions.ts` - The Server Action that bridges the web app to the Rust binary.
* `next.config.ts` - Configuration for `node-loader` and Webpack.

---

### ⚠️ Note for Windows Users

If you encounter a `Failed to copy artifact` error during `npm run build`, it means the `.node` file is locked by a running Node.js process. Run `taskkill /F /IM node.exe` and try again.

---
