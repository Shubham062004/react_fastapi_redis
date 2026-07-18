# FastAPI + React Boilerplate

A modern full-stack web application starter with a FastAPI backend and a Vite-powered React frontend.

## Project Structure

```text
react_fastapi_redis/
├── backend/
│   ├── app/
│   ├── .env
│   ├── .env.example
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Quick Start

### 1. Backend Setup (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# Linux/macOS:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload --port 8000
```
Backend will be live at `http://localhost:8000` (Docs at `http://localhost:8000/docs`).

### 2. Frontend Setup (React + Vite)

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```
Frontend will be live at `http://localhost:5173`.

## Environment Variables

- **Backend** (`backend/.env`):
  - `PORT`: Port backend runs on (default: `8000`)
  - `CORS_ORIGINS`: Allowed CORS origin (default: `http://localhost:5173`)
  - `REDIS_HOST`: Redis server host (default: `localhost`)
  - `REDIS_PORT`: Redis server port (default: `6379`)

- **Frontend** (`frontend/.env`):
  - `VITE_API_BASE_URL`: FastAPI server URL (default: `http://localhost:8000`)