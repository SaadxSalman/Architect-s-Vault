
---

# 🚀 AI-Driven Dynamic Price Optimizer

An "Instant" eCommerce ecosystem featuring a **FastAPI** backend that utilizes a **Linear Regression** model to optimize product pricing in real-time, paired with a high-end **Next.js 14** glassmorphic storefront.

![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)

## 🧠 The Concept
Unlike traditional stores with static pricing, this project implements **Yield Management AI**. The system treats the marketplace as a living entity where prices fluctuate based on:
- **Inventory Scarcity:** Lower stock automatically triggers higher demand-based pricing.
- **Temporal Trends:** Mocked time-of-day data influences consumer purchasing power.
- **Competitor Parity:** Real-time adjustment based on simulated competitor price drops.

## 🛠️ Tech Stack
- **Frontend:** Next.js (App Router), Tailwind CSS, Lucide React (Icons), Framer Motion.
- **Backend:** FastAPI (Python), Uvicorn.
- **Machine Learning:** Scikit-Learn (Linear Regression), NumPy, Pandas.
- **Data Persistence:** JSON-based "Instant" Flat-file DB.

## 📂 Project Structure
```text
dynamic-store/
├── backend/            # FastAPI & ML Model
│   ├── main.py         # Core API & Background Training logic
│   ├── products.json   # Mock Massive Product Database
│   ├── .env            # API configurations
│   └── venv/           # Python Virtual Environment
└── frontend/           # Next.js UI
    ├── app/
    │   ├── layout.tsx  # Global wrapper & Mesh Gradient
    │   ├── page.tsx    # Interactive Glassmorphic Storefront
    │   └── globals.css # Custom animations & Tailwind base
    └── .env            # Public API URL

```

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi uvicorn pandas scikit-learn python-dotenv
python main.py

```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm install lucide-react framer-motion
npm run dev

```

## ⚙️ How the ML Works

The project uses **FastAPI BackgroundTasks** to ensure zero latency for the end user.

1. **Request:** User hits `/products`.
2. **Response:** Current optimized prices are served instantly.
3. **Background:** A task is spawned to:
* Extract current stock and time features.
* Run `model.predict()` using a pre-trained Linear Regression weight set.
* Update `products.json` with new "Optimal Prices."
* Retrain the model parameters if new data points are simulated.



## 🎨 UI Features

* **Glassmorphism:** Modern translucent cards with backdrop-blur effects.
* **Live Indicators:** Pulsing price animations when the AI updates the cost.
* **Inventory Progress:** Visual scarcity bars that change color based on stock levels.
* **Responsive Mesh Background:** A high-end dark-mode aesthetic with interactive grid overlays.

---

Developed by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)

```