# Используем официальное изображение Node.js
FROM node:18

# Установите рабочую директорию
WORKDIR /app

# Скопируйте package.json и package-lock.json в контейнер
COPY package*.json ./

# Установите зависимости
RUN npm install

# Скопируйте все файлы в контейнер
COPY . .

# Соберите приложение
RUN npm run build

# Экспонируйте порт
EXPOSE 3000

# Укажите команду для запуска приложения
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
