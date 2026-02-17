
---

# 🏛️ Architect's Vault: Full-Stack E-Commerce

A modern, high-performance e-commerce platform built with **Django REST Framework** and **Next.js 14**. This project features a secure JWT-authenticated backend and a responsive, interactive frontend with real-time cart management and order tracking.



## 🌟 Key Features
* **Real-time Shopping Cart**: Persistent side-drawer cart with instant calculations.
* **Interactive Product Discovery**: Real-time search and product detail popups (Modals).
* **User Authentication**: Secure Login and Registration using SimpleJWT.
* **Order Management**: Automated order processing and personal purchase history.
* **API Documentation**: Fully documented endpoints via Swagger/Spectacular.

---

## 📂 Project Structure

```text
Architect-s-Vault/
├── backend/                # Django REST Framework
│   ├── api/                # Apps: Products, Orders, Auth
│   ├── core/               # Project Settings & URLs
│   ├── manage.py
│   └── requirements.txt
├── frontend/               # Next.js 14 + Tailwind CSS
│   ├── app/                
│   │   ├── page.tsx        # Main Shop Interface
│   │   └── layout.tsx
│   ├── public/             # Static Assets
│   └── package.json
└── README.md

```

---

## 🛠️ Installation & Setup

### 1. Backend Setup (Django)

Open your terminal in the `backend/` directory:

```bash
# Create and activate virtual environment
python -m venv venv
source venv/Scripts/activate  # Windows: .\venv\Scripts\activate

# Install dependencies
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt drf-spectacular pillow whitenoise gunicorn

# Run database migrations
python manage.py makemigrations
python manage.py migrate

# Create an admin user (for managing products)
python manage.py createsuperuser

# Start the server
python manage.py runserver

```

### 2. Frontend Setup (Next.js)

Open your terminal in the `frontend/` directory:

```bash
# Install dependencies
npm install

# Set up Environment Variables
# Create a .env.local file and add:
# NEXT_PUBLIC_API_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)

# Start the development server
npm run dev

```

---

## 🚀 Deployment Guide

### Backend (Render/Railway)

1. Push your code to GitHub.
2. Connect your repo to **Render** as a "Web Service".
3. Set Build Command: `pip install -r requirements.txt && python manage.py migrate`
4. Set Start Command: `gunicorn core.wsgi`
5. Add `DATABASE_URL` and `SECRET_KEY` to environment variables.

### Frontend (Vercel)

1. Import your GitHub repo to **Vercel**.
2. Add Environment Variable: `NEXT_PUBLIC_API_URL` pointing to your deployed backend.
3. Click **Deploy**.

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | Next.js 14, Tailwind CSS, TypeScript |
| **Backend** | Django, Django REST Framework |
| **Database** | SQLite (Dev) / PostgreSQL (Prod) |
| **Auth** | SimpleJWT (JSON Web Tokens) |
| **Styling** | Framer Motion (Modals), Lucide React (Icons) |

---

## 👤 Author

**Saad Salman**

* GitHub: [@saadxsalman]()

```

---
