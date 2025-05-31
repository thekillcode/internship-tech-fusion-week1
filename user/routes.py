from fastapi import APIRouter, Depends, Body
from auth.utils import get_current_user
from auth.schemas import UserResponse

router = APIRouter()


@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: UserResponse = Depends(get_current_user)):
    return current_user


