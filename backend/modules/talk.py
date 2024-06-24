from modules.ai import ask_ai, GPT_NAMES

def talk_to_ai(question):    
    request = {
        "model": GPT_NAMES.GPT_3_5,
        "messages": [
            {"role": "user", "content": question}
        ],
    }

    response = ask_ai(request)
        
    return response
