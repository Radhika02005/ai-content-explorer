# AI-Powered Content & Image Explorer (Beginner)

Simple beginner-friendly full-stack assignment:
- FastAPI backend (SQLite)
- React frontend (Create React App)
- JWT auth (access token), mock search & image generation
- Dashboard to view and delete saved items

## Quick start

### Backend
```bash
cd backend
python -m venv venv
# mac/linux
source venv/bin/activate
# windows
# venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# Backend runs at http://localhost:8000
```

### Frontend
```bash
cd frontend
npm install
npm start
# Frontend runs at http://localhost:3000
```

## Notes
- This is intentionally simple so beginners can run it locally without Docker.
- Replace mock MCP endpoints later if you want real web search / image APIs.
