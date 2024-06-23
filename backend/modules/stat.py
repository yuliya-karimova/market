import requests
import pandas as pd
from bs4 import BeautifulSoup

def get_quarter_stat():
    url = 'https://www.metalinfo.ru/ru/metalmarket/statistics'
    
    # Выполняем GET-запрос к странице
    response = requests.get(url)
    response.raise_for_status()  # Проверяем, успешен ли запрос

    # Используем BeautifulSoup для парсинга HTML-документа
    soup = BeautifulSoup(response.content, 'html.parser')

    # Поиск таблицы по классу
    table = soup.find('table', class_='table table-striped')

    # Извлечение заголовков таблицы
    headers = []
    for th in table.find('thead').find_all('th'):
        headers.append(th.text.strip())

    # Извлечение данных таблицы
    rows = []
    for tr in table.find('tbody').find_all('tr'):
        cells = tr.find_all('td')
        if len(cells) == 2:  # Проверка на строку с динамикой
            row = ['Динамика'] + [cell.text.strip() for cell in cells]
        else:
            row = [cell.text.strip() for cell in cells]
        rows.append(row)

    # Создание DataFrame
    df = pd.DataFrame(rows, columns=headers)

    return df

# # Пример использования функции
# df = get_quarter_stat()
# print(df)

# # Сохраняем данные в файл Excel
# df.to_excel('metal_market_table_data.xlsx', index=False)
# print(f"Данные сохранены в файл metal_market_table_data.xlsx")
