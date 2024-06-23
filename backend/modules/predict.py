import requests
import re
import json
import pandas as pd
from bs4 import BeautifulSoup
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.stattools import adfuller
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from statsmodels.tsa.arima.model import ARIMA
from datetime import datetime
import os
import base64
from io import BytesIO
from modules.ai import ask_ai

import matplotlib
matplotlib.use('Agg')

def extract_chart_data(period=None, start_date=None, end_date=None, output_file = ''):
    # Определение URL в зависимости от входных параметров
    base_url = 'https://www.metalinfo.ru/ru/metalmarket/statistics'

    if period in ['year', 'quarter', 'last_year']:
        url = f'{base_url}?stype=1&period={period}'
    elif start_date and end_date:
        url = f'{base_url}?stype=2&startDate={start_date}&endDate={end_date}'
    else:
        print("Неверные параметры. Укажите либо период (year, quarter, last_year), либо start_date и end_date.")
        return

    # Выполняем GET-запрос к странице
    response = requests.get(url)
    response.raise_for_status()  # Проверяем, успешен ли запрос

    # Используем BeautifulSoup для парсинга HTML-документа
    soup = BeautifulSoup(response.content, 'html.parser')

    # Поиск всех скриптов
    scripts = soup.find_all('script', string=True)

    # Поиск данных графика в скриптах
    labels = []
    datasets = []

    for script in scripts:
        if 'PAChart.chart.setLabels' in script.text and 'PAChart.chart.setDatasets' in script.text:
            labels_match = re.search(r'PAChart\.chart\.setLabels\(\[(.*?)\]\)', script.text, re.DOTALL)
            datasets_match = re.search(r'PAChart\.chart\.setDatasets\(\[(.*?)\]\)', script.text, re.DOTALL)
            
            if labels_match and datasets_match:
                # Извлекаем и декодируем данные
                labels = json.loads(f'[{labels_match.group(1)}]')
                datasets_json = f'[{datasets_match.group(1)}]'
                datasets = json.loads(datasets_json)
                break

    if not labels or not datasets:
        print("Не удалось найти данные графика.")
        return

    # Преобразование данных графика в DataFrame
    data = datasets[0]['data']  # Предполагаем, что у нас один набор данных

    df = pd.DataFrame({
        'Date': pd.to_datetime(labels, format='%d-%m-%Y'),
        'Average Price (RUB)': data,
    })

    df['Date'] = df['Date'].dt.strftime('%d.%m.%Y %H:%M:%S')

    # Сохраняем данные в файл Excel
    if output_file:
        df.to_excel(output_file, index=False)
        print(f"Данные сохранены в файл {output_file}")

    return df

# Примеры использования функции
# Готовые периоды
# extract_chart_data(period='year', output_file='metal_market_statistics_year.xlsx')
# extract_chart_data(period='quarter', output_file='metal_market_statistics_quarter.xlsx')
# extract_chart_data(period='last_year', output_file='metal_market_statistics_last_year.xlsx')

# # Кастомный период
# extract_chart_data(start_date='14-06-2023', end_date='14-06-2024', output_file='metal_market_statistics_custom.xlsx')

def plot_to_base64(fig):
    buf = BytesIO()
    fig.savefig(buf, format='png')
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    return img_base64

def predict_next_year():
    today = datetime.today()
    # Форматирование даты в "dd-mm-yyyy"
    today_formatted = today.strftime("%d-%m-%Y")

    file_name = 'data/metal_prices.xlsx'
    
    # extract_chart_data(start_date='01-01-2014', end_date=today_formatted, output_file=file_name)
    if not os.path.isfile(file_name):
        # Если файла нет, создаем его с помощью extract_chart_data
        extract_chart_data(start_date='01-01-2014', end_date=today_formatted, output_file=file_name)

    data = pd.read_excel(file_name, index_col=0, parse_dates=True)
    data.index = pd.to_datetime(data.index, format='%d.%m.%Y %H:%M:%S')

    # Проверка на стационарность ряда
    result = adfuller(data['Average Price (RUB)'])
    adf_statistic = result[0]
    p_value = result[1]

    # Построение ACF и PACF для определения параметров p и q
    fig, axes = plt.subplots(1, 2, figsize=(16, 4))
    plot_acf(data['Average Price (RUB)'], lags=40, ax=axes[0])
    plot_pacf(data['Average Price (RUB)'], lags=40, ax=axes[1])
    acf_pacf_base64 = plot_to_base64(fig)
    plt.close(fig)

    # Подбор модели ARIMA на основе графиков ACF и PACF
    p = 1  # from PACF
    d = 2  # based on data trend
    q = 2  # from ACF

    # Обучение модели ARIMA
    model = ARIMA(data['Average Price (RUB)'], order=(p, d, q))
    arima_result = model.fit()

    # Прогнозирование на следующий год (12 месяцев)
    forecast = arima_result.get_forecast(steps=12)
    forecast_index = pd.date_range(start=data.index[-1] + pd.DateOffset(months=1), periods=12, freq='M')
    forecast_mean = np.array(forecast.predicted_mean, dtype=np.float64)
    forecast_conf_int = np.array(forecast.conf_int(), dtype=np.float64)

    # Визуализация прогноза
    plt.figure(figsize=(10, 6))
    plt.plot(data['Average Price (RUB)'], label='Исторические данные')
    plt.plot(forecast_index, forecast_mean, label='Прогноз', color='red')
    plt.fill_between(forecast_index, 
                    forecast_conf_int[:, 0], 
                    forecast_conf_int[:, 1], color='pink', alpha=0.3)
    plt.xlabel('Дата')
    plt.ylabel('Средняя цена (руб.)')
    plt.title('Прогноз цен на металлопрокат на следующий год')
    plt.legend()
    plt.grid(True)

    forecast_base64 = plot_to_base64(plt)
    plt.close(fig)

    # Создание текстового отчета
    report = []

    report.append("Анализ временного ряда средней цены на металлопрокат:\n")
    report.append(f"ADF Statistic: {adf_statistic:.4f}")
    report.append(f"p-value: {p_value:.4f}\n")

    report.append("Прогноз на следующий год:\n")
    for i, (mean, conf_int) in enumerate(zip(forecast_mean, forecast_conf_int), start=1):
        lower, upper = conf_int
        report.append(f"Месяц {i}:")
        report.append(f"Прогнозируемая цена: {mean:.2f} руб.")
        report.append(f"Доверительный интервал: от {lower:.2f} до {upper:.2f} руб.\n")

    # Объединение текста в один отчет
    report_text = "\n".join(report)

    request = {
        "messages": [
            {"role": "system", "content": "Перепиши результаты анализа, используя академическую стилистику и сложные экономические термины. Пиши подробно, не меняй цифры. Применяй рассуждения и аналитические выводы. Описание должно быть выполнено на уровне лучших экономических журналов. Пиши на русском языке. Используй маркдаун для оформления."},
            {"role": "user", "content": report_text}
        ],
        "temperature": 0.3,
    }

    response = ask_ai(request)

    return {
        "link": 'https://www.metalinfo.ru/ru/metalmarket/statistics',
        "report": response,
        "acf_pacf_chart": acf_pacf_base64,
        "forecast_chart": forecast_base64
    }
