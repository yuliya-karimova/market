import requests
from bs4 import BeautifulSoup
import json  # Импортируем модуль json
import pandas as pd
import os
import re
import certifi
import httpx
import urllib3
import time
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}



products_severstal_data = []

def process_page(driver, section, page):
    url = f'{section}?page={page}'
    driver.get(url)
    time.sleep(random.uniform(2, 4))  # Увеличенный интервал ожидания

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    products_divs = soup.find_all('div', class_='s-product-card')

    # Проверяем, есть ли данные на странице
    if not products_divs:
        print(f'Нет данных на странице {page}, завершение парсинга.')
        return False
    
    for product in products_divs:
        id = ''
        title = ''
        price = None
        link = ''

        try:
            linkEl = product.find('div', class_='s-product-card__title').find('a')
            title = linkEl.get_text(strip=True) or ''
            link = 'https://market.severstal.com' + linkEl['href']
            id = product.find('p', class_='s-product-card__code').get_text(strip=True).replace('Код ', '') or ''

            price_text = product.find('div', class_='s-product-card__price').find('span').get_text(strip=True)
            price_match = re.search(r'([\d\s,\.]+)₽', price_text)
            price_string = price_match.group(1)
            price_no_spaces = re.sub(r'\s+', '', price_string)
            price_float = float(re.sub(r',', '.', price_no_spaces))
            price = int(round(price_float, 0))
        except Exception as e:
            print(e)
            continue  # Пропускаем товар, если произошла ошибка

        products_severstal_data.append({
            'Название severstal': title,
            'Код severstal': id,
            'Цена severstal': price,
            'Ссылка severstal': link,
        })
    return True

# Настройка ротации User-Agent
user_agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.48'
]

# Настройка Selenium WebDriver
options = Options()
options.add_argument("--headless")  # Запуск в фоновом режиме

# Товары лежат по 3 категориям
sections = [
    'https://market.severstal.com/ru/ru/o/c/46',
    'https://market.severstal.com/ru/ru/o/c/109',
    'https://market.severstal.com/ru/ru/o/c/48',
]

max_page = 1000

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

for section in sections:
    print('section: ', section)
    for page in range(1, max_page):
        # Ротация User-Agent
        user_agent = random.choice(user_agents)
        options.add_argument(f'user-agent={user_agent}')
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        
        print('page: ', page)
        if not process_page(driver, section, page):
            break

driver.quit()

price_severstal_df = pd.DataFrame(products_severstal_data)
display(price_severstal_df)

# Сохраняем DataFrame в файл
price_severstal_df.to_excel('price/price_severstal.xlsx', index=False)

products_mmk_data = []

# товары лежат по категориям
sections = [
    'https://market.mmk.ru/catalog/sortovoy-i-fasonnyy-prokat/',
    'https://market.mmk.ru/catalog/listovoy-prokat/',
    'https://market.mmk.ru/catalog/prokat-s-pokrytiem/',
    'https://market.mmk.ru/catalog/truby-i-gnutye-profili/',
]

def process_page(soup):
    products_divs = soup.find_all('div', class_='c-list__i')

    # Проверяем, есть ли данные на странице
    if not products_divs:
        print(f'Нет данных на странице {page}, завершение парсинга.')
        return
    
    for product in products_divs:
        id = ''
        title = ''
        price = ''
        link = ''

        try:
            id = product['id'] or ''
            linkEl = product.find('a', class_='c-list__title')
            title = linkEl['title'] or ''
            link = 'https://market.mmk.ru' + linkEl['href'] or ''

            # там разные цены по регионам
            prices_elements = product.find_all('span', class_='b-price__current')

            prices = []

            for element in prices_elements:
                price_string = element['data-price']

                try:
                    price_no_spaces = re.sub(r'\s+', '', price_string)
                    price_with_dots = re.sub(r',', '.', price_no_spaces)
                    price_num = float(price_with_dots)
                    prices.append(price_num)
                except:
                    continue

            if len(prices):
                price_float = sum(prices) / len(prices)
                price = int(round(price_float, 0))
        except Exception as e:
            print(e)
            break # TODO: заменить на pass
        
        products_mmk_data.append({
            'Название mmk': title,
            'Код mmk': id,
            'Цена mmk': price,
            'Ссылка mmk': link,
        })

