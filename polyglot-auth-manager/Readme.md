
---

# 🚀 Polyglot Auth & Resource Manager

A modern, full-stack Task & Team Management system built to master **API Security**, **tRPC**, and **Automated Testing**. This project demonstrates complex relationships between Users and Tasks, protected by multiple authentication strategies.

## 🛠️ Tech Stack

| Component | Technology |
| --- | --- |
| **Frontend** | Next.js 15+ (App Router), Tailwind CSS |
| **Backend** | Node.js, Express, tRPC |
| **Language** | TypeScript (Strict Mode / ES Modules) |
| **Database** | Supabase (PostgreSQL) |
| **Tools** | Postman, Newman CLI, `tsx` |

---

## 📂 Project Structure

```text
polyglot-auth-manager/
├── backend/            # Express + tRPC Server
│   ├── src/
│   │   ├── index.ts    # Server entry & Middleware
│   │   ├── router.ts   # tRPC Router (Logic)
│   │   └── supabase.ts # Database Config
│   └── package.json    # Uses "type": "module" and "tsx"
├── frontend/           # Next.js Client
│   ├── app/
│   │   ├── layout.tsx  # tRPC & Query Providers
│   │   ├── page.tsx    # Dashboard UI
│   │   └── globals.css # Tailwind Styles
│   └── package.json
├── .env                # Global Secrets (Root)
├── .gitignore          # Global Ignores (Root)
└── postman_collection.json # API Test Suite

```

---

## 🚀 Getting Started

### 1. Prerequisites

* Node.js (v18+)
* A Supabase Project ([Create one here](https://supabase.com))
* Postman Installed

### 2. Environment Setup

Create a `.env` file in the **root** folder:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
PORT=4000
NEXT_PUBLIC_API_URL=http://localhost:4000/trpc

```

### 3. Installation & Run

Open two terminal windows:

**Terminal 1 (Backend):**

```cmd
cd backend
npm install
npm run dev

```

**Terminal 2 (Frontend):**

```cmd
cd frontend
npm install
npm run dev

```

---

## 🧪 Postman Mastery Tasks

This project is designed to be tested using the included `postman_collection.json`.

### 🔐 The Auth Challenge

1. **Basic Auth:** Test the `/admin/system-health` endpoint using credentials `admin:password`.
2. **Bearer Token:** The `getMetrics` tRPC procedure requires a Bearer token: `postman-special-key`.
3. **API Keys:** Practice generating dynamic keys in the Pre-request scripts.

### 🤖 Automation (Newman)

Run your entire test suite from the Command Prompt to simulate a CI/CD environment:

```cmd
npm install -g newman
newman run postman_collection.json

```

---

## 📚 Features Implemented

* ✅ **tRPC Integration:** Type-safe API calls between Client and Server.
* ✅ **Supabase Integration:** Real-time data persistence.
* ✅ **ES Modules:** Modern `import/export` syntax with `NodeNext` resolution.
* ✅ **Dynamic Data:** Postman scripts to generate random task names for stress testing.
* ✅ **Responsive UI:** Built with Tailwind CSS for a dark-mode dashboard.

---

## 👤 Author

* **GitHub:** [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)

