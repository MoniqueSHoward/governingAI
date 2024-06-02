from sqlalchemy import String, Column, Integer
from .base import Base

class Privacy(Base):
    __tablename__ = "privacy"

    gp_id = Column(Integer, nullable=False, primary_key=True)
    title = Column(String, nullable = True)
    description = Column(String, nullable = True)