def find_last_page(soup):
    # Найти блок пагинации
    pagination_block = soup.find('div', class_='b-pagination__inner')

    if pagination_block:
        # Найти все ссылки внутри блока пагинации
        all_page_links = pagination_block.find_all('a', class_='b-pagination__item')
        page_links = [link for link in all_page_links if 'b-pagination__item--arrow' not in link['class']]
        
        if page_links:
            last_page_link = page_links[-1]
            href = last_page_link['href']
            match = re.search(r'PAGEN_1=(\d+)', href)
            if match:
                last_page_number = int(match.group(1))
                return last_page_number
    return 0
    
for section in sections:
    print('section: ', section)
    # URL страницы, которую будем парсить
    url = f'{section}f/available-is-y/?cnt=30'
    print('url: ', url)

    # Выполняем GET-запрос к странице
    response = requests.get(url, headers=headers, verify=False)
    response.raise_for_status()  # Проверяем, успешен ли запрос

    soup = BeautifulSoup(response.content, 'html.parser')

    max_page = find_last_page(soup)
    print('max_page: ', max_page)

    if max_page > 0:
        for page in range(1, max_page):
            print('page: ', page)
            # URL страницы, которую будем парсить
            url = f'{section}?cnt=30&PAGEN_1={page}'

            # Выполняем GET-запрос к странице
            response = requests.get(url, headers=headers, verify=False)
            response.raise_for_status()  # Проверяем, успешен ли запрос

            soup = BeautifulSoup(response.content, 'html.parser')
            process_page(soup)
    else:
        process_page(soup)

price_mmk_df = pd.DataFrame(products_mmk_data)
display(price_mmk_df)

# Сохраняем DataFrame в файл
price_mmk_df.to_excel('price/price_mmk.xlsx', index=False)

# Собрать список каталогов мечел
url = 'https://mechelservice.ru/catalog/'

response = requests.get(url)
response.raise_for_status()  # Проверяем, успешен ли запрос

soup = BeautifulSoup(response.content, 'html.parser')

all_sections_links = []
sections_links_elements = soup.find('div', class_='sections').find_all('a')
for el in sections_links_elements:
    all_sections_links.append(el['href'])

sections_links = [
    '/catalog/armatura-riflyenaya/',
    '/catalog/armatura-gladkaya/',
    '/catalog/katanka/',
    # '/catalog/balka-g-k/',
    # '/catalog/balka-svarnaya/',
    '/catalog/list-g-k/',
    '/catalog/list-kh-k/',
    '/catalog/list-ots/',
    '/catalog/ugolok/',
    '/catalog/shveller/',
    '/catalog/spetsprofil/',
    '/catalog/truba-elektrosvarnaya/',
    '/catalog/truba-vgp/',
    '/catalog/truba-profilnaya/',
    '/catalog/truba-besshovnaya/',
    '/catalog/krug/',
    '/catalog/kvadrat/',
    '/catalog/katanyy_shestigrannik/',
    '/catalog/polosa-konstr/',
    # '/catalog/polosa-st3/',
    # '/catalog/provoloka-vr-1/',
    # '/catalog/khd-armatura/',
    # '/catalog/provoloka/',
    # '/catalog/armaturnye-pryadi/',
    '/catalog/lenta/',
    # '/catalog/elektrody/',
    # '/catalog/kanat-svetlyy/',
    # '/catalog/kanat-nerzhaveyushchiy/',
    # '/catalog/kanat-otsinkovannyy/',
    # '/catalog/nerzhaveyushchiy-list-g-k/',
    # '/catalog/nerzhaveyushchiy-list-kh-k/',
    # '/catalog/krug_1/',
    # '/catalog/kvadrat_1/',
    # '/catalog/shestigrannik_1/',
    # '/catalog/pokovka_1/',
    # '/catalog/setka-svarnaya/',
    # '/catalog/setka-rabitsa/',
    # '/catalog/strop-gruzovoy-kanatnyy/',
    # '/catalog/strop-tekstilnyy/',
    # '/catalog/strop-tsepnoy/',
    # '/catalog/krug_2/',
    # '/catalog/kvadrat_2/',
    # '/catalog/polosa/',
    # '/catalog/pokovka_2/',
    '/catalog/list-pvl/',
    '/catalog/profnastil/',
    # '/catalog/relsy/',
    # '/catalog/materialy-vsp/'
]

