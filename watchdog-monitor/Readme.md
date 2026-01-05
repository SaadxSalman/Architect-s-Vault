
---

# 🐕 Watchdog | Node.js Uptime Monitor

**Watchdog** is a lightweight, automated website monitoring tool built with Node.js. It periodically "pings" a list of URLs to ensure they are active. If a site returns a non-200 status code or fails to respond, Watchdog immediately triggers an email alert.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Features

-   **Automated Monitoring:** Uses `node-cron` to schedule health checks every 5 minutes.
-   **Real-time Dashboard:** A clean, dark-mode UI built with **Tailwind CSS** to visualize site status.
-   **Instant Alerts:** Integrated with **Nodemailer** to send email notifications the moment a site goes down.
-   **Secure:** Utilizes `dotenv` for managing sensitive API keys and credentials.

---

## 🛠️ Tech Stack

-   **Backend:** Node.js, Express
-   **Scheduling:** Node-cron
-   **HTTP Client:** Axios
-   **Mailing:** Nodemailer
-   **Frontend:** HTML5, Tailwind CSS (via CDN)

---

## 📋 Prerequisites

-   [Node.js](https://nodejs.org/) installed (v14 or higher)
-   A Gmail account (or SMTP provider) with an **App Password** generated.

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/saadxsalman/watchdog-monitor.git](https://github.com/saadxsalman/watchdog-monitor.git)
   cd watchdog-monitor

```

2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the root directory:
```env
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NOTIFY_EMAIL=recipient@example.com

```


4. **Add your URLs:**
Open `server.js` and update the `websites` array with the URLs you want to monitor.

---

## 🚀 Running the App

**Start the monitoring server:**

```bash
node server.js

```

The dashboard will be available at `http://localhost:3000`. The script will run its first check immediately and then every 5 minutes thereafter.

---

## 📂 Project Structure

```text
.
├── public/
│   └── index.html      # Tailwind CSS Dashboard
├── .env                # Private API Keys (Hidden)
├── .gitignore          # Git exclusion rules
├── server.js           # Core logic & Cron scheduler
└── package.json        # Dependencies & Scripts

```

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)
