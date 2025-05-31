from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.database import get_db
from config.mails import send_reset_password_email
from . import schemas, models, utils
from app.config import settings
from datetime import datetime, timedelta, timezone
import secrets
router = APIRouter()


@router.post('/register', status_code=status.HTTP_201_CREATED)
async def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    errors = {}

    if user.password != user.password_confirmation:
        errors["password_confirmation"] = "Passwords do not match"
        
    db_user = db.query(models.User).filter(
        or_(
            models.User.email == user.email,
            models.User.username == user.username
        )
    ).first()
    if db_user:
        if db_user.username == user.username:
            errors["username"] = "Username Already Exists"
        if db_user.email == user.email:
            errors["email"] = "Email Already Exists"
    if errors:
        raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=errors)
    hash_password = utils.get_password_hash(user.password)
    new_user = models.User(
        username=user.username,
        email=user.email,
        password=hash_password,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    access_token = utils.create_access_token(
        data={"sub": new_user.email, "user_id": new_user.id}
    )

    return {"access_token": access_token, "user": schemas.UserResponse.model_validate(new_user)}


@router.post('/login', status_code=status.HTTP_200_OK)
async def login(user_login: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(
        models.User.email == user_login.email).first()
    if not db_user or not utils.verify_password(user_login.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Credential",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = utils.create_access_token(
        data={"sub": db_user.email, "user_id": db_user.id}
    )

    return {"access_token": access_token, "user": schemas.UserResponse.model_validate(db_user)}


@router.post('/forgot-password', status_code=status.HTTP_200_OK)
async def forgot_password(
    request: schemas.User,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    user = db.query(models.User).filter(
        models.User.email == request.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with this email does not exist",
        )
    reset_token = secrets.token_urlsafe(32)
    token_expires = datetime.now(timezone.utc) + timedelta(hours=1)

    existing_token = db.query(models.PasswordResetToken).filter(
        models.PasswordResetToken.email == user.email
    ).first()

    if existing_token:
        # Update existing token
        existing_token.reset_token = reset_token
        existing_token.token_expires = token_expires
        existing_token.updated_at = datetime.now(timezone.utc)
    else:
        # Create new token
        new_reset_token = models.PasswordResetTokens(
            email=user.email,
            reset_token=reset_token,
            token_expires=token_expires
        )
        db.add(new_reset_token)
    db.commit()
    reset_url = f"{settings.FRONTEND_URL}/reset-password?token={reset_token}"
    background_tasks.add_task(
        send_reset_password_email,
        email_to=user.email,
        redirect_url=reset_url
    )
    return {"message": "Password Reset Link Send Successfully"}


@router.post(
    '/reset-password',
    status_code=status.HTTP_200_OK,
)
async def reset_password(request: schemas.ResetPassword, db: Session = Depends(get_db)):
    errors = {}
    token_record = db.query(models.PasswordResetToken).filter(
        models.PasswordResetToken.reset_token == request.token
    ).first()
    if not token_record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid or expired token",
        )
    current_time = datetime.now(timezone.utc)
    if token_record.token_expires.replace(tzinfo=timezone.utc) < current_time:
        errors["token"] = "Token has expired"
        
    if request.password != request.password_confirmation:
        errors["password_confirmation"] = "Passwords do not match"
    if errors:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"errors": errors}
        )
    user = db.query(models.User).filter(
        models.User.email == token_record.email
    ).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    hashed_password = utils.get_password_hash(request.password)
    user.password = hashed_password
    db.commit()

    db.delete(token_record)
    db.commit()
    return {"message": "Password has been reset successfully"}
