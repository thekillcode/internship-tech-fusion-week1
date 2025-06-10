from uvicorn import run
from app.config import settings

if __name__ == "__main__":
    run(
        "app:app",
        host='0.0.0.0' if not settings.IS_DEVELOPMENT else '127.0.0.1',
        port=80 if not settings.IS_DEVELOPMENT else 8099,
        reload=settings.IS_DEVELOPMENT,
        workers=None if settings.IS_DEVELOPMENT else 4
    )
