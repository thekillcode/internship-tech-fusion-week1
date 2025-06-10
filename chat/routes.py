from fastapi import APIRouter
from .schemas import ChatMessage
from .faqs import default_responses, faqs
from .utils import find_best_match
router = APIRouter()


@router.post('')
async def chat(chat_message: ChatMessage):
    question = chat_message.question.strip().lower()

    if any(greeting in question for greeting in ["hi", "hello", "hey"]):
        return {"answer": default_responses["greeting"], "follow_up": None}
    best_match = find_best_match(question=question)
    if best_match:
        return faqs[best_match]
    else:
        return {"answer": default_responses["no_match"], "follow_up": None}


@router.get("/hours")
async def get_hours():
    return {
        "weekdays": "Monday to Friday: 11:00 AM - 10:00 PM",
        "weekends": "Saturday to Sunday: 10:00 AM - 11:00 PM"
    }
