import difflib
from .faqs import faqs


def find_best_match(question):
    """Find the best matching question from our FAQs"""
    questions = list(faqs.keys())
    matches = difflib.get_close_matches(
        question.lower(), questions, n=1, cutoff=0.6)
    return matches[0] if matches else None
