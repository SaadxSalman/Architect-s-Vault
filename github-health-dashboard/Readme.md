

# 📊 GitHub Portfolio Health Dashboard

A distributed data analytics tool designed to track repository engagement and performance. This project uses **Django** as a robust backend API, **Next.js** for a modern frontend, and **Celery with Redis** to handle background data processing and caching.

## 🚀 Features

* **Asynchronous Processing:** Uses Celery workers to fetch and analyze GitHub API data without blocking the main thread.
* **Data Analysis:** Leverages **Pandas** to calculate repository statistics (stars, forks, averages).
* **Intelligent Caching:** Implements Redis caching to stay within GitHub API rate limits.
* **CLI Integration:** Includes custom Django management commands for manual data synchronization.
* **Responsive UI:** Built with Next.js 14 and Tailwind CSS for a sleek, dark-mode analytics view.

---

## 🛠️ Tech Stack

| Component | Technology |
| --- | --- |
| **Frontend** | Next.js (TypeScript), Tailwind CSS |
| **Backend** | Django, Django REST Framework |
| **Task Queue** | Celery, Redis |
| **Data Science** | Pandas, NumPy |
| **Environment** | Python 3.10+, Node.js 18+ |

---

## 📦 Installation & Setup (Windows)

### 1. Clone the Repository

```bash
git clone https://github.com/saadxsalman/github-health-dashboard.git
cd github-health-dashboard

```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate

```

### 3. Frontend Setup

```bash
cd ../frontend
npm install

```

### 4. Configuration

Create a `.env` file in the root directory:

```env
SECRET_KEY=your-django-secret
DEBUG=True
REDIS_URL=redis://127.0.0.1:6379/0
GITHUB_USERNAME=saadxsalman

```

---

## 🏃 How to Run

You will need **three** terminal windows:

1. **Start Redis:** (Ensure your Redis server/Docker container is running).
2. **Django API:** ```bash
cd backend && venv\Scripts\activate
python manage.py runserver
```

```


3. **Celery Worker:**
```bash
cd backend && venv\Scripts\activate
celery -A core worker --loglevel=info -P eventlet

```


4. **Next.js App:**
```bash
cd frontend
npm run dev

```



Access the dashboard at `http://localhost:3000`.

---

## 🛠️ Custom Commands

To manually refresh the cache via the command line, run:

```bash
python manage.py fetch_data

```

**Developed by [saadxsalman**](https://www.google.com/search?q=https://github.com/saadxsalman)

