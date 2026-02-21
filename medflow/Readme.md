

# 🏥 MedFlow: Professional Medical E-Commerce Ecosystem

MedFlow is a high-performance, secure monorepo designed for medical commerce. It features a dual-layered architecture separating the **Patient Storefront** (Next.js) from the **Order Management System** (Express).

## 🚀 Key Features

* **🛡️ Rx Guard System:** Intelligent cart logic that identifies Prescription-only (Rx) items and mandates document uploads before payment.
* **📊 Admin Kanban Pipeline:** A professional dashboard for pharmacists to verify prescriptions and track order fulfillment (Pending → Verified → Shipped).
* **💳 Secure Payments:** Integrated with **Lemon Squeezy** for global tax-compliant checkouts.
* **📄 PDF Invoicing:** Automated medical-grade receipt generation via a Node.js microservice.
* **📦 Real-time Inventory:** Stock tracking with visual "Low Stock" alerts and expiry date monitoring.

---

## 🏗️ The Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), Tailwind CSS, Zustand, Lucide Icons |
| **Backend** | Node.js, Express (ES Modules), TypeScript |
| **Database** | PostgreSQL (Supabase) |
| **Storage** | Cloudinary (Prescription images & Product media) |
| **Payments** | Lemon Squeezy |

---

## 📂 Project Structure

```text
medflow/
├── backend/            # Express.js Server (TS)
│   └── src/server.ts   # Core Logic & Webhooks
├── frontend/           # Next.js 15 App
│   ├── app/layout.tsx  # Global Structure
│   ├── app/page.tsx    # Unified Store & Admin UI
│   └── app/globals.css # Tailwind Styles
├── .env                # Global Environment Variables
└── package.json        # Monorepo Workspace Config

```

---

## 🛠️ Installation & Setup (Windows)

### 1. Clone & Install

```cmd
git clone [https://github.com/saadxsalman/medflow.git](https://github.com/saadxsalman/medflow.git)
cd medflow
npm run install-all

```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your_supabase_url"
CLOUDINARY_URL="your_cloudinary_url"
LEMON_SQUEEZY_WEBHOOK_SECRET="your_secret"
PORT=5000
NEXT_PUBLIC_API_URL="http://localhost:5000"

```

### 3. Database Setup

Execute the SQL schema provided in the `/docs` folder (or your Supabase SQL editor) to initialize the `profiles`, `products`, and `orders` tables.

### 4. Run the Project

```cmd
npm run dev

```

* **Frontend:** `http://localhost:3000`
* **Backend:** `http://localhost:5000`

---


