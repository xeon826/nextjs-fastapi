from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class User(SQLModel, table=True):
    """User database model"""
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)


class UserCreate(SQLModel):
    """Model for creating a new user"""
    name: str
    email: str


class UserRead(SQLModel):
    """Model for reading user data"""
    id: int
    name: str
    email: str
    created_at: datetime
    updated_at: datetime


class Message(SQLModel, table=True):
    """Message database model"""
    id: Optional[int] = Field(default=None, primary_key=True)
    content: str
    user_id: int
    created_at: datetime = Field(default_factory=datetime.now)


class MessageCreate(SQLModel):
    """Model for creating a new message"""
    content: str
    user_id: int


class MessageRead(SQLModel):
    """Model for reading message data"""
    id: int
    content: str
    user_id: int
    created_at: datetime