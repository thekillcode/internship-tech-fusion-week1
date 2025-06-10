from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.security import HTTPBasic, HTTPBearer
from fastapi.staticfiles import StaticFiles
from .config import settings
from .database import Base, engine
import os
# Import routes

from auth.routes import router as auth_router
from user.routes import router as user_router
from chat.routes import router as chat_router
# Create tables

Base.metadata.create_all(bind=engine)


security_schemes = {
    "basic": HTTPBasic(),
    "bearer": HTTPBearer(),
}

app = FastAPI(
    title=settings.FAST_API_TITLE,
    description=settings.FAST_API_DESCRIPTION,
    summary=settings.FAST_API_DESCRIPTION,
    version=settings.FAST_API_VERSION,
    swagger_ui_init_oauth=security_schemes,
)



# dirs
storage_dir = "storage"
os.makedirs(storage_dir, exist_ok=True)
public_dir = "public"
os.makedirs(public_dir, exist_ok=True)
# dirs

app.mount("/public", StaticFiles(directory=public_dir), name="public")
app.mount("/storage", StaticFiles(directory=storage_dir), name="storage")
# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOW_ORIGINS_LIST,
    allow_credentials=settings.ALLOW_CREDENTIALS,
    allow_methods=settings.ALLOW_METHODS_LIST,
    allow_headers=settings.ALLOW_HEADERS_LIST,
)




app.include_router(auth_router, prefix='/auth', tags=["Authentication"])
app.include_router(user_router, prefix='/user', tags=["User"])
app.include_router(chat_router, prefix='/chat', tags=["Chat"])


@app.get("/{full_path:path}",include_in_schema=False)
def read_root():
    static_path = Path("public/index.html")
    if not static_path.exists():
        return {"error": "React app not built!"}
    return FileResponse(static_path)
