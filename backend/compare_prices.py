import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import scipy.stats as st
import math
import pandas as pd
import numpy as np
from statsmodels.stats.multicomp import pairwise_tukeyhsd
import random
import seaborn as sns
import os
import base64
from io import BytesIO
from ai import ask_ai
import json

import matplotlib
matplotlib.use('Agg')

def plot_to_base64(fig):
    buf = BytesIO()
    fig.savefig(buf, format='png')
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    return img_base64

file_path = 'data/compare_ids_result.xlsx'
json_file_path = 'data/compare_result.json'

def compare_prices(is_new = 'false'):
    # Если is_new установлен в 'false', прочитать данные из JSON-файла
    if is_new == 'false' and os.path.exists(json_file_path):
        with open(json_file_path, 'r', encoding='utf-8') as f:
            json_data = json.load(f)
            return json_data.get("data", [])
        
    compare_response = []

    # Загрузка данных
    data = pd.read_excel(file_path)

    # Настройки графика
    BG_WHITE = "#ffffff"
    GREY_LIGHT = "#b4aea9"
    GREY50 = "#7F7F7F"
    GREY_DARK = "#747473"
    RED_DARK = "#850e00"
    COLOR_SCALE = ["#9e1b1b", "#1b9e22", "#1b9a9e", "#241b9e", "#9e1b97"]
    POSITIONS = [0, 1, 2, 3, ]

    # Группировка данных по заводам
    factories = ["Цена", "Цена evraz", "Цена mechel", "Цена mmk"]

    # Собираем данные для всех заводов
    y_data = [data[factory].dropna().values for factory in factories]

    # Создать искаженную версию "x" (это только 0, 1, 2, 3, 4, 5)
    jitter = 0.04
    x_data = [np.array([i] * len(d)) for i, d in enumerate(y_data)]
    x_jittered = [x + st.t(df=6, scale=jitter).rvs(len(x)) for x in x_data]

    # Функция для получения горизонтальных линий
    def get_hlines(values):
        if values.max() > 100:
            return [(math.floor(values.min()/10))*10, 
                    math.floor(((math.floor(values.min()/10))*10 + (math.ceil(values.max()/10))*10)/2), 
                    (math.ceil(values.max()/10))*10]
        elif values.max() > 20: 
            return [(math.floor(values.min()/5))*5, 
                    math.floor(((math.floor(values.min()/5))*5 + (math.ceil(values.max()/5))*5)/2), 
                    (math.ceil(values.max()/5))*5]    
        else:
            return [(math.floor(values.min())), 
                    math.floor(((math.floor(values.min())) + (math.ceil(values.max())))/2), 
                    (math.ceil(values.max()))]

    # Объединяем данные в одну серию для вычисления горизонтальных линий
    all_values = np.concatenate(y_data)
    HLINES = get_hlines(all_values)

    fig, ax = plt.subplots(figsize= (12, 8))

    # Фоновый цвет
    fig.patch.set_facecolor(BG_WHITE)
    ax.set_facecolor(BG_WHITE)

    # Горизонтальные линии, которые используются в качестве ориентира шкалы
    for h in HLINES:
        ax.axhline(h, color=GREY50, ls=(0, (5, 5)), alpha=0.8, zorder=0)

    medianprops = dict(
        linewidth=4, 
        color=GREY_DARK,
        solid_capstyle="butt"
    )
    boxprops = dict(
        linewidth=2, 
        color=GREY_DARK
    )

    ax.boxplot(
        y_data,
        positions=POSITIONS, 
        showfliers=False, # Do not show the outliers beyond the caps.
        medianprops=medianprops,
        whiskerprops=boxprops,
        boxprops=boxprops
    )

    # Добавить искаженные точки
    for x, y, color in zip(x_jittered, y_data, COLOR_SCALE):
        ax.scatter(x, y, s=100, color=color, alpha=0.1)

    # Добавить метки среднего значения
    means = [y.mean() for y in y_data]
    for i, mean in enumerate(means):
        ax.scatter(i, mean, s=250, color=RED_DARK, zorder=3)
        ax.plot([i, i + 0.25], [mean, mean], ls="dashdot", color="black", zorder=3)
        ax.text(
            i + 0.25,
            mean,
            r"$\hat{\mu}=$" + str(round(mean, 1)),
            fontsize=10,
            va="center",
            bbox=dict(
                facecolor="white",
                edgecolor="black",
                boxstyle="round",
                pad=0.15
            ),
            zorder=10
        )

    # Настройка макета
    ax.spines["right"].set_color("none")
    ax.spines["top"].set_color("none")
    ax.spines["left"].set_color(GREY_LIGHT)
    ax.spines["left"].set_linewidth(2)
    ax.spines["bottom"].set_color(GREY_LIGHT)
    ax.spines["bottom"].set_linewidth(2)
    ax.tick_params(length=0)
    ax.set_yticks(HLINES)
    ax.set_yticklabels(HLINES, size=12)
    ax.set_ylabel("Цена", size=14, weight="bold")

    xlabels = [f"{factory}\n(n={len(y)})" for factory, y in zip(factories, y_data)]
    ax.set_xticks(POSITIONS)
    ax.set_xticklabels(xlabels, size=12, ha="center", ma="center")
    ax.set_xlabel("Заводы", size=14, weight="bold")

    pic1 = plot_to_base64(plt)

    compare_response.append({
        "pic": pic1,
    })
    
    plt.close(fig)








    # 2 часть

    data = pd.read_excel(file_path)

    # Группировка данных по заводам
    factories = ["Цена", "Цена evraz", "Цена mechel", "Цена mmk"]
    # Собираем данные для всех заводов
    values = []
    labels = []
    for factory in factories:
        values.extend(data[factory].dropna().values)
        labels.extend([factory] * len(data[factory].dropna()))

    # Преобразование данных в формат, подходящий для теста Тьюки
    values = np.array(values)
    labels = np.array(labels)

    # Выполнение теста Тьюки
    tukey_result = pairwise_tukeyhsd(endog=values, groups=labels, alpha=0.05)

    # Средние значения и медианы
    means = {factory: data[factory].dropna().mean() for factory in factories}
    medians = {factory: data[factory].dropna().median() for factory in factories}

    # Поиск минимальной и максимальной средней цены
    min_mean_factory = min(means, key=means.get)
    max_mean_factory = max(means, key=means.get)

    # Создание текстового отчета
    report = []

    report.append(f"На заводе {min_mean_factory} средняя цена самая маленькая: {means[min_mean_factory]:.2f}.")
    report.append(f"На заводе {max_mean_factory} средняя цена самая большая: {means[max_mean_factory]:.2f}.")

    report.append("\nСравнение цен Северстали с другими компаниями:\n")
    severstal_mean = means["Цена"]
    severstal_median = medians["Цена"]
    report.append(f"Средняя цена Северстали: {severstal_mean:.2f}.")
    report.append(f"Медиана цены Северстали: {severstal_median:.2f}.\n")

    for comparison in tukey_result.summary().data[1:]:
        group1, group2, meandiff, p_adj, lower, upper, reject = comparison
        if "Цена" in [group1, group2]:
            other_group = group2 if group1 == "Цена" else group1
            report.append(f"Сравнение Северстали и {other_group}:")
            report.append(f"Средняя цена {other_group}: {means[other_group]:.2f}.")
            report.append(f"Медиана цены {other_group}: {medians[other_group]:.2f}.")
            report.append(f"Разница средних: {meandiff:.2f}.")
            report.append(f"p-значение: {p_adj:.4f}.")
            report.append(f"Значимые различия: {'да' if reject else 'нет'}.\n")

    # Вывод отчета
    report_text = "\n".join(report)

    openai_request_2 = {
        "model": "gpt-4o",
        "messages": [
            {"role": "system", "content": "Перепиши результаты финансового анализа, используя академическую стилистику и сложные экономические термины. Пиши подробно, не меняй цифры. Применяй рассуждения и аналитические выводы. Описание должно быть выполнено на уровне лучших экономических журналов. Пиши на русском языке. Оформляй с помошью макдауна. "},
            {"role": "user", "content": report_text}
        ],
        "temperature": 0.3
    }

    response_2 = ask_ai(openai_request_2)

    compare_response.append({
        "text": response_2
    })










    # 3 часть

    # Загрузка данных
    data = pd.read_excel(file_path)

    # Группировка данных по заводам
    factories = ["Цена", "Цена evraz", "Цена mechel", "Цена mmk"]

    # Группировка данных по заводам

    # Вычисление среднего значения по остальным заводам
    data['Среднее других заводов'] = data[factories[1:]].mean(axis=1)

    # Вычисление разницы для каждого значения Северстали
    data['Разница'] = data['Цена'] - data['Среднее других заводов']

    # Построение диаграммы распределения разниц
    sns.displot(data['Разница'], kde=True)
    plt.xlabel('Разница цены Северстали со средним по остальным заводам')
    plt.title('Распределение разниц цен Северстали')

    pic3 = plot_to_base64(plt)

    compare_response.append({
        "pic": pic3,
    })
    
    plt.close(fig)










    # 4 часть

    # Загрузка данных
    data = pd.read_excel(file_path)

    # Группировка данных по заводам
    factories = ["Цена", "Цена evraz", "Цена mechel", "Цена mmk"]

    # Вычисление среднего значения по остальным заводам
    data['Среднее других заводов'] = data[factories[1:]].mean(axis=1)

    # Вычисление разницы для каждого значения Северстали
    data['Разница'] = data['Цена'] - data['Среднее других заводов']

    # Функция для построения графика топ самых больших разниц в цене
    def plot_top_price_differences(data, top_n=30):
        # Выбор топ N по разнице в цене
        top_differences = data.nlargest(top_n, 'Разница')
        
        # Создание фигуры и осей
        fig, ax = plt.subplots(figsize=(10, 12))
        
        # Построение горизонтальных столбцов для топ N разниц
        ax.barh(top_differences['Название'], top_differences['Разница'], color='#C26338', alpha=0.7)
        
        # Переворот оси Y
        ax.invert_yaxis()
        
        # Настройка осей и заголовка
        ax.set_xlabel('Разница в цене', fontsize=14)
        ax.set_ylabel('Наименование продукции', fontsize=14)
        ax.set_title(f'Топ {top_n} разниц в цене Северстали где цена ниже чем на других заводах', fontsize=16)
        
        # Изменение размера шрифта на осях
        ax.tick_params(axis='x', labelsize=12)
        ax.tick_params(axis='y', labelsize=12)  # Меньший размер шрифта для улучшения читаемости
        
        plt.tight_layout()

        pic4 = plot_to_base64(plt)

        plt.close(fig)

        return {
            "pic4": pic4,
            "top_differences": top_differences
        }

    # Вызов функции для построения графика и получения данных
    plot_top_price_differences_result = plot_top_price_differences(data)

    top_differences = plot_top_price_differences_result["top_differences"]
    pic4 = plot_top_price_differences_result["pic4"]

    # Создание текста отчета
    report = []


    report.append("Топ разниц в цене Северстали где цена ниже по сравнению с другими заводами:\n")
    for index, row in top_differences.iterrows():
        product_name = row['Название']
        difference = row['Разница']
        avg_other_factories = row['Среднее других заводов']
        report.append(f"Продукция: {product_name}")
        report.append(f"Разница в цене: {difference:.2f}")
        report.append(f"Средняя цена по другим заводам: {avg_other_factories:.2f}\n")

    # Объединение текста в один отчет
    report_text = "\n".join(report)

    openai_request_4 = {
        "model": "gpt-4o",
        "messages": [
            {"role": "system", "content": "Перепиши результаты финансового анализа, используя академическую стилистику и сложные экономические термины. Пиши подробно, не меняй цифры. Применяй рассуждения и аналитические выводы. Описание должно быть выполнено на уровне лучших экономических журналов. Пиши на русском языке. Оформляй с помошью макдауна."},
            {"role": "user", "content": report_text}
        ],
        "temperature": 0.3
    }

    response_4 = ask_ai(openai_request_4)

    compare_response.append({
        "text": response_4,
        "pic": pic4
    })















    # 5 часть

    # Загрузка данных
    data = pd.read_excel(file_path)

    # Группировка данных по заводам
    factories = ["Цена", "Цена evraz", "Цена mechel", "Цена mmk"]

    # Вычисление среднего значения по остальным заводам
    data['Среднее других заводов'] = data[factories[1:]].mean(axis=1)

    # Вычисление разницы между средней ценой других заводов и ценой Северстали
    data['Разница'] = data['Среднее других заводов'] - data['Цена']

    pic5 = None

    # Функция для построения графика топ самых больших разниц в цене
    def plot_top_price_differences(data, top_n=30):
        # Выбор топ N по разнице в цене
        top_differences = data.nlargest(top_n, 'Разница')
        
        # Создание фигуры и осей
        fig, ax = plt.subplots(figsize=(10, 12))
        
        # Построение горизонтальных столбцов для топ N разниц
        ax.barh(top_differences['Название'], top_differences['Разница'], color='#5d9ac9', alpha=0.7)
        
        # Переворот оси Y
        ax.invert_yaxis()
        
        # Настройка осей и заголовка
        ax.set_xlabel('Разница в цене', fontsize=14)
        ax.set_ylabel('Наименование продукции', fontsize=14)
        ax.set_title(f'Топ {top_n} разниц в цене Северстали где цена выше чем на других заводах', fontsize=16)
        
        # Изменение размера шрифта на осях
        ax.tick_params(axis='x', labelsize=12)
        ax.tick_params(axis='y', labelsize=12)  # Меньший размер шрифта для улучшения читаемости
        
        plt.tight_layout()

        pic5 = plot_to_base64(plt)

        plt.close(fig)

        return {
            "pic5": pic5,
            "top_differences": top_differences
        }

    # Вызов функции для построения графика и получения данных
    plot_top_price_differences_result_5 = plot_top_price_differences(data)

    top_differences = plot_top_price_differences_result_5["top_differences"]
    pic5 = plot_top_price_differences_result_5["pic5"]

    # Создание текста отчета
    report = []

    report.append("Топ разниц в цене Северстали где цена выше по сравнению с другими заводами:\n")
    for index, row in top_differences.iterrows():
        product_name = row['Название']
        difference = row['Разница']
        avg_other_factories = row['Среднее других заводов']
        report.append(f"Продукция: {product_name}")
        report.append(f"Разница в цене: {difference:.2f}")
        report.append(f"Средняя цена по другим заводам: {avg_other_factories:.2f}\n")

    # Объединение текста в один отчет
    report_text = "\n".join(report)

    openai_request_5 = {
        "model": "gpt-4o",
        "messages": [
            {"role": "system", "content": "Перепиши результаты анализа, используя академическую стилистику и сложные экономические термины. Пиши подробно, не меняй цифры. Применяй рассуждения и аналитические выводы. Описание должно быть выполнено на уровне лучших экономических журналов. Пиши на русском языке. Оформляй с помошью макдауна."},
            {"role": "user", "content": report_text}
        ],
        "temperature": 0.3
    }

    response_5 = ask_ai(openai_request_5)

    compare_response.append({
        "text": response_5,
        "pic": pic5
    })

    return compare_response
