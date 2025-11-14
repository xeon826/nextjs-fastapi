from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from .database import get_session, create_db_and_tables
from .models import User, UserCreate, UserRead, Message, MessageCreate, MessageRead

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(
    title="Next.js + FastAPI + SQLModel API",
    description="A modern full-stack application with Next.js frontend and FastAPI backend",
    version="0.2.0",
    docs_url="/api/py/docs",
    openapi_url="/api/py/openapi.json"
)


@app.on_event("startup")
def on_startup():
    """Create database tables on startup"""
    create_db_and_tables()


@app.get("/api/py/helloFastApi")
def hello_fast_api():
    """Simple hello endpoint"""
    return {"message": "Hello from FastAPI with SQLModel!"}


@app.get("/api/py/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "FastAPI Backend"}


# User endpoints
@app.post("/api/py/users", response_model=UserRead)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    """Create a new user"""
    db_user = User.model_validate(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


@app.get("/api/py/users", response_model=List[UserRead])
def read_users(
    skip: int = 0,
    limit: int = 100,
    session: Session = Depends(get_session)
):
    """Get all users with pagination"""
    users = session.exec(select(User).offset(skip).limit(limit)).all()
    return users


@app.get("/api/py/users/{user_id}", response_model=UserRead)
def read_user(user_id: int, session: Session = Depends(get_session)):
    """Get a specific user by ID"""
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# Message endpoints
@app.post("/api/py/messages", response_model=MessageRead)
def create_message(
    message: MessageCreate,
    session: Session = Depends(get_session)
):
    """Create a new message"""
    # Check if user exists
    user = session.get(User, message.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db_message = Message.model_validate(message)
    session.add(db_message)
    session.commit()
    session.refresh(db_message)
    return db_message


@app.get("/api/py/messages", response_model=List[MessageRead])
def read_messages(
    skip: int = 0,
    limit: int = 100,
    session: Session = Depends(get_session)
):
    """Get all messages with pagination"""
    messages = session.exec(select(Message).offset(skip).limit(limit)).all()
    return messages


@app.get("/api/py/messages/{message_id}", response_model=MessageRead)
def read_message(message_id: int, session: Session = Depends(get_session)):
    """Get a specific message by ID"""
    message = session.get(Message, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message