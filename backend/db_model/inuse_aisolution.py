from sqlalchemy import String, Column, Integer, ForeignKey
from .base import Base

class InuseAISolution(Base):

    __tablename__ = "inUseSolutions"

    toolid = Column(Integer, primary_key=True) 
    userid = Column(Integer,ForeignKey('users.userid'),  nullable=False)
    name_purpose = Column(String, nullable=False) 