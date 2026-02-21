
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
├── backend/            # Express Server
│   ├── src/
│   │   └── server.ts   # Main API & Business Logic
│   └── package.json
├── frontend/           # Next.js Application
│   ├── app/
│   │   ├── layout.tsx  # Root Layout & Providers
│   │   ├── page.tsx    # Storefront & Admin Logic
│   │   └── globals.css # Styling
│   └── package.json
├── prisma/             # Database Schema & Seeding
│   ├── schema.prisma
│   └── seed.ts
├── .env                # Shared Environment Variables
└── .gitignore          # Project-wide ignore rules

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
# Database
DATABASE_URL="your_postgresql_url"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Lemon Squeezy
LEMON_SQUEEZY_API_KEY="your_api_key"
LEMON_SQUEEZY_STORE_ID="your_store_id"

# Email (SMTP)
EMAIL_HOST="smtp.yourprovider.com"
EMAIL_USER="your_email@domain.com"
EMAIL_PASS="your_app_password"

# URLs
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
