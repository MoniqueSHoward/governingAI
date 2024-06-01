import sqlalchemy
from sqlalchemy.orm import sessionmaker



def create_engine() -> sqlalchemy.engine.base.Engine:
    engine = sqlalchemy.create_engine(
        "sqlite:///giai.db"
    )
    return engine

engine = create_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()