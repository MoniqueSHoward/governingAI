from sqlalchemy import String, Column, Integer, ForeignKey, Boolean
from .base import Base

class ChatMessage(Base):
    __tablename__ = "chat_message"

    messageId = Column(Integer, primary_key= True)
    userid = Column(Integer,ForeignKey('users.userid'),  nullable=False)
    roomId = Column(String, ForeignKey('chat_room.roomId'))
    message = Column(String, nullable=False)
    isuser = Column(Boolean, default= True)