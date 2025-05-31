
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings


engine = create_engine(
    settings.SQLALCHEMY_DATABASE_URL,
    connect_args={
        "check_same_thread": False} if settings.DB_CONNECTION == "sqlite" else {},
    pool_size=10 if settings.DB_CONNECTION == "postgres" else 1,
    max_overflow=20 if settings.DB_CONNECTION == "postgres" else 0,
    pool_pre_ping=True,
    pool_recycle=3600
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
