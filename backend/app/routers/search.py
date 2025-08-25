from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import SessionLocal
from ..schemas import SearchRequest
from .. import models
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
import os

router = APIRouter(tags=["search"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")
SECRET_KEY = os.getenv("SECRET_KEY", "change-this-secret")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return {"username": payload.get("sub"), "user_id": payload.get("user_id")}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def mock_duck_duck_go_search(query: str):
    # Simple mock for beginners
    return f"This is a mock summary for '{query}'. Replace with a real MCP server if available."

@router.post("/search")
def search(req: SearchRequest, db: Session = Depends(get_db), user=Depends(get_current_user)):
    summary = mock_duck_duck_go_search(req.query)
    entry = models.SearchHistory(user_id=user["user_id"], query=req.query, summary=summary)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return {"id": entry.id, "query": entry.query, "summary": entry.summary, "timestamp": entry.timestamp.isoformat()}

@router.post("/image")
def image(req: SearchRequest, db: Session = Depends(get_db), user=Depends(get_current_user)):
    # Use placeholder image generation
    prompt = req.query
    image_url = f"https://placehold.co/600x400?text={prompt.replace(' ','+')}"
    entry = models.ImageHistory(user_id=user["user_id"], prompt=prompt, image_url=image_url)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return {"id": entry.id, "prompt": entry.prompt, "image_url": entry.image_url, "timestamp": entry.timestamp.isoformat()}
