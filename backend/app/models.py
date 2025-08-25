from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from .database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="user")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class SearchHistory(Base):
    __tablename__ = "search_history"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    query = Column(String)
    summary = Column(Text)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class ImageHistory(Base):
    __tablename__ = "image_history"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    prompt = Column(String)
    image_url = Column(String)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
