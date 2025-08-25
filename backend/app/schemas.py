from pydantic import BaseModel
from typing import Optional
import datetime

# Auth
class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Search / Image
class SearchRequest(BaseModel):
    query: str

class ImageRequest(BaseModel):
    prompt: str

# Dashboard items
class SearchOut(BaseModel):
    id: int
    query: str
    summary: str
    timestamp: datetime.datetime
    class Config:
        orm_mode = True

class ImageOut(BaseModel):
    id: int
    prompt: str
    image_url: str
    timestamp: datetime.datetime
    class Config:
        orm_mode = True
