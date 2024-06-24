import json
import os
from modules.ai import ask_ai, GPT_NAMES
from modules.utils import save_to_docx, save_to_pdf

def get_news_by_topics(topics):    
    request_text = f'''
    Найди в интернете информацию по темам: {topics}

    Информация должна быть следующего рода:
    Новости и обновления: найди 8 новостей с ссылками на источники, должно быть несколько источников
    Аналитика и отчеты: Краткий обзор с ссылками на источник

    Верни ответ с маркдаун разметкой
    '''
        

    request = {
        "model": GPT_NAMES.GPT_3_5,
        "messages": [
            {"role": "user", "content": request_text}
        ],
        "temperature": 0.3,
    }

    response = ask_ai(request)
        
    return response
