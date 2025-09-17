# ChatApp

A **real-time chat application** built with a **monorepo architecture** using **Turborepo**.  
The app is divided into three main services:

- **web** → Frontend (Next.js)
- **http** → Backend REST API (Node.js + Express)
- **ws** → WebSocket server for real-time messaging

The project uses **Prisma ORM** with **PostgreSQL** for data persistence and follows a **professional Git branching strategy** to showcase version control skills.

---

## 🛠 Tech Stack

- **Frontend:** Next.js
- **Backend HTTP:** Node.js, Express
- **Backend WebSocket:** ws
- **Database & ORM:** Prisma + PostgreSQL
- **Monorepo Tooling:** Turborepo
- **Authentication:** JWT
- **Real-Time Communication:** WebSocket Rooms, Event Broadcasting

---

## 🚀 Features

- Real-time messaging with **WebSocket**
- Room creation, joining, and management
- JWT-based authentication for security
- Database persistence for messages, rooms, and users
- Monorepo architecture for better scalability and modularity
- Professional Git workflow with **3 branches**:
  - `master` → Production-ready code
  - `staging` → Pre-production testing

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
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your-secret-key
```

4️⃣ Run Prisma migrations

Inside db folder

```bash
pnpm prisma migrate dev
```

5️⃣ Start the apps

In root path

```bash
# Start all apps with Turborepo
pnpm dev
```

### 📊 Prisma ORM & Database

Managed with Prisma
Tables for:
Users, Chat, Rooms

Added createdAt timestamps for tracking messages

### 🚀 Redis Setup

I'm using **Redis** together with **BullMQ** to implement a
job queue for the WebSocket chat application.

![Redis running in Docker](redis-ref/image.png)

This setup lets the WebSocket server push messages into Redis, and a
worker service consumes them asynchronously to store in the database ---
making the chat system more scalable and reliable.

### 📝 License

This project is licensed under @Tejas-pr.