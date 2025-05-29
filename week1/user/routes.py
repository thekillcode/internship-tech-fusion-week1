from fastapi import APIRouter, Depends, Body
from auth.utils import get_current_user
from auth.schemas import UserResponse
from services.socket_service import socket_service

router = APIRouter()


@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: UserResponse = Depends(get_current_user)):
    return current_user


@router.post("/send")
async def send_notification(
    msg: str,
    current_user: UserResponse = Depends(get_current_user),
):
    await socket_service.emit_to_all("notification", {
        "message": msg,
        "sender": current_user.username,
    })

    return {"status": "Notification broadcasted successfully"}