products_mechel_data = []

def get_last_page(soup):
    # нужно найти последнюю страницу
    last_page_link = soup.find('a', href=re.compile(r'PAGEN_1'), string='Конец')

    if last_page_link:
        # Извлечение номера последней страницы из href
        href = last_page_link['href']
        match = re.search(r'PAGEN_1=(\d+)', href)
        if match:
            last_page_number = int(match.group(1))
            return last_page_number
    return 0

def process_page(soup):
    products_trs = soup.find('div', class_='catalog-section').find_all('tr', id=True)

    # Проверяем, есть ли данные на странице
    if not products_trs:
        print(f'Нет данных на странице, завершение парсинга.')
        return
    
    for product in products_trs:
        id = None
        title = ''
        price = None
        link = ''

        try:
            # Находим элемент <a> с ссылкой на товар
            product_link = product.find('a', href=True)

            if product_link:
                # Извлекаем ссылку и разбиваем её на части, чтобы найти ID товара
                href = product_link['href']
                id = href.split('/')[-2]
                link = 'https://mechelservice.ru' + href

            # Извлекаем весь текст из элемента <tr> и объединяем его в одну строку
            all_texts = product.stripped_strings
            combined_text = ' '.join(all_texts)

            # Извлекаем title с помощью регулярного выражения
            title_match = re.search(r'Продукция:\s*(.*?)\s*Наличие:', combined_text)
            title = title_match.group(1).strip() if title_match else None

            # Извлекаем prices с помощью регулярного выражения
            prices_strings = re.findall(r'(?:Розничная цена|Цена),\s*:\s*(\d{1,3}(?:\s\d{3})*)', combined_text)

            prices = []

            for price_string in prices_strings:
                try:
                    price_no_spaces = re.sub(r'\s+', '', price_string)
                    price_with_dots = re.sub(r',', '.', price_no_spaces)
                    price_num = float(price_with_dots)
                    prices.append(price_num)
                except:
                    continue

            if len(prices):
                price_av = sum(prices) / len(prices)
                price = int(round(price_av, 0))
        except Exception as e:
            print(e)
            break # TODO: заменить на pass
        
        products_mechel_data.append({
            'Название mechel': title,
            'Код mechel': id,
            'Цена mechel': price,
            'Ссылка mechel': link,
        })

cookies = {
    'locationNewThree': '80' # для уфы больше товаров отображается
}


for section in sections_links:
    print('section: ', section)
    url = f'https://mechelservice.ru{section}'

    # Выполняем GET-запрос к странице
    response = httpx.get(url, cookies=cookies)
    response.raise_for_status()  # Проверяем, успешен ли запрос

    soup = BeautifulSoup(response.content, 'html.parser')

    max_page = get_last_page(soup)
    print('max_page: ', max_page)

    if max_page > 0:
        for page in range(1, max_page):
            print('page: ', page)
            # URL страницы, которую будем парсить
            url = f'https://mechelservice.ru{section}?PAGEN_1={page}'

            # Выполняем GET-запрос к странице
            response = requests.get(url)
            response.raise_for_status()  # Проверяем, успешен ли запрос

            soup = BeautifulSoup(response.content, 'html.parser')
            process_page(soup)
    else:
        process_page(soup)
        
price_mechel_df = pd.DataFrame(products_mechel_data)
display(price_mechel_df)

# Сохраняем DataFrame в файл
price_mechel_df.to_excel('price/price_mechel.xlsx', index=False)


products_evraz_data = []

def get_last_page(soup):
    # нужно найти последнюю страницу
    all_page_links = soup.find_all('a', href=re.compile(r'PAGEN_\d+'))

    max_page_number = 0
    
    if all_page_links:
        # Extract page numbers from the hrefs and find the maximum page number
        for link in all_page_links:
            href = link['href']
            match = re.search(r'PAGEN_\d+=(\d+)', href)
            if match:
                page_number = int(match.group(1))
                if page_number > max_page_number:
                    max_page_number = page_number
        return max_page_number
    
    return max_page_number

