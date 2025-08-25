from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import auth, search, dashboard
import os

# create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Content Explorer - Beginner")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(search.router)
app.include_router(dashboard.router)
