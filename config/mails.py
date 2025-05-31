from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pathlib import Path
from jinja2 import Environment, FileSystemLoader
from app import settings
from datetime import datetime

template_dir = Path(__file__).parent.parent / "templates"
env = Environment(loader=FileSystemLoader(template_dir))

conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    # Correct format
    MAIL_FROM=f"{settings.MAIL_FROM_NAME} <{settings.MAIL_FROM_EMAIL}>",
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)


async def send_reset_password_email(email_to: str, redirect_url: str):
    template = env.get_template("reset_password.html")
    html_content = template.render(
        reset_url=redirect_url,
        app_name=settings.APP_NAME,
        current_year=datetime.now().year,
        expiration_hours=1,
        user=email_to
    )
    message = MessageSchema(
        subject=f"{settings.APP_NAME} - Password Reset Request",
        recipients=[email_to],
        body=html_content,
        subtype="html"
    )
    fm = FastMail(conf)
    await fm.send_message(message)
