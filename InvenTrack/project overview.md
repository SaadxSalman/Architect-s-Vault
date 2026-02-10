
## 1. Project Overview

The goal is to track the lifecycle of products from procurement (buying from suppliers) to sales (selling to customers).

### Key Features

* **Real-time Stock Tracking:** Know exactly what’s on the shelf.
* **Low Stock Alerts:** Automated notifications when items hit a threshold.
* **Transaction History:** A full audit trail of every item moved.
* **Supplier & Customer Management:** Directories for your ecosystem.

---

## 2. Database Schema (The Core)

I recommend a relational database (PostgreSQL/MySQL) to ensure transactions don't fail midway.

### Table: `products`

| Column | Type | Description |
| --- | --- | --- |
| `id` | UUID/INT | Primary Key |
| `sku` | VARCHAR | Stock Keeping Unit (Unique identifier) |
| `name` | VARCHAR | Product name |
| `category_id` | INT | Foreign Key to categories |
| `price` | DECIMAL | Selling price |
| `cost_price` | DECIMAL | Purchase price from supplier |
| `stock_quantity` | INT | Current physical count |
| `reorder_level` | INT | Alert threshold |

### Table: `transactions` (The Audit Trail)

*Never* just update the `stock_quantity` in the products table without a log.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `product_id` | INT | Foreign Key |
| `type` | ENUM | 'IN' (Restock), 'OUT' (Sale), 'ADJUSTMENT' (Damage/Loss) |
| `quantity` | INT | Number of units moved |
| `created_at` | TIMESTAMP | When it happened |

### Table: `suppliers` & `customers`

Basic entities to track who you are dealing with (Names, Emails, Phone, Addresses).

---

## 3. Core Logic & Formulas

You’ll need to implement these calculations in your backend:

* **Total Inventory Value:** 

* **Profit Margin per Item:**


* **Auto-Status Logic:** * If `stock_quantity` == 0  "Out of Stock"
* If `stock_quantity` <= `reorder_level`  "Low Stock"



---

## 4. Suggested Tech Stack

* **Frontend:** React or Next.js (Great for the dashboard and real-time updates).
* **Backend:** Node.js (Express) or Python (FastAPI).
* **Database:** PostgreSQL (for robust relationships).
* **Auth:** Clerk or Auth0 (don't roll your own auth if you want it production-ready).

---

## 5. Development Roadmap (The Sprint)

1. **Phase 1: CRUD Operations.** Create, Read, Update, and Delete products and categories.
2. **Phase 2: The Transaction Engine.** Build the logic that subtracts stock when a "Sale" is recorded and adds it when a "Restock" is recorded.
3. **Phase 3: Search & Filters.** Add the ability to search by SKU or filter by "Low Stock" status.
4. **Phase 4: Dashboard.** Visualize the data (total sales, most popular items, inventory value).
