import docx
import requests
from modules.ai import ask_ai

EXAMPLE_FILE_PATH = 'data/company/example.docx'

def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    text = []
    for paragraph in doc.paragraphs:
        text.append(paragraph.text)
    return '\n'.join(text)

def get_ready_report(company_name):
    ready_reports = {
        'evraz': ['евраз', 'evraz'],
        'mmk': ['ммк', 'mmk', 'Магнитогорский металлургический', 'Магнитогорский комбинат', 'Магнитогорский завод', 'Магнитка', 'MAGN'],
        'mechel': ['mechel', 'Мечел', 'МЕталл ЧЕЛябинска'],
        'severstal': ['severstal', 'Северсталь']
    }

    error_text = f"Извините, не удалось собрать отчет по компании {company_name}. Попробуйте изменить запрос или попробовать позже."

    for key, names in ready_reports.items():
        if company_name.lower() in (name.lower() for name in names):
            try:
                with open(f'data/company/{key}.txt', 'r') as file:
                    return file.read()
            except FileNotFoundError:
                    return error_text

    return error_text

def check_company(company_name, is_new):
    if is_new == 'false':
        return get_ready_report(company_name)
    
    # Извлекаем текст шаблона из файла example.docx
    template_text = extract_text_from_docx(EXAMPLE_FILE_PATH)
    
    # Создаем запрос к OpenAI API
    prompt = f"""
    Найди мне сайты с информацией о компании {company_name}, где будет информация о компании, обзор ее выручки и объема производства.
    Перечисли эти сайты.
    
    А ниже на основе найденных сайтов проведи анализ компании {company_name} по приведенному примеру. Ответ возвращай с маркдаун разметкой.
    
    Не пиши всякие служебные заметки типа "Пример таблицы".

    Заголовок должен быть "Анализ компании: 'company_name'"

    Пиши на русском языке.

    Пример анализа:
    {template_text}
    """

    request = {
        "messages": [
                {"role": "user", "content": prompt}
            ],
        "max_tokens": 4000 
    }

    try:
        res = ask_ai(request)
        return res
    except:
        # вернем готовый ответ, если есть сбои на сервере
        return get_ready_report(company_name)
