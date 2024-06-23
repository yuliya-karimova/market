import docx
import requests
from modules.ai import ask_ai
from bs4 import BeautifulSoup

def check_gostmetal():
    url = "https://gostmetal.ru/dinamika/#t-2-24"

    # Запрос к странице
    response = requests.get(url)
    response.raise_for_status()  # Проверка успешности запроса

    # Парсинг HTML
    soup = BeautifulSoup(response.content, "html.parser")

    # Поиск нужного блока с прогнозами
    main_content = soup.find('div', class_='main-content')

    if main_content:
        # Создание отчета
        report = []

        # Поиск заголовка и текста
        headings = main_content.find_all("h2")
        for heading in headings:
            if heading.get_text() and "Прогнозы и ожидания на второй квартал 2024 года для рынка металлопроката в России" in heading.get_text():
                report.append(heading.get_text(strip=True))

                next_elements = heading.find_all_next(['p', 'h3', 'blockquote', 'h2'])
                for elem in next_elements:
                    if elem.name == 'h2':
                        break  # Останавливаемся, если достигли следующего заголовка h2
                    report.append(elem.get_text(strip=True))
                break

        # Объединение текста в один отчет
        report_text = "\n".join(report)
            
        shortened_report_text = report_text[:4000]
        print('shortened_report_text: ', shortened_report_text)

        system_message = "Перепиши результаты анализа, используя академическую стилистику и сложные экономические термины.  не меняй цифры. Применяй рассуждения и аналитические выводы. мне нужно чтобы ты прочитал новость и пересказал ее кратко. акцент должен быть на пользе для продавца металлопроката. Пиши на русском языке. Используй маркдаун для разметки, дели текст на абзацы."
        prompt = f"Новость взята с сайта: {url}\n\n{shortened_report_text}\n\nКратко перескажите новость с акцентом на полезность для продавца металлопроката. Помогите ему принять бизнес-решения на основе данной информации."

        request = {
            "messages": [
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": prompt}
                ],
            "temperature": 0.3
        }

        res = ask_ai(request)
        return res
    else:
        print("Основной контент не найден")


def collect_analytics():
    result = []
    gostmetal_analytics = check_gostmetal()
    result.append({
        "link": "https://gostmetal.ru/dinamika/#t-2-24",
        "source": "https://gostmetal.ru",
        "content": gostmetal_analytics,
    })

    return result