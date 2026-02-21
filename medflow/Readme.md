
# 🏥 MedFlow: Professional Medical E-Commerce Ecosystem

MedFlow is a high-performance, secure monorepo designed for medical commerce. It features a dual-layered architecture separating the **Patient Storefront** (Next.js) from the **Order Management System** (Express).

## 🚀 Key Features

* **🛡️ Rx Guard System:** Intelligent cart logic that identifies Prescription-only (Rx) items and mandates document uploads before checkout.
* **📊 Admin Kanban Pipeline:** A professional dashboard for pharmacists to verify prescriptions and track order fulfillment stages (Pending → Verified → Shipped → Delivered).
* **💳 Secure Payments:** Integrated with **Lemon Squeezy** for global tax-compliant checkouts.
* **📄 PDF Invoicing:** Automated medical-grade receipt generation using `jsPDF` via the Express microservice.
* **📦 Real-time Inventory:** Stock tracking with visual "Low Stock" alerts and category-based filtering.

---

## 🏗️ The Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | Next.js 15 (App Router), Tailwind CSS 4.0, Zustand, Lucide Icons |
| **Backend** | Node.js, Express (ESM), TypeScript, **tsx** (Runtime) |
| **Database** | PostgreSQL (Supabase) |
| **Storage** | Cloudinary (Prescription images & Product media) |
| **Payments** | Lemon Squeezy |

---

## 📂 Project Structure

```text
medflow/
├── backend/                # Express.js Server
│   ├── src/server.ts       # API & PDF Logic
│   ├── package.json        # Backend dependencies & tsx config
│   └── tsconfig.json       # NodeNext configuration
├── frontend/               # Next.js 15 App
│   ├── app/                # App Router (Storefront & Admin)
│   ├── package.json        # Next.js dependencies
│   └── components/         # UI Components (Shadcn UI)
├── .env                    # Shared Environment Variables
└── package.json            # Monorepo (Workspaces) Configuration

```

---

## 🛠️ Installation & Setup

### 1. Clone & Install

Run the following from your terminal to install dependencies for the root, frontend, and backend simultaneously:

```bash
git clone https://github.com/saadxsalman/medflow.git
cd medflow
npm run install-all

```

### 2. Environment Variables

Create a `.env` file in the **root** directory:

```env
# Backend Config
PORT=5000
LEMON_SQUEEZY_WEBHOOK_SECRET="your_secret"

# Frontend Config
NEXT_PUBLIC_API_URL="http://localhost:5000"

# Database & Storage
DATABASE_URL="your_supabase_connection_string"
CLOUDINARY_URL="your_cloudinary_url"

```

### 3. Run the Project

MedFlow uses `concurrently` to boot both servers with a single command:

```bash
npm run dev

```

* **Frontend (Next.js):** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)
* **Backend (Express):** [http://localhost:5000](https://www.google.com/search?q=http://localhost:5000)
* **Health Check:** [http://localhost:5000/api/health](https://www.google.com/search?q=http://localhost:5000/api/health)

---

## 🧪 Development Workflow

1. **Backend Runtime:** The backend uses `tsx watch` to provide instant feedback and full ESM support without common `ts-node` pathing errors.
2. **Verified User:** For development purposes, the current session is hardcoded to the lead developer: **saadxsalman**.
3. **Port 5000 Connectivity:** Ensure the backend terminal displays `🚀 MedFlow Backend Operational` before attempting checkout to avoid connection errors.

---

© 2026 MedFlow - Secure Rx Distribution | Lead Developer: **saadxsalman**

---

