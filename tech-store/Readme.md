
---

# 🚀 TechStore: Full-Stack tRPC E-Commerce

A modern, type-safe e-commerce web application for tech products. Built with **Next.js 14**, **tRPC**, **Supabase**, and **Tailwind CSS**.

## 🌟 Key Features
* **End-to-End Type Safety**: Shared TypeScript types between frontend and backend via tRPC.
* **Admin Dashboard**: Built-in interface to add and delete inventory items.
* **Real-time Database**: Powered by Supabase (PostgreSQL).
* **Modern UI**: Sleek, dark-mode tech aesthetic using Tailwind CSS.
* **Monorepo Structure**: Separate folders for clean Backend/Frontend logic.

---

## 🛠️ Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js (App Router), Tailwind CSS, TanStack Query |
| **API / RPC** | tRPC (Typed Remote Procedure Call) |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | Supabase (PostgreSQL) |
| **Validation** | Zod |

---

## 📂 Project Structure
```text
tech-store/
├── backend/            # Express + tRPC Server
│   ├── src/
│   │   ├── context.ts  # tRPC Context & Supabase Client
│   │   ├── router.ts   # API Definitions (Auth, Products, Admin)
│   │   └── server.ts   # Express Entry Point
├── frontend/           # Next.js Application
│   ├── app/
│   │   ├── layout.tsx  # Providers & Global Nav
│   │   ├── page.tsx    # Storefront & Admin Logic
│   │   └── globals.css # Tailwind Styles
│   └── utils/
│       └── trpc.ts     # tRPC Client Hooks
└── .gitignore          # Root Git Ignore

```

---

## 🚀 Getting Started

### 1. Database Setup (Supabase)

Create a new project in [Supabase](https://supabase.com) and run the following in the SQL Editor:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL
);

```

### 2. Backend Setup

1. `cd backend`
2. Create `.env` file:
```env
SUPABASE_URL=your_project_url
SUPABASE_KEY=your_anon_key
PORT=4000

```


3. Run: `npm install`
4. Run: `npm run dev`

### 3. Frontend Setup

1. `cd frontend`
2. Create `.env` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_KEY=your_anon_key

```


3. Run: `npm install`
4. Run: `npm run dev` (Available at `http://localhost:3000`)

---

## 🔧 Scripts

* **Backend**: `npm run dev` (using ts-node-dev)
* **Frontend**: `npm run dev` (Next.js development)

---

## 📝 License

Created by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman).

```
