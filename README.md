# LumenBridge Finance

Fullstack MVP финансового сервиса LumenBridge Finance Ltd.

## Технологии

- Frontend: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- Backend: Next.js API Routes, PostgreSQL
- Архитектура: Feature-Sliced Design

## Функциональность

- Лендинг с калькулятором аннуитетных платежей
- Личный кабинет с займами, графиком платежей, уведомлениями
- Админ-панель с ролями (admin/operator)
- Подписание займов через OTP (код в терминал)
- Заявки на оплату от пользователей
- Полная локализация EN/RU

## Запуск

Установка зависимостей:
npm install

Запуск разработки:
npm run dev

Открыть http://localhost:3000

## Данные для входа

Админ-панель:
Администратор: admin / admin123
Оператор: operator / operator123

Пользователь: вход по номеру телефона с SMS-кодом (код выводится в терминал)

## Структура проекта

app/ - Страницы Next.js
widgets/ - Компоненты по FSD
shared/ui/ - Переиспользуемые компоненты
lib/ - Работа с базой данных
features/ - Бизнес-логика
