from sqlalchemy import String, Column, Integer, ForeignKey, Float
from .base import Base

class UserVendorScore(Base):
    __tablename__ = "vendor_score"

    userid = Column(Integer,ForeignKey('users.userid'),  nullable=False, primary_key=True)
    vendor_name = Column(String, nullable=False, primary_key=True)
    website = Column(String, nullable=False, primary_key=True)
    tool_usecase = Column(String, nullable = True)
    privacy_score = Column(Float, nullable=False)
    privacy_summary = Column(String, nullable=False)
    transparency_score = Column(Float, nullable=False)
    transparency_summary = Column(String, nullable=False)
    fairness_score = Column(Float, nullable=False)
    fairness_summary = Column(String, nullable=False)
    public_trust = Column(String, nullable=False)
    public_trust_summary = Column(String, nullable=False)