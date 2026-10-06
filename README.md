# BootForge Backend Academy ⚔️

An interactive, gamified backend engineering learning platform inspired by **Boot.dev**. Learn Python, Go, Data Structures & Algorithms, SQL, Linux/Bash, and Distributed System Design through hands-on code execution, interactive simulators, and multi-phase Boss Raids.

![BootForge Preview](src/assets/images/boot_hero_mascot_1791316721955.jpg)

---

## 🚀 Key Features

### 1. 📚 Interactive Curriculum & In-Browser Code Runner
- **Python Backend Foundations**: Variables, payload parsing, OOP rate limiters, custom exception middleware.
- **Go (Golang) Systems Programming**: Structs, pointer receivers, goroutines, buffered channels, sync primitives.
- **Data Structures & Algorithms**: O(1) LRU Caches, Binary Trees, Priority Queues, Hash Tables.
- **SQL & Relational Databases**: Relational joins, GROUP BY aggregations, B-Tree indexes, query optimization.
- **Distributed Systems Architecture**: High availability, L7 reverse proxies, caching strategies.
- **Linux Shell & Git**: Unix pipelines (`|`), `grep`, `awk`, process management, Docker CLI.
- **Real-Time Test Runner**: Sub-millisecond in-browser test assertions with expected vs actual diffing.

### 2. 🐉 Multi-Phase Boss Raids
- **The Monolith Dragon**: Decouple monolithic spaghetti code, add connection pools, and build circuit breakers.
- **The Deadlock Demon**: Solve concurrent mutex deadlocks and build non-blocking channel selectors.

### 3. 🛠️ Interactive Tooling & Simulators
- **SQL Studio**: Execute queries on live relational tables (`users`, `orders`, `servers`) with schema inspection.
- **Linux Terminal Sandbox**: Simulated Bash CLI with pipelines, standard streams, and container inspection.
- **Distributed Architecture Canvas**: Drag-and-drop system topology editor with live RPS traffic generator and chaos engineering fault injection.

### 4. 🎮 Gamification
- **Character Progression**: Leveling, XP thresholds, and stats radar (Concurrency, Algorithms, Systems, Databases, Clean Code).
- **Skill Tree**: Unlockable talent branches across language and system domains.
- **Inventory & Loot**: Equip mechanical keyboards, dark wizard robes, and companion familiars.
- **Daily Quests & Streaks**: Daily backend challenges and streak counter.

### 5. 🧙 Archmage AI Mentor
- Powered by Gemini API to provide hints without spoiling answers, diagnose compiler/assertion failures, and forge dynamic practice quests.

---

## 📦 Quick Start (Local Development)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/bootforge.git
   cd bootforge
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables** (Optional, for Gemini AI features):
   ```bash
   cp .env.example .env
   # Add your GEMINI_API_KEY in .env
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Hosting on GitHub & Deployment Options

### Option A: 1-Click GitHub Pages (Static Hosting)
This repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of BootForge Backend Academy"
   git branch -M main
   git remote add origin https://github.com/your-username/bootforge.git
   git push -u origin main
   ```
2. In your GitHub repository settings:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Push any commit to `main`, and GitHub Actions will build and deploy your applet automatically!

### Option B: Full-Stack Docker / Cloud Hosting (Railway, Render, Fly.io, Cloud Run)
Use the included `Dockerfile`:

```bash
docker build -t bootforge .
docker run -p 3000:3000 -e GEMINI_API_KEY="your-api-key" bootforge
```

---

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React, Motion, Canvas-Confetti
- **Backend / AI**: Node.js, Express, tsx, Google GenAI SDK (`@google/genai`)
- **Build Tool**: Vite 8

---

## 📄 License
Apache-2.0
