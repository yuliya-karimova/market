# Используем официальное изображение Python
FROM python:3.10-slim

# Установите рабочую директорию
WORKDIR /app

# Скопируйте файл requirements.txt в контейнер
COPY requirements.txt /app/

# Установите зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Скопируйте все файлы в контейнер
COPY . /app

# Укажите команду для запуска приложения
CMD ["python", "app.py"]
