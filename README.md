# ChatApp

A **real-time chat application** built with a **monorepo architecture** using **Turborepo**.  
The app is divided into three main services:

- **web** → Frontend (Next.js)
- **http** → Backend REST API (Node.js + Express)
- **ws** → WebSocket server for real-time messaging

The project uses **Prisma ORM** with **PostgreSQL** for data persistence and follows a **professional Git branching strategy** to showcase version control skills.

---

## 🛠 Tech Stack

- **Frontend:** Next.js (with Server Actions)
- **Job Queue & Messaging:** BullMQ + Redis
- **Backend HTTP:** Next.js API Routes (migrated from Express)
- **Backend WebSocket:** ws (custom WebSocket server)
- **Database & ORM:** Prisma + PostgreSQL
- **Authentication:** Better Auth (Google & GitHub OAuth providers)
- **Real-Time Communication:** WebSocket Rooms + Event Broadcasting
- **Monorepo Tooling:** Turborepo
- **Infrastructure:** Docker (for Redis and other services)

---

## 🚀 Features

- Real-time messaging with **WebSocket**
- Room creation, joining, and management
- Secure authentication with **Better Auth** (Google & GitHub login)
- **Job queueing** with BullMQ (Redis) for scalable message handling
- Database persistence for messages, rooms, and users
- Monorepo architecture for better scalability and modularity
- Professional Git workflow with **3 branches**:
  - `master` → Production-ready code
  - `staging` → Pre-production testing
  - `dev` → Active development

---

## 🌱 Git Workflow

This project follows a **multi-branch Git workflow** to ensure code quality and maintainability.

```bash
# Work on a feature
git checkout -b <new-branch>

# Merge dev into staging for testing
git checkout staging
git merge <new-branch>

# Merge staging into main for production
git checkout master
git merge staging
```

Branches: 1. main — Production-ready code, 2. staging — Pre-production testing 3. dev — Active development

## 📦 Installation & Setup

1️⃣ Clone the repository

```bash
git clone https://github.com/Tejas-pr/chatapp.git
cd chatapp
```

2️⃣ Install dependencies

```bash
pnpm install
```

3️⃣ Set up environment variables

Create a .env file in the root:

```bash
JWT_SECRET=""
NODE_ENV=""
# OAUTH
NEXT_PUBLIC_API_URL=""
BETTER_AUTH_SECRET=""
BETTER_AUTH_URL=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
# backend-common
JWT_SECRET=""
CORS_ORIGIN_FE=""
PORT_BE=""
# ws-backend - worker.ts
REDIS_HOST=""
REDIS_PORT=""
# prisma-DB
DATABASE_URL=""
```

4️⃣ Run Prisma migrations

Inside db folder

```bash
pnpm prisma migrate dev
npx prisma generate
```

5️⃣ Start the apps

In root path

```bash
# Start all apps with Turborepo
pnpm install
pnpm run build
pnpm run dev
```

### 📊 Prisma ORM & Database

Managed with Prisma
Tables for:
Users, Chat, Rooms

Added createdAt timestamps for tracking messages

# 🚀 Migration Updates

## 🔧 Infrastructure

- Integrated **Redis** with **BullMQ** to power the job queue for the WebSocket chat application.
- This setup allows the WebSocket server to push messages into Redis, while a dedicated worker service consumes them asynchronously to store in the database.
- ✅ Result: More **scalable** and **reliable** chat system.

![Redis running in Docker](redis-ref/image.png)

---

## 🔐 Authentication

- Migrated from **basic auth** to modern authentication providers.
- Added **Google** and **GitHub** login for a smoother and more secure user experience.

---

## 🌐 Backend Architecture

- Transitioned from a traditional **HTTP backend** to **Next.js Server Actions**.
- This simplifies data fetching, reduces API overhead, and improves developer experience.

---

### 📝 License

This project is licensed under @Tejas-pr.