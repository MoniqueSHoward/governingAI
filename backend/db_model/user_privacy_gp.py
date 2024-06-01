from sqlalchemy import String, Column, Integer, Boolean, ForeignKey
from .base import Base

class UserPrivacyGP(Base):
    __tablename__ = "userprivacygp"

    userid = Column(Integer,ForeignKey('users.userid'),  nullable=False, primary_key=True)
    point1 = Column(Boolean, nullable=True)
    point2 = Column(Boolean, nullable=True)
    point3 = Column(Boolean, nullable=True)
    point4 = Column(Boolean, nullable=True)
    point5 = Column(Boolean, nullable=True)
    point6 = Column(Boolean, nullable=True)

