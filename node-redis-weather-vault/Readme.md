
---

# ⚡ RedisWeather-Vault

A professional Node.js performance-optimization project demonstrating the **Cache-Aside Pattern**. This application serves as a high-speed middle layer between users and the OpenWeatherMap API, using **Redis** to eliminate redundant network requests and provide near-instant response times.



![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🎯 Purpose & Significance
In production environments, external API calls are expensive and slow. This project solves that by:
- **Reducing Latency:** Shifting response times from ~800ms (API) to **<10ms** (Redis).
- **Rate Limit Protection:** Minimizing hits to the OpenWeatherMap API quota.
- **Scalability:** Demonstrating how to handle high-traffic bursts by serving data from memory.

## 🧠 Architectural Flow
1. **Request:** Client requests weather for a city.
2. **Check:** App queries Redis for the key `weather:{city}`.
3. **Branching Logic:**
   - **Cache HIT:** Data is returned immediately from Redis.
   - **Cache MISS:** App fetches fresh data from the external API, stores it in Redis with a **1-hour TTL (Time-To-Live)**, and then returns it.



## 🛠️ Tech Stack
- **Backend:** Node.js & Express
- **In-Memory Store:** Redis
- **Templating:** EJS (Embedded JavaScript)
- **Styling:** Tailwind CSS (via CDN)
- **Security:** Dotenv (Environment variable management)

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/saadxsalman/node-redis-weather-vault.git](https://github.com/saadxsalman/node-redis-weather-vault.git)
   cd node-redis-weather-vault

```

2. **Setup Environment Variables:**
Create a `.env` file in the root:
```env
PORT=3000
REDIS_URL=redis://127.0.0.1:6379
WEATHER_API_KEY=your_openweathermap_api_key

```


3. **Install Dependencies:**
```bash
npm install

```


4. **Start Redis Server:**
Ensure your local Redis server is running:
```bash
redis-server

```


5. **Run in Development Mode:**
```bash
npx nodemon app.js

```



## 📊 Performance Comparison

| Metric | API Fetch (Cache Miss) | Redis Read (Cache Hit) |
| --- | --- | --- |
| **Response Time** | 500ms - 1200ms | **2ms - 15ms** |
| **Network Load** | High (External) | Zero (Internal) |
| **Reliability** | Depends on API Uptime | Guaranteed by Local Cache |

## 📁 Project Structure

```text
node-redis-weather-vault/
├── views/
│   └── index.ejs       # UI Template with Tailwind
├── .env                # Private API Keys (Excluded via .gitignore)
├── .gitignore          # Prevents sensitive data leaks
├── app.js              # Core logic & Redis integration
└── package.json        # Project metadata & dependencies

```

---

Developed by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman) as part of the Node.js Master Playground.

