from sqlalchemy import String, Column, Integer, ForeignKey
from .base import Base

class UserVendorScore(Base):
    __tablename__ = "vendor_score"

    userid = Column(Integer,ForeignKey('users.userid'),  nullable=False, primary_key=True)
    vendor_name = Column(String, nullable=False)
    website = Column(String, nullable=False)
    numberOfPointsmeeted = Column(Integer, nullable = False)
    privacy_summary = Column(String, nullable=False)