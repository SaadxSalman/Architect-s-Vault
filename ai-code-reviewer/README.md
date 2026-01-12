
---

# 🤖 AI-Powered Code Reviewer Bot

An automated code review assistant built with **Next.js 15**, **Gemini 1.5 Flash**, and **GitHub Webhooks**. This tool listens for Pull Request events and automatically provides technical feedback, security audits, and optimization suggestions directly on your GitHub PRs.

## 🚀 Features

* **Instant AI Feedback**: Uses Google Gemini 1.5 Flash to analyze git diffs in seconds.
* **Secure Webhooks**: Implements HMAC SHA-256 signature verification to ensure requests only come from GitHub.
* **Modern Stack**: Built with TypeScript, Next.js App Router, and Tailwind CSS.
* **Seamless Integration**: Automatically posts comments to your PRs as a technical collaborator.

## 🛠️ Tech Stack

* **Framework**: Next.js (App Router)
* **Language**: TypeScript
* **AI Engine**: Google Generative AI (Gemini API)
* **API Handling**: Octokit (GitHub SDK)
* **Tunneling**: ngrok (for local webhook testing)
* **Styling**: Tailwind CSS

## 📋 Prerequisites

Before running the project, ensure you have:

1. A **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/).
2. A **GitHub Personal Access Token (PAT)** with `repo` and `pull_requests:write` scopes.
3. **ngrok** installed on your machine.

## ⚙️ Setup & Installation

1. **Clone the repository:**
```bash
git clone https://github.com/saadxsalman/ai-code-reviewer.git
cd ai-code-reviewer

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_key
GITHUB_TOKEN=your_github_pat
WEBHOOK_SECRET=your_chosen_secret
NGROK_AUTHTOKEN=your_ngrok_token

```


4. **Start the local server:**
```bash
npm run dev

```


5. **Expose your server:**
```bash
npx ngrok http 3000

```



## 🔗 Webhook Configuration

1. Go to your GitHub Repository **Settings > Webhooks > Add Webhook**.
2. **Payload URL**: `https://your-ngrok-url.ngrok-free.app/api/webhook`
3. **Content Type**: `application/json`
4. **Secret**: Use the same string as your `WEBHOOK_SECRET`.
5. **Events**: Select **Pull Requests**.

## 🛡️ Security Implementation

The bot verifies every incoming request to the `/api/webhook` route using the `x-hub-signature-256` header.

```typescript
const hmac = crypto.createHmac("sha256", process.env.WEBHOOK_SECRET!);
const digest = Buffer.from("sha256=" + hmac.update(rawBody).digest("hex"), "utf8");
// Uses timingSafeEqual to prevent timing attacks
if (!crypto.timingSafeEqual(digest, checksum)) { 
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); 
}

```



