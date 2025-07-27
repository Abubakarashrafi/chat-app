# 📡 Real-Time Chat App (WebSocket + Redis)

A real-time chat application backend powered by **WebSockets**, **Redis Pub/Sub**, and **Node.js**.  
Supports both **1-on-1** and **group** messaging, designed for real-time communication at scale.


---

## 🚀 Features

- Real-time 1-on-1 messaging
- Group chat support
- Redis Pub/Sub channel communication
- Auto-broadcast for user and group updates
- Docker-ready backend for production deployment

---

## 🧱 Tech Stack

- **Backend:** Node.js, WebSocket (`ws`)
- **Pub/Sub:** Redis
- **Containerization:** Docker, Docker Compose

---

## 🛠️ Getting Started

### ✅ Prerequisites
  
- Node.js installed (for local dev)
- Docker & Docker Compose installed

---

### ⚙️ Backend Setup with Docker

1. **Clone the Repository**

```bash
git clone https://github.com/Abubakarashrafi/chat-app.git
cd chat-app
```
2. **Start Redis and Backend Server**
   ```bash
   docker-compose up --build
   ```
   Redis will run on localhost:6379
   WebSocket backend will be available at ws://localhost:3000




