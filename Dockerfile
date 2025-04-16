# Используем официальный образ Node.js в качестве основы
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Компилируем TypeScript
RUN npm run build

# Пробрасываем порт
EXPOSE 3000

CMD ["npm", "run", "start:prod"]
