from fastapi import Depends, HTTPException, status,Request
from fastapi.security import HTTPBasicCredentials,HTTPBasic,HTTPBearer,HTTPAuthorizationCredentials,OAuth2PasswordBearer
from datetime import datetime,timedelta,timezone
from passlib.context import CryptContext
from jose import jwt,JWTError
from sqlalchemy.orm import Session
from app.database import get_db
from . import models, schemas
from typing import Annotated, Optional, Union
from app.config import settings
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY  = settings.SECRET_KEY or os.urandom(64)
ALGORITHM ='HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES or 30

basic_auth = HTTPBasic(auto_error=False)
bearer_auth = HTTPBearer(auto_error=False)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
def verify_password(plain_password, hashed_password)->bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password)->str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_basic_auth(credentials: HTTPBasicCredentials, db: Session):
    user = db.query(models.User).filter(models.User.email == credentials.username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    if not verify_password(credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return user
def verify_bearer_token(token: str, db: Session):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

async def get_current_user(
    request: Request,
    credentials: Optional[HTTPBasicCredentials] = Depends(basic_auth),
    token: Optional[HTTPAuthorizationCredentials] = Depends(bearer_auth),
    db: Session = Depends(get_db)
) -> models.User:
    # Try Bearer token first
    if token is not None:
        return verify_bearer_token(token.credentials, db)
    
    # Then try Basic Auth
    if credentials is not None:
        return verify_basic_auth(credentials, db)
    
    # If neither is provided
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not authenticated",
        headers={"WWW-Authenticate": "Basic, Bearer"},
    )
# async def admin_required(
#     current_user: schemas.UserResponse = Depends(get_current_user)
# ) -> models.User:
#     if current_user.role != models.Role.admin:
#         raise HTTPException(status_code=403, detail="Admin access required")
#     return current_user
