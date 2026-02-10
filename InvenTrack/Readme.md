
---

# 📦 InvenTrack

**InvenTrack** is a high-performance, full-stack inventory management solution designed to provide real-time visibility into stock levels, automated restock workflows, and deep financial insights.

Built with scalability in mind, InvenTrack eliminates manual tracking errors through a robust transaction-based auditing system.

---

## 🚀 Features

- **Real-time Inventory Tracking:** Instant updates on stock levels across various categories.
- **Audit-Ready Logs:** Every stock movement (In/Out/Adjust) is logged with a timestamp and reason.
- **Low-Stock Intelligence:** Automated alerts when items fall below their defined `reorder_level`.
- **Financial Analytics:** Live calculation of inventory value and profit margins.
- **Supplier Management:** Centralized directory for procurement and vendor tracking.
- **Responsive Dashboard:** A clean, mobile-friendly UI for warehouse or office use.

---

## 🛠️ Tech Stack

- **Frontend:** React.js / Next.js (Tailwind CSS for styling)
- **Backend:** Node.js (Express)
- **Database:** PostgreSQL (Relational data integrity)
- **Authentication:** JWT-based secure login
- **Documentation:** Swagger / OpenApi

---

## 📊 Database Architecture

The system relies on a relational schema to ensure data consistency.

### Core Tables:
* **Products:** Stores SKU, pricing, and current stock levels.
* **Transactions:** The "Source of Truth" for all stock movements.
* **Categories:** For logical grouping (e.g., Electronics, Stationery).
* **Entities:** Suppliers (Procurement) and Customers (Sales).

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/saadxsalman/InvenTrack.git](https://github.com/saadxsalman/InvenTrack.git)
   cd InvenTrack

```

2. **Setup Environment Variables**
Create a `.env` file in the root directory:
```env
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/inventrack
JWT_SECRET=your_super_secret_key

```


3. **Install Dependencies**
```bash
npm install

```


4. **Run Database Migrations**
```bash
npm run migrate

```


5. **Launch the Application**
```bash
npm run dev

```



---

## 📈 Key Formulas Used

InvenTrack handles the math for you:

* **Stock On Hand:** 

* **Gross Profit Margin:** 

---

Developed with ❤️ by [**saadxsalman**](https://www.google.com/search?q=https://github.com/saadxsalman)

---

# Project Structure

```text
InvenTrack/
├── backend/                   # Node.js (Express + TypeScript)
│   ├── src/
│   │   ├── server.js          # Main API logic & Express routes
│   │   └── supabase.js        # Supabase client initialization
│   ├── package.json           # Backend dependencies & ES Module config
│   └── tsconfig.json          # TypeScript compiler settings
├── frontend/                  # Next.js (App Router + Tailwind)
│   ├── app/
│   │   ├── layout.tsx         # Root layout, Navbar, and Font setup
│   │   ├── page.tsx           # Dashboard logic, Search, & UI components
│   │   └── globals.css        # Tailwind directives & custom styles
│   ├── public/                # Static assets (logos, icons)
│   ├── next.config.ts         # Next.js configuration (Env handling)
│   ├── tailwind.config.ts     # Tailwind CSS theme configuration
│   ├── postcss.config.js      # CSS processing
│   └── package.json           # Frontend dependencies
├── .env                       # SHARED environment variables (Critical!)
├── .gitignore                 # SHARED git exclusion rules
└── README.md                  # Documentation (optional)

```