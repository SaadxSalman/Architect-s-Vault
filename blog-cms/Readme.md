

# 📝 Personal Blog CMS

A lightweight, instant-start Content Management System (CMS) built with **Node.js**, **Express**, and **MongoDB**. This project allows you to quickly write, publish, and manage blog posts from a single-page dashboard.

## 🚀 Features
- **Create & Publish**: Write posts with a title and content.
- **Dynamic Feed**: View all posts instantly sorted by the latest date.
- **Delete Functionality**: Manage your content by removing outdated posts.
- **Modern UI**: Styled with **Tailwind CSS** for a clean, responsive look.
- **Data Persistence**: Uses **Mongoose** to store your articles in MongoDB.
- **Secure**: Implements `dotenv` to keep your database credentials safe.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Frontend**: EJS (Embedded JavaScript templates)
- **Styling**: Tailwind CSS

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/saadxsalman/blog-cms.git](https://github.com/saadxsalman/blog-cms.git)
   cd blog-cms

```

2. **Install dependencies:**
```bash
npm install

```


3. **Environment Configuration:**
Create a `.env` file in the root directory and add your MongoDB connection string:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string_here

```


4. **Run the application:**
```bash
node app.js

```


5. **Access the CMS:**
Open your browser and navigate to `http://localhost:3000`

---

## 📂 Project Structure

```text
.
├── views/
│   └── index.ejs       # The single-page UI (Dashboard + Blog Feed)
├── .env                # Secret environment variables (Excluded from Git)
├── .gitignore          # Files to be ignored by Git
├── app.js              # Server logic, Database schema, and Routes
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation

```

## 🛡️ Security

This project uses `.gitignore` to ensure that the `.env` file containing your database keys is never uploaded to GitHub.

---

Developed by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)
