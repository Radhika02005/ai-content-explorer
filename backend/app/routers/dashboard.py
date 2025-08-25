from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import models
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
import os

router = APIRouter(tags=["dashboard"])
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

@router.get("/dashboard")
def get_dashboard(db: Session = Depends(get_db), user = Depends(get_current_user)):
    uid = user["user_id"]
    searches = db.query(models.SearchHistory).filter(models.SearchHistory.user_id == uid).all()
    images = db.query(models.ImageHistory).filter(models.ImageHistory.user_id == uid).all()
    results = []
    for s in searches:
        results.append({"id": s.id, "type": "search", "content": {"query": s.query, "summary": s.summary, "timestamp": s.timestamp.isoformat()}})
    for i in images:
        results.append({"id": i.id, "type": "image", "content": {"prompt": i.prompt, "image_url": i.image_url, "timestamp": i.timestamp.isoformat()}})
    # simple sort by timestamp descending
    results.sort(key=lambda x: x["content"]["timestamp"], reverse=True)
    return results

@router.delete("/dashboard/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db), user = Depends(get_current_user)):
    uid = user["user_id"]
    s = db.query(models.SearchHistory).filter(models.SearchHistory.id == item_id, models.SearchHistory.user_id == uid).first()
    if s:
        db.delete(s)
        db.commit()
        return {"message": "deleted"}
    i = db.query(models.ImageHistory).filter(models.ImageHistory.id == item_id, models.ImageHistory.user_id == uid).first()
    if i:
        db.delete(i)
        db.commit()
        return {"message": "deleted"}
    raise HTTPException(status_code=404, detail="Item not found")
