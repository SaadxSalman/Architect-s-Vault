
---

# Enterprise-Grade Inventory & Fulfillment System (OMS)

A high-performance Order Management System built with a focus on warehouse operations, multi-location stock tracking, and automated fulfillment workflows.

## 🚀 Tech Stack

- **Frontend**: Next.js 14+, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, tRPC (End-to-end typesafety)
- **Database**: Supabase (PostgreSQL)
- **Utilities**: PDFKit (Invoice Generation), Zod (Validation), TanStack Query

## 🏗️ Project Structure

```text
enterprise-oms/
├── apps/
│   ├── frontend/           # Next.js + Tailwind + tRPC Client
│   │   └── src/app/
│   │       ├── layout.tsx  # Root Layout & tRPC Provider
│   │       ├── page.tsx    # Command Center Dashboard
│   │       └── globals.css # Tailwind Styles
│   └── backend/            # Node.js + tRPC Server
│       └── src/
│           ├── index.ts    # Express Server Entry
│           ├── router.ts   # Business Logic & State Machine
│           └── context.ts  # Supabase Client Injection
├── .env                    # Shared Environment Variables
├── .gitignore              # Global Git Ignore
└── package.json            # Root Workspace Manager

```

## 🛠️ Windows Setup Instructions

### 1. Clone & Install

```cmd
git clone [https://github.com/saadxsalman/enterprise-oms.git](https://github.com/saadxsalman/enterprise-oms.git)
cd enterprise-oms
npm install

```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
SUPABASE_URL=your_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=4000
NEXT_PUBLIC_API_URL=http://localhost:4000/trpc

```

### 3. Database Setup

Execute the SQL schema provided in the documentation within your Supabase SQL Editor to initialize `warehouses`, `inventory`, and `orders` tables.

### 4. Run Development Servers

From the root directory, run both frontend and backend simultaneously:

```cmd
npm run dev

```

## 📦 Key Features

### 🔄 Order State Machine

Managed via tRPC mutations. The system enforces a strict workflow:
`Pending` → `Processing` → `Shipped` → `Delivered` → `Requested Return` → `Refunded`.

### 📄 Automated PDF Fulfillment

When an order status is updated to **Shipped**, the backend automatically:

1. Generates a custom Shipping Label using `PDFKit`.
2. Saves the file to `apps/backend/exports/labels/`.
3. Logs the fulfillment event.

### 📍 Multi-Warehouse Logic

Inventory is tracked across unique warehouse IDs. The dashboard provides a "Live Inventory" feed showing exactly which SKU is located in which physical facility (e.g., London-01 vs Manchester-02).

### 🚨 Inventory Alerts

Integrated with Supabase Webhooks. If a `stock_level` drops below the `low_stock_threshold`, the backend triggers a real-time console alert (extensible to Email/SMS services).

---

Developed by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)