def process_page(driver, section, page):
    url = f'https://evraz.market{section}?PAGEN_4={page}'
    driver.get(url)
    time.sleep(1)  # Подождать пока страница загрузится и выполнится JavaScript

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    products_trs = soup.find_all('tr', class_='catalog-item')

    # Проверяем, есть ли данные на странице
    if not products_trs:
        print(f'Нет данных на странице, завершение парсинга.')
        return
    
    for product in products_trs:
        id = None
        title = ''
        price = None
        link = ''

        try:
            # Находим элемент <a> с ссылкой на товар
            product_link = product.find('a', href=True)

            if product_link:
                # Извлекаем ссылку и разбиваем её на части, чтобы найти ID товара
                href = product_link['href']
                link = 'https://evraz.market' + href
                
                id = href.split('/')[-2]

                product_link_str = str(product_link)

                pattern = r'"name":"([^"]+)"'
                match = re.search(pattern, product_link_str)

                if match:
                    title = match.group(1)
                else:
                    print("Название не найдено")

            # Извлекаем prices с помощью Selenium
            prices_el = product.find('span', class_="catalog-section--item-prices")

            if prices_el:
                min_price_element = prices_el.find('span', class_="js-min-price")
                if min_price_element:
                    price_text = min_price_element.get_text(strip=True)
                    price_text = price_text.replace(' ', '').replace(',', '.')
                    price_float = float(price_text)
                    price = int(round(price_float, 0))
                    
        except Exception as e:
            print(e)
            continue # Пропускаем товар, если произошла ошибка
        
        products_evraz_data.append({
            'Название evraz': title,
            'Код evraz': id,
            'Цена evraz': price,
            'Ссылка evraz': link,
        })

# Настройка Selenium WebDriver
options = Options()
options.add_argument("--headless")  # Запуск в фоновом режиме
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

sections_links = [
    '/metalloprokat/armatura/',
    '/metalloprokat/listy/',
    '/metalloprokat/truby/',
    '/metalloprokat/fasonnyy_prokat/',
]

for section in sections_links:
    print('section: ', section)
    url = f'https://evraz.market{section}'

    driver.get(url)
    driver.add_cookie({'name': 'BITRIX_SM_EVRAZ_PREFERED_UNIT', 'value': 'true'})

    # Выполняем GET-запрос к странице
    response = requests.get(url)
    response.raise_for_status()  # Проверяем, успешен ли запрос

    soup = BeautifulSoup(response.content, 'html.parser')

    max_page = get_last_page(soup)
    print('max_page: ', max_page)

    if max_page > 0:
        for page in range(1, max_page + 1):
            print('page: ', page)
            process_page(driver, section, page)
    else:
        process_page(driver, section, 1)
        
driver.quit()

price_evraz_df = pd.DataFrame(products_evraz_data)
display(price_evraz_df)

# # Сохраняем DataFrame в файл
price_evraz_df.to_excel('price/price_evraz.xlsx', index=False)

# Загрузка существующего файла сравнения
df_compare = pd.read_excel('price/compare_ids.xlsx')

# Загрузка новых данных о ценах
price_severstal = pd.read_excel('price/price_severstal.xlsx')
price_evraz = pd.read_excel('price/price_evraz.xlsx')
price_mechel = pd.read_excel('price/price_mechel.xlsx')
price_mkuralstal = pd.read_excel('price/price_mkuralstal.xlsx')
price_mmk = pd.read_excel('price/price_mmk.xlsx')

# Функция для обновления цен
def update_prices(compare_df, new_prices_df, company_prefix):
    # Создание словаря с кодами и новыми ценами
    price_dict = new_prices_df.set_index(f'Код {company_prefix}')[f'Цена {company_prefix}'].to_dict()
    
    # Обновление цен в файле сравнения
    compare_df[f'Цена {company_prefix}'] = compare_df[f'Код {company_prefix}'].map(price_dict)
    
# Обновление цен для каждой компании
update_prices(df_compare, price_severstal, 'severstal')
update_prices(df_compare, price_evraz, 'evraz')
update_prices(df_compare, price_mechel, 'mechel')
update_prices(df_compare, price_mkuralstal, 'mkuralstal')
update_prices(df_compare, price_mmk, 'mmk')

# Сохранение обновленного файла
df_compare.to_excel('price/compare_ids_updated.xlsx', index=False)

# Вывод первых строк нового DataFrame для проверки
print(df_compare.head())