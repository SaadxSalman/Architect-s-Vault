
---

# 🤖 Discord x GitHub Event Bot & Dashboard

A real-time automation service built with **Node.js** that bridges GitHub activity with Discord. This project features a live web dashboard styled with **Tailwind CSS** and a functional Discord bot that allows you to manage GitHub issues directly from your chat platform.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Discord.js](https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

## 🚀 Features

-   **Live Dashboard**: A sleek, dark-mode web interface to monitor GitHub events in real-time.
-   **Discord Notifications**: Instant alerts for `Push` events and `Issue` openings.
-   **Remote Issue Management**: Close GitHub issues directly from Discord using interactive buttons.
-   **Event-Driven Architecture**: Uses Webhooks and Socket.io for zero-latency updates.

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/saadxsalman/discord-github-bot.git](https://github.com/saadxsalman/discord-github-bot.git)
cd discord-github-bot

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DISCORD_TOKEN=your_bot_token
DISCORD_CHANNEL_ID=your_channel_id
GITHUB_TOKEN=your_personal_access_token
PORT=3000

```

### 4. Expose Localhost

Use **ngrok** to create a public tunnel for GitHub Webhooks:

```bash
npx ngrok http 3000

```

### 5. Setup GitHub Webhook

* Go to Repository **Settings** > **Webhooks**.
* **Payload URL**: `https://your-ngrok-url.ngrok-free.app/github-webhook`
* **Content type**: `application/json`
* **Events**: Select `Pushes` and `Issues`.

## 🖥️ Usage

1. Start the server:
```bash
node index.js

```


2. Open the dashboard at `http://localhost:3000`.
3. Interact with GitHub and watch the logs flow into Discord and your browser simultaneously.

## 🏗️ Architecture

1. **GitHub** triggers a Webhook on specific events.
2. **Express Server** validates the payload.
3. **Socket.io** broadcasts the event to the **Tailwind Dashboard**.
4. **Discord.js** sends an interactive embed to the designated channel.
5. **GitHub API** is called when a Discord button is clicked to resolve issues.

---

Developed with ❤️ by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)
