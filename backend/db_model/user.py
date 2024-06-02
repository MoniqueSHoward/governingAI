from sqlalchemy import String, Column, Integer, DateTime
from datetime import datetime
from .base import Base

class User(Base):
    __tablename__ = "users"

    userid = Column(Integer, nullable=False, primary_key=True)
    username = Column(String, nullable=False)
    company = Column(String, nullable=True, unique= True)
    website = Column(String, nullable=False, unique=True)
    summaryOfCompany = Column(String, nullable=True)
    address = Column(String, nullable = True)
    city = Column(String, nullable=True)
    zipcode = Column(String, nullable=True)
    phone = Column(String, nullable=True, unique=True)
    industry = Column(String, nullable=True)
    ai_policy =  Column(String, nullable=True)
    ai_parameters = Column(String, nullable = True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


