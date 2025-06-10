from urllib.parse import quote_plus
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
from typing import ClassVar
from pathlib import Path

import os

BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / ".env"


load_dotenv(ENV_PATH)


class Settings(BaseSettings):
    BASE_DIR: ClassVar[Path] = Path(__file__).resolve().parent.parent
    # Database Configuration
    APP_NAME: str = os.getenv("APP_NAME", "TKC APP")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "TKC APP")

    PORT: int = os.getenv('PORT', 8000)
    SERVER_HOST: str = os.getenv('SERVER_HOST', "127.0.0.1")

    @property
    def WORKERS(self) -> int | None:
        if os.getenv('WORKERS'):
            return int(os.getenv('WORKERS'))
        return None

    DB_CONNECTION: str = os.getenv("DB_CONNECTION", "sqlite").lower
    DB_HOST: str = os.getenv("DB_HOST", "localhost")
    DB_PORT: int = int(os.getenv("DB_PORT", 5432))
    DB_USER: str = os.getenv("DB_USER", "postgres")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD", "")
    DB_NAME: str = os.getenv("DB_NAME", "killcode_db")

    @property
    def SQLALCHEMY_DATABASE_URL(self) -> str:
        if self.DB_CONNECTION == "postgres":
            return (
                f"postgresql://{self.DB_USER}:{quote_plus(self.DB_PASSWORD)}"
                f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
            )
        else:
            db_path = self.BASE_DIR / "database"
            db_path.mkdir(exist_ok=True)
            return f"sqlite:///{db_path / self.DB_NAME}.db"

    @property
    def ENVIRONMENT(self) -> str:
        return os.getenv("ENVIRONMENT", "development").lower()

    @property
    def IS_DEVELOPMENT(self) -> bool:
        return self.ENVIRONMENT == "development"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 1440))

    ALLOW_ORIGINS: str = os.getenv("ALLOW_ORIGINS", "*")
    ALLOW_CREDENTIALS: bool = os.getenv(
        "ALLOW_CREDENTIALS", "True").lower() == "true"
    ALLOW_METHODS: str = os.getenv("ALLOW_METHODS", "GET,POST,PUT,DELETE")
    ALLOW_HEADERS: str = os.getenv("ALLOW_HEADERS", "*")

    @property
    def ALLOW_ORIGINS_LIST(self) -> list[str]:
        return [origin.strip() for origin in self.ALLOW_ORIGINS.split(",") if origin.strip()]

    @property
    def ALLOW_METHODS_LIST(self) -> list[str]:
        return [mothod.strip() for mothod in self.ALLOW_METHODS.split(",") if mothod.strip()]

    @property
    def ALLOW_HEADERS_LIST(self) -> list[str]:
        return [header.strip() for header in self.ALLOW_HEADERS.split(",") if header.strip()]

    # MAIL_SMTP
    MAIL_USERNAME: str = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD: str = os.getenv("MAIL_PASSWORD")
    MAIL_FROM_EMAIL: str = os.getenv("MAIL_FROM_EMAIL")
    MAIL_FROM_NAME: str = os.getenv("MAIL_FROM_NAME", "Admin")
    MAIL_PORT: int = int(os.getenv("MAIL_PORT", 25))
    MAIL_SERVER: str = os.getenv("MAIL_SERVER")
    # Fastapi
    FAST_API_TITLE: str = os.getenv("FAST_API_TITLE", "Python Tools")
    FAST_API_DESCRIPTION: str = os.getenv("FAST_API_DESCRIPTION", "")
    FAST_API_SUMMARY: str = os.getenv("FAST_API_SUMMARY", "")
    FAST_API_VERSION: str = os.getenv("FAST_API_VERSION", "")
    FAST_API_CONTACT_NAME: str = os.getenv("FAST_API_CONTACT_NAME", "")
    FAST_API_CONTACT_URL: str = os.getenv("FAST_API_CONTACT_URL", "")
    FAST_API_CONTACT_EMAIL: str = os.getenv("FAST_API_CONTACT_EMAIL", "")


settings = Settings()
