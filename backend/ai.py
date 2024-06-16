import requests
from typing import Optional, List, Dict, Any
from pydantic import BaseModel

VPS_IP = "176.222.52.84"

# gpt-3.5-turbo - 0.5$
# gpt-4 - 10$
# gpt-4o - 5$

class Message(BaseModel):
    role: str
    content: str

class Payload(BaseModel):
    model: str
    messages: List[Message]
    max_tokens: Optional[int] = 3000
    temperature: Optional[float] = None
    n: Optional[int] = None
    stop: Optional[List[str]] = None
    frequency_penalty: Optional[float] = None
    presence_penalty: Optional[float] = None

def ask_ai(payload: Payload):
    res = requests.post(
        f"http://{VPS_IP}:8000/chat_api",
        json=payload
    )
    print('res: ', res)
    if res.status_code == 200:
        response = res.json()["response"]
        return response
    else:
        raise

