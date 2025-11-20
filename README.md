# 🚀 **AI-Powered Analytics Platform**

### *Interactive Dashboard + Natural Language “Chat With Data” (Vanna AI + Groq) — Docker Based Setup*

---

## 📌 **1. Project Overview**

This is a full-stack production-grade analytics platform that features:

* 📊 **Interactive finance dashboard** (Figma-accurate UI)
* 🤖 **AI-powered analytics** using natural language (NL → SQL → Results)
* 🗄️ **PostgreSQL + Prisma/Drizzle** backend
* 🧱 **Docker-based local environment** for full stack
* 🧠 **Self-hosted Vanna AI + Groq LLM**
* 💡 Enterprise-grade architecture

This project provides real-time insights into invoices, vendor spend, categories, trends, and more.

---

## 🌟 **2. Key Features**

### ✔️ Interactive Analytics Dashboard

* Total Spend (YTD)
* Total Invoices Processed
* Average Invoice Value
* Documents Uploaded
* Invoice Trends (Line Chart)
* Spend by Vendor (Top 10 — Bar)
* Spend by Category (Pie)
* Cash Outflow Forecast

### ✔️ AI-Powered Chat With Data

* Ask questions like:

  * “What is total spend in last 90 days?”
  * “Top 5 vendors by spend”
  * “Show overdue invoices”
* Groq LLM generates SQL
* SQL executed on PostgreSQL
* UI shows SQL + result + chart

### ✔️ Local Development Using Docker

Includes Docker for:

* Frontend
* Backend
* Vanna AI
* PostgreSQL

---

# 🎥 **3. Demo Video**

*(Replace the placeholder with your actual video)*

### 👉 **Option A — Upload Video to Repo**

Place your video inside:

```
/videos/demo.mp4
```

Then embed like:

```md
https://github.com/<your-username>/<repo>/raw/main/videos/demo.mp4
```

GitHub automatically shows the video player.

---

### 👉 **Option B — Upload Video to YouTube or Drive**

Embed like:

```md
[🎥 Watch Demo Video](https://github.com/gaurav-opensource/AI-Powered-Data-Analytics-Platform/screenshots/demo.mp4)
```

---

### **Demo Video Placeholder (replace this):**

```md
[🎥 Demo Video](./videos/demo.mp4)
```

---

# 🗂️ **4. Monorepo Structure**

```
/apps
  /web           → Next.js frontend
  /api           → Node.js backend (Express/Next API)
  /vanna         → Python Vanna AI service

/data
  Analytics_Test_Data.json

/docker
  docker-compose.yml
  Dockerfiles

/prisma or /drizzle
  schema.prisma or schema.ts

/videos
  demo.mp4  ← your demo video goes here
```

---

# 🗄️ **5. Database Schema Overview**

Core tables:

* vendors
* invoices
* line_items
* payments
* categories

Relations:

* Vendor → Invoices (1:N)
* Invoice → Line Items (1:N)
* Invoice → Payments (1:N or 1:1)
* Category → Invoices (N:1)

---

# 🔌 **6. Backend API Endpoints**

| Endpoint          | Method | Description            |
| ----------------- | ------ | ---------------------- |
| `/stats`          | GET    | Dashboard metrics      |
| `/invoice-trends` | GET    | Monthly invoice trends |
| `/vendors/top10`  | GET    | Top 10 vendors         |
| `/category-spend` | GET    | Spend by category      |
| `/cash-outflow`   | GET    | Payment forecast       |
| `/invoices`       | GET    | Invoice list           |
| `/chat-with-data` | POST   | Natural language → SQL |

---

# ⚙️ **7. Environment Variables**

### Frontend

```
NEXT_PUBLIC_API_BASE=/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend

```
DATABASE_URL=postgresql://user:pass@db:5432/analytics
VANNA_API_BASE_URL=http://vanna:8000
```

### Vanna AI

```
DATABASE_URL=postgresql+psycopg://user:pass@db:5432/analytics
GROQ_API_KEY=your_key_here
PORT=8000
```

---

# 🐳 **8. Docker-Based Local Setup**

### Step 1 — Start all services

```bash
docker compose up --build
```

This launches:

* Frontend → [http://localhost:3000](http://localhost:3000)
* Backend → [http://localhost:5000](http://localhost:5000)
* Vanna AI → [http://localhost:8000](http://localhost:8000)
* PostgreSQL → port 5432

---

### Step 2 — Run DB migrations

```bash
docker exec -it api npx prisma migrate deploy
```

---

### Step 3 — Seed JSON data

```bash
docker exec -it api node scripts/seed.js
```

---

# 💬 **9. Chat-With-Data Flow**

1. User enters natural language
2. Frontend sends to backend
3. Backend → Vanna AI
4. Vanna → Groq → SQL
5. SQL executed on DB
6. Results returned
7. UI displays SQL + table + chart

---

# 🧪 **10. Run Without Docker (Optional)**

### Backend

```bash
npm run dev --workspace=api
```

### Frontend

```bash
npm run dev --workspace=web
```

### Vanna AI

```bash
python app.py
```

---

# 🎁 **11. Bonus Features**

* Docker-based full environment
* Clean modular code
* Beautiful UI with shadcn
* Fast analytics

---

# 🙌 **Acknowledgements**

* Vanna AI
* Groq LLM
* Next.js
* Prisma/Drizzle
* TailwindCSS


