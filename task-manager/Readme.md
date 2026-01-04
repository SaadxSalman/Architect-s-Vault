
---

# 📝 Secure Task Manager

A full-stack, private Task Management application built with **Node.js**, **Express**, and **MongoDB**. This project features secure user authentication using **JWT (JSON Web Tokens)** and a sleek, responsive frontend built with **Tailwind CSS**.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

-   **User Authentication**: Secure Register and Login system using `bcryptjs` for password hashing.
-   **Private Workspaces**: Users can only see, create, and delete their own tasks.
-   **JWT Authorization**: Stateless authentication via tokens stored in browser local storage.
-   **Full CRUD**: Create, Read, Update (Toggle Complete), and Delete functionality.
-   **Modern UI**: Clean, responsive interface designed with Tailwind CSS.
-   **CORS Integration**: Backend pre-configured to handle cross-origin requests.

---

## 🛠️ Tech Stack

**Frontend:**
-   HTML5 & Vanilla JavaScript (ES6+)
-   Tailwind CSS (via CDN)

**Backend:**
-   [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
-   [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) (Auth)
-   [bcryptjs](https://github.com/dcodeIO/bcrypt.js) (Security)

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/saadxsalman/task-manager.git](https://github.com/saadxsalman/task-manager.git)
cd task-manager

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Environment Variables

Create a `.env` file in the root directory and add your credentials:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskdb
JWT_SECRET=your_secret_key_saadxsalman

```

### 4. Run the Server

```bash
node server.js

```

### 5. Open the App

Simply open `index.html` in your browser.

---

## 📡 API Endpoints

### Auth Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |

### Task Routes (Protected - Requires Token)

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/tasks` | Fetch tasks for logged-in user |
| `POST` | `/api/tasks` | Create a new task |
| `PATCH` | `/api/tasks/:id` | Toggle completion status |
| `DELETE` | `/api/tasks/:id` | Remove a task |

---

## 📄 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

---

Developed by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)

```

Would you like me to help you generate the Git commands to initialize your repository and push this code to GitHub?

```