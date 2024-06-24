import pandas as pd
import numpy as np
from catboost import CatBoostRegressor
from sklearn.metrics import r2_score, mean_absolute_error
import matplotlib.pyplot as plt

# Загрузка данных
data = pd.read_excel('updated_курс_доллара_золото_нефть_серебро_алюминий_металлопрокат_2014.xlsx')

# Преобразование даты в правильный формат
data['Дата'] = pd.to_datetime(data['Дата'], format='%m.%Y')

# Преобразование всех цен в рубли
data['Курс доллара'] = data['Курс доллара'].astype(float)
features = data.columns.drop(['Дата', 'Средняя цена металлопроката'])

# Создание лагов на один, два и три месяца назад
data.sort_values(by='Дата', inplace=True)
for feature in features:
    for lag in range(1, 7):
        data[f'{feature}_lag{lag}'] = data[feature].shift(lag)
for lag in range(1, 7):
    data[f'Средняя цена металлопроката_lag{lag}'] = data['Средняя цена металлопроката'].shift(lag)

# Удаление строк с NaN после создания лагов
data.dropna(inplace=True)

# Разделение на тренировочный и тестовый наборы
split_date = '2022-12-01'
train_data = data[data['Дата'] < split_date]
test_data = data[data['Дата'] >= split_date]

# Подготовка данных для моделирования
X_train = train_data.drop(columns=['Дата', 'Средняя цена металлопроката'])
y_train = train_data['Средняя цена металлопроката']
X_test = test_data.drop(columns=['Дата', 'Средняя цена металлопроката'])
y_test = test_data['Средняя цена металлопроката']

# Определение пространства гиперпараметров для перебора
param_grid = {
    'iterations': [100, 200, 500],
    'depth': [4, 6, 8],
    'learning_rate': [0.01, 0.05, 0.1],
    'l2_leaf_reg': [1, 3, 5, 7]
}

# Создание модели CatBoost
model = CatBoostRegressor(loss_function='RMSE', verbose=False)

# Перебор гиперпараметров
grid_search_result = model.grid_search(param_grid, 
                                       X=X_train, 
                                       y=y_train, 
                                       plot=False)

# Обучение модели с лучшими гиперпараметрами
best_params = grid_search_result['params']
best_model = CatBoostRegressor(**best_params, loss_function='RMSE', verbose=False)
best_model.fit(X_train, y_train, eval_set=(X_test, y_test), early_stopping_rounds=20, plot=False)

# Предсказания
y_train_pred = best_model.predict(X_train)
y_test_pred = best_model.predict(X_test)

# Оценка модели
r2_train = r2_score(y_train, y_train_pred)
r2_test = r2_score(y_test, y_test_pred)
mae_train = mean_absolute_error(y_train, y_train_pred)
mae_test = mean_absolute_error(y_test, y_test_pred)

metrics = {
    'R2 Train': r2_train,
    'R2 Test': r2_test,
    'MAE Train': mae_train,
    'MAE Test': mae_test
}

print(metrics)

# Визуализация результатов
plt.figure(figsize=(14, 7))
plt.plot(data['Дата'], data['Средняя цена металлопроката'], color='black', label='Настоящие данные')
plt.plot(train_data['Дата'], y_train_pred, color='blue', label='Предсказанные данные (тренировочные)')
plt.plot(test_data['Дата'], y_test_pred, color='red', label='Предсказанные данные (тестовые)')
plt.xlabel('Дата')
plt.ylabel('Средняя цена металлопроката')
plt.legend()
plt.show()

# Вычисление среднего месячного коэффициента прироста
data['Monthly Increase Rate'] = data['Средняя цена металлопроката'].pct_change().add(1).fillna(1)
average_monthly_increase_rate = data['Monthly Increase Rate'].mean()
print(f'Средний месячный коэффициент прироста: {average_monthly_increase_rate}')

# Корректировка предсказаний с учетом среднего месячного коэффициента прироста
def adjust_predictions_with_rate(predictions, rate):
    adjusted_predictions = []
    for i, pred in enumerate(predictions):
        adjusted_value = pred * (rate ** (i + 1))
        adjusted_predictions.append(adjusted_value)
    return np.array(adjusted_predictions)

y_test_pred_adjusted = adjust_predictions_with_rate(y_test_pred, average_monthly_increase_rate)

# Оценка модели после корректировки
r2_test_adjusted = r2_score(y_test, y_test_pred_adjusted)
mae_test_adjusted = mean_absolute_error(y_test, y_test_pred_adjusted)

metrics_adjusted = {
    'R2 Test Adjusted': r2_test_adjusted,
    'MAE Test Adjusted': mae_test_adjusted
}

print(metrics_adjusted)

# Визуализация скорректированных предсказаний
plt.figure(figsize=(14, 7))
plt.plot(data['Дата'], data['Средняя цена металлопроката'], color='black', label='Настоящие данные')
plt.plot(test_data['Дата'], y_test_pred, color='red', label='Предсказанные данные (тестовые)')
plt.plot(test_data['Дата'], y_test_pred_adjusted, color='green', label='Скорректированные предсказания (тестовые)')
plt.xlabel('Дата')
plt.ylabel('Средняя цена металлопроката')
plt.legend()
plt.show()
