

---

# 🛒 Microservices E-Commerce API (TypeScript)

This project is a high-performance, microservices-based backend for an E-commerce platform. It demonstrates **Inter-service communication**, **API Gateway routing**, and **Cross-Origin Resource Sharing (CORS)** in a modern Node.js environment.

## 🏗️ Architecture Overview

Unlike a monolithic application, this project is split into four distinct servers:

1. **API Gateway (:3000):** The single entry point for the frontend. It routes requests to the appropriate microservice.
2. **User Service (:3001):** Handles authentication and JWT generation.
3. **Product Service (:3002):** Manages the product catalog and inventory data.
4. **Order Service (:3003):** Processes orders and communicates with the Product Service to verify inventory (Inter-service communication).

## 🛠️ Tech Stack

* **Runtime:** Node.js (v18+)
* **Language:** TypeScript (ES Modules)
* **Framework:** Express.js
* **Communication:** Axios (HTTP-based REST)
* **Security:** JSON Web Tokens (JWT)
* **Frontend:** HTML5 / Tailwind CSS (via CDN)

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have Node.js and npm installed. This project uses ES Modules, so `"type": "module"` is set in the `package.json`.

### 2. Installation

Clone the repository and install dependencies in the root folder:

```bash
npm install

```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
PORT_USER=3001
PORT_PRODUCT=3002
PORT_ORDER=3003
PORT_GATEWAY=3000
JWT_SECRET=your_secret_key_here

```

### 4. Running the Services

To run the services, open four separate terminals and run:

* **User Service:** `npx ts-node-esm user-service/index.ts`
* **Product Service:** `npx ts-node-esm product-service/index.ts`
* **Order Service:** `npx ts-node-esm order-service/index.ts`
* **Gateway:** `npx ts-node-esm gateway/index.ts`

> **Tip:** You can use `npm install -g concurrently` and run `concurrently "npm run user" "npm run product" ...` to start all at once.

## 🧪 Testing the Flow

1. Open `index.html` in your browser.
2. Click **"Login as Saad"**. This hits the Gateway → User Service.
3. Observe the product list loading. This hits the Gateway → Product Service.
4. (Optional) Check the terminal logs to see the inter-service communication when an order is simulated.

## 📁 Project Structure

```text
.
├── gateway/            # Entry point & routing
├── user-service/       # Auth & Users
├── product-service/    # Catalog & Inventory
├── order-service/      # Sales & Logic
├── index.html          # Frontend Demo
├── .env                # Secrets
├── tsconfig.json       # TypeScript Config
└── package.json        # Dependencies & Scripts

```
