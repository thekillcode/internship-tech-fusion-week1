faqs = {
    "what are your opening hours": {
        "answer": "We're open Monday to Friday from 11:00 AM to 10:00 PM, and Saturday to Sunday from 10:00 AM to 11:00 PM.",
        "follow_up": None
    },
    "are you open on weekends": {
        "answer": "Yes, we're open Saturday and Sunday from 10:00 AM to 11:00 PM.",
        "follow_up": None
    },
    "do you deliver": {
        "answer": "Yes, we offer delivery within a 5-mile radius through our website and partner apps.",
        "follow_up": None
    },
    "what is your address": {
        "answer": "We're located at 123 Gourmet Street, Foodville, FC 12345.",
        "follow_up": None
    },
    "do you have vegetarian options": {
        "answer": "Absolutely! We have a dedicated vegetarian menu with over 15 options.",
        "follow_up": None
    },
    "can i make a reservation": {
        "answer": "Yes, you can reserve a table through our website, by phone at (123) 456-7890, or in person.",
        "follow_up": None
    },
    "what is your signature dish": {
        "answer": "Our chef's special is the 'Truffle Infused Filet Mignon' - a customer favorite!",
        "follow_up": None
    },
    "do you have wifi": {
        "answer": "Yes, we offer free high-speed WiFi for our customers. Ask your server for the password.",
        "follow_up": None
    },
    "are you kid friendly": {
        "answer": "Certainly! We have a kids' menu and high chairs available.",
        "follow_up": None
    },
    "what payment methods do you accept": {
        "answer": "We accept all major credit cards, cash, and mobile payments like Apple Pay and Google Pay.",
        "follow_up": None
    }
}


example_questions = [f"'{q}'" for q in faqs.keys()]

formatted_questions = ", ".join(
    example_questions[:-1]) + ", or " + example_questions[-1]

default_responses = {
    "greeting": f"Hello! I'm the Restaurant Guide. How can I help you today? Here are some things you can ask: {formatted_questions}",
    "no_match": f"I'm sorry, I didn't understand that. Could you try asking something else? Here are some things I can help with: {formatted_questions}"
}
