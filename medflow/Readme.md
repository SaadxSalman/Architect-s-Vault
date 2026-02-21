
---

# 🏥 MedFlow: Professional Medical E-Commerce Ecosystem

MedFlow is a high-performance, full-stack medical commerce platform built with **Next.js 15**, **Express**, and **Prisma**. It features a dual-interface design: a sleek storefront for patients and a robust Kanban-style fulfillment dashboard for administrators.

## 🚀 Key Features

- **🛒 Dynamic Storefront**: Fast, SEO-optimized product catalog with "Rx" verification logic.
- **📋 Admin Kanban Dashboard**: Professional order management pipeline (Pending → Paid → Shipped).
- **📄 AI-Generated Invoices**: Automatic PDF generation for every order using `jsPDF`.
- **☁️ Cloudinary Integration**: Secure, direct-to-cloud prescription uploads for restricted medications.
- **💳 Lemon Squeezy Ready**: Integrated checkout flow for professional global payments.
- **📧 Automated Notifications**: Real-time email alerts via Nodemailer when orders are dispatched.
- **🛡️ Type-Safe Architecture**: End-to-end TypeScript implementation for both Frontend and Backend.

---

## 🏗️ The Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL (Supabase), Prisma ORM |
| **Storage** | Cloudinary (Prescription images/PDFs) |
| **Payments** | Lemon Squeezy |
| **Email** | Nodemailer |

---

## 📂 Project Structure

```text
medflow/
├── .env                        # Root Environment Variables (Shared)
├── .gitignore                  # Root Git Ignore (Shared)
├── package.json                # Root package.json (Concurrently runner)
├── prisma/                     # Database Layer
│   ├── schema.prisma           # Database Models
│   └── seed.ts                 # Initial Data (Medicine/Equipment)
├── backend/                    # Node.js + Express Backend
│   ├── src/
│   │   └── server.ts           # Main API (Auth, Payments, Invoicing)
│   ├── package.json
│   └── tsconfig.json
└── frontend/                   # Next.js 15 + Tailwind Frontend
    ├── app/
    │   ├── layout.tsx          # Root Layout (Fonts, Scripts)
    │   ├── page.tsx            # Main UI (Storefront & Admin Kanban)
    │   └── globals.css         # Tailwind & Theme Styles
    ├── public/                 # Static Assets (Logos, Icons)
    ├── next.config.ts          # Next.js Configuration
    ├── package.json
    └── tsconfig.json

```

---

## 🛠️ Setup & Installation (Windows)

### 1. Clone the Repository

```cmd
git clone [https://github.com/saadxsalman/medflow.git](https://github.com/saadxsalman/medflow.git)
cd medflow

```

### 2. Install Dependencies

Run this from the root folder to install all packages for both folders:

```cmd
npm run install-all

```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# ==========================================================
# 🔌 DATABASE CONFIGURATION (Prisma & Supabase)
# ==========================================================
# Get this from Supabase > Project Settings > Database
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres"

# ==========================================================
# ☁️ CLOUDINARY CONFIGURATION (Prescription Storage)
# ==========================================================
# Get these from your Cloudinary Dashboard
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
# The preset name you created in Cloudinary Settings > Upload
NEXT_PUBLIC_CLOUDINARY_PRESET="medflow_unsigned"

# ==========================================================
# 🍋 LEMON SQUEEZY CONFIGURATION (Payments)
# ==========================================================
# Get these from Lemon Squeezy > Settings > API
LEMON_SQUEEZY_API_KEY="your_ls_api_key"
LEMON_SQUEEZY_STORE_ID="your_store_id"
# The Variant ID for your medicine product
LEMON_SQUEEZY_VARIANT_ID="your_variant_id"

# ==========================================================
# 📧 EMAIL CONFIGURATION (Nodemailer)
# ==========================================================
# Use Gmail (App Password) or Resend/SendGrid
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=465
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-specific-password"

# ==========================================================
# 🌐 APP URLS
# ==========================================================
PORT=5000
NEXT_PUBLIC_API_URL="http://localhost:5000"
NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000"

```

### 4. Database Setup & Seeding

Initialize your database and populate it with professional medical products:

```cmd
npx prisma migrate dev --name init
npx prisma db seed

```

### 5. Run the Project

Launch both the Frontend and Backend with a single command:

```cmd
npm run dev

```

---

## 🩺 Workflow Logic

1. **Verification**: If a product is marked `isPrescriptionRequired`, the checkout is locked until a file is uploaded to **Cloudinary**.
2. **Payment**: Orders transition to `PAID` via Lemon Squeezy webhooks.
3. **Fulfillment**: Admins drag orders to `SHIPPED`, triggering an automated **Nodemailer** dispatch email.
4. **Invoicing**: Patients can download a generated **PDF receipt** directly from their dashboard.

---

Created with ❤️ by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)

```

---
