# LumenBridge Finance

Fullstack MVP финансового сервиса LumenBridge Finance Ltd.

---

## Технологии

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, PostgreSQL
- **База данных:** PostgreSQL
- **Аутентификация:** JWT, OTP (mock)

---

## Точки входа

| Назначение | URL |
|---|---|
| **Главная страница** | http://localhost:3000 |
| **Личный кабинет** | http://localhost:3000/login |
| **Админ-панель** | http://localhost:3000/admin/login |

---

## Переменные окружения

Для работы приложения требуется **один** файл `.env.local` в корне проекта:

```env
# Единая строка подключения к PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/lumenbridge"

# JWT секрет для админ-панели (опционально)
# JWT_SECRET="your-secret-key"
```

**Важно:** Все API-роуты и подключения к БД используют **только одну** переменную `DATABASE_URL`. Никаких `POSTGRES_HOST`, `POSTGRES_USER`, `POSTGRES_PASSWORD` и т.д. — только одна строка подключения.

---

## Установка и запуск

### Способ 1: Без Docker (локально)

#### 1. Установка PostgreSQL
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### 2. Создание базы данных
```bash
sudo -u postgres psql -c "CREATE DATABASE lumenbridge;"
sudo -u postgres psql -c "CREATE USER intern WITH PASSWORD 'password123';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE lumenbridge TO intern;"
```

#### 3. Применение схемы
```bash
psql -d lumenbridge -U intern -h localhost << 'EOF'
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100),
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  term INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS loans (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  application_id INTEGER REFERENCES applications(id),
  amount DECIMAL(10,2) NOT NULL,
  term INTEGER NOT NULL,
  daily_rate DECIMAL(5,4) DEFAULT 0.008,
  payment_amount DECIMAL(10,2),
  total_amount DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'pending_sign',
  signed_at TIMESTAMP,
  signed_ip VARCHAR(45),
  signed_user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  closed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  loan_id INTEGER REFERENCES loans(id),
  due_date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  number INTEGER,
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payment_requests (
  id SERIAL PRIMARY KEY,
  loan_id INTEGER REFERENCES loans(id),
  user_id INTEGER REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  reference VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  login VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'operator',
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO admins (login, password, role) 
VALUES ('admin', 'admin123', 'admin') 
ON CONFLICT (login) DO NOTHING;

CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_loans_user_id ON loans(user_id);
CREATE INDEX idx_payments_loan_id ON payments(loan_id);
CREATE INDEX idx_payment_requests_loan_id ON payment_requests(loan_id);
EOF
```

#### 4. Запуск приложения
```bash
# Клонирование
git clone https://github.com/chatorsn/zaim_project.git
cd zaim_project

# Установка зависимостей
npm install

# Настройка .env.local
echo 'DATABASE_URL="postgresql://intern:password123@localhost:5432/lumenbridge"' > .env.local

# Запуск
npm run dev
```

---

### Способ 2: Через Docker (рекомендуемый)

#### 1. Сборка и запуск
```bash
# Клонирование
git clone https://github.com/chatorsn/zaim_project.git
cd zaim_project

# Сборка Docker-образа
docker build -t lumenbridge .

# Запуск контейнера с БД
docker-compose up -d
```

#### 2. Переменные окружения в Docker
В `docker-compose.yml` используются **те же переменные**, что и в `.env.local`:

```yaml
environment:
  DATABASE_URL: "postgresql://postgres:password@postgres:5432/lumenbridge"
```

**Важно:** В Docker-контейнере используется **единственная** переменная `DATABASE_URL`, а не отдельные `POSTGRES_HOST`, `POSTGRES_USER` и т.д.

#### 3. Применение схемы в Docker
```bash
# Копируем схему в контейнер
docker cp db/schema.sql lumenbridge-app:/tmp/

# Применяем
docker exec -it lumenbridge-app psql -U postgres -d lumenbridge -f /tmp/schema.sql
```

#### 4. Доступ к приложению
- **Сайт:** http://localhost:3000
- **Админка:** http://localhost:3000/admin/login

---

## Данные для входа

| Роль | Логин | Пароль | Доступ |
|---|---|---|---|
| **Администратор** | `admin` | `admin123` | Полный доступ ко всем разделам админки |
| **Оператор** | `operator` | `operator123` | Обработка заявок, займов и платежей |

**Пользователь (личный кабинет):**
- Вход по номеру телефона
- SMS-код выводится в терминал (mock-режим)
- Тестовый номер: `+1234567890`

---

## Как доставить пользователям (деплой)

### Локальный деплой (production)
```bash
npm run build
npm run start
```

### Docker-деплой
```bash
docker-compose up -d
```

### На сервере (VPS)
```bash
# 1. Установить Docker и Docker Compose
# 2. Склонировать репозиторий
git clone https://github.com/chatorsn/zaim_project.git
cd zaim_project

# 3. Запустить
docker-compose up -d

# 4. Настроить Nginx (прокси на порт 3000)
```

---

## Структура переменных окружения

| Переменная | Описание | Пример |
|---|---|---|
| `DATABASE_URL` | **Единственная** строка подключения к PostgreSQL | `postgresql://postgres:password@localhost:5432/lumenbridge` |
| `NODE_ENV` | Режим работы (опционально) | `production` |
| `JWT_SECRET` | Секрет для JWT (опционально) | `your-secret-key` |

---

## Mock-сценарии

- **SMS OTP:** Код выводится в терминал
- **Подписание займа:** Любой OTP-код `1234` работает
- **Платежи:** Ручное подтверждение администратором

## Ограничения или known issues

- OTP-код не отправляется реально (mock-режим)

- Платежи обрабатываются вручную администратором

- Нет реальной интеграции с банками или платёжными системами



