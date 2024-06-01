from sqlalchemy import String, Column, Integer, ForeignKey, Boolean
from .base import Base

class ChatRoom(Base):

    __tablename__ = "chat_room"

    roomId = Column(String, primary_key=True)   # Thread id
    userid = Column(Integer,ForeignKey('users.userid'),  nullable=False)
    profile_or_qa = Column(Boolean, default=True)   # True for profile agent and False for qa agent 

