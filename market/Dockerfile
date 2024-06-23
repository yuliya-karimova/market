# Используем базовый образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем проект
RUN npm run build

# Устанавливаем веб-сервер для сервировки статических файлов
RUN npm install -g serve

# Открываем порт, который будет использоваться контейнером
EXPOSE 3000

# Запускаем веб-сервер для сервировки статических файлов из папки dist
CMD ["serve", "-s", "dist"]
