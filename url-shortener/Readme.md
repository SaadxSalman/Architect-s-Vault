
---

```markdown
# 🔗 Shorty - Modern URL Shortener

A lightweight, fast, and persistent URL shortener built with **Node.js**, **Express**, and **MongoDB**. This project features a sleek, responsive UI built with **Tailwind CSS** and generates unique identifiers using **NanoID**.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## ✨ Features

- **Instant Shortening:** Convert long, messy URLs into clean, 7-character slugs.
- **Analytics:** Track how many times a link has been clicked.
- **Persistence:** All links are stored in MongoDB.
- **Glassmorphism UI:** A modern, dark-themed interface built with Tailwind CSS.
- **Automatic Redirection:** High-performance redirection logic.

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI.

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone [https://github.com/saadxsalman/url-shortener.git](https://github.com/saadxsalman/url-shortener.git)
cd url-shortener
npm install

```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/urlShortener
PORT=3000

```

### 4. Run the Application

```bash
# Start the server
node index.js

```

The app will be running at `http://localhost:3000`.

## 🛠️ API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/shorten` | Takes a `fullUrl` and returns a shortened URL object. |
| `GET` | `/:shortUrl` | Redirects to the original long URL and increments click count. |

## 🏗️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **ID Generation:** NanoID
* **Frontend:** HTML5, JavaScript (Fetch API), Tailwind CSS

---

Developed by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)

```

---

### 💡 Pro-Tip for your GitHub
To make this look even better on your profile:
1. **Add a Screenshot:** Take a screenshot of the Tailwind UI and save it as `screenshot.png` in your repo, then add `![Preview](./screenshot.png)` to the top of the README.
2. **License:** You might want to add a `LICENSE` file (like MIT) to let others know they can use your code.

Would you like me to help you write the `git` commands to push this entire project to a new GitHub repository?

```