import requests
import xml.etree.ElementTree as ET
from html import unescape
from datetime import datetime
from babel.dates import format_datetime

def clean_text(text):
    # Удаление лишних пробелов и переносов строк
    text = ' '.join(text.split())
    # Декодирование HTML сущностей
    return unescape(text)

def format_date(date_str):
    # Преобразование строки даты в объект datetime
    dt = datetime.strptime(date_str, '%a, %d %b %Y %H:%M:%S %z')
    # Форматирование даты на русском языке
    return format_datetime(dt, "EEEE, d MMMM y 'года', HH:mm", locale='ru')

def read_analytic_news():
    # Загрузите XML содержимое с URL
    url = 'https://www.metalinfo.ru/ru/metalmarket/analytics/rss.xml'
    response = requests.get(url)

    # Разберите XML содержимое
    root = ET.fromstring(response.content)
    news_items = []

    for item in root.findall('./channel/item'):
        desc = item.find('description').text
        desc = clean_text(desc) if desc else ''
        news = {
            "title": item.find('title').text,
            "link": item.find('link').text,
            "date": format_date(item.find('pubDate').text),
            "description": desc
        }
        news_items.append(news)

    return news_items       


