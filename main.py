from uvicorn import run
from app.config import settings

if __name__ == "__main__":
    run(
        "app:app",
        host=settings.SERVER_HOST,
        port=settings.PORT,
        reload=settings.IS_DEVELOPMENT,
        workers=settings.WORKERS
    )
