from pydantic import BaseModel, EmailStr,Field


class User(BaseModel):
    email: EmailStr


class UserCreate(User):
    username: str = Field(..., example="john")
    password: str = Field(..., example="12345678", min_length=8)
    password_confirmation: str = Field(..., example="12345678")
    
   


class UserLogin(User):
    password: str


class UserResponse(User):
    id: int
    role: str
    username: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenWithUser(Token):
    user: UserResponse


class ResetPassword(BaseModel):
    token: str
    password: str
    password_confirmation: str
