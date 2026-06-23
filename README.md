Вот готовый текст README:

---

# LumenBridge Finance

Fullstack MVP финансового сервиса LumenBridge Finance Ltd.

## Технологии

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes, PostgreSQL
- **Архитектура:** Feature-Sliced Design (FSD)
- **База данных:** PostgreSQL
- **Аутентификация:** JWT, OTP (mock)

---

## Функциональность

### Публичная часть
- Лендинг с калькулятором аннуитетных платежей
- Форма подачи заявки на займ
- Страницы: "Как работает", "Для бизнеса", FAQ, Контакты

### Личный кабинет
- Вход по номеру телефона (SMS-код выводится в терминал)
- Просмотр заявок со статусами
- Просмотр активных и закрытых займов
- Детальная карточка займа с графиком платежей
- Подписание займа через OTP-код
- Создание заявки на оплату
- Уведомления о статусах

### Админ-панель
- Вход по логину/паролю
- Ролевая модель: **admin** (полный доступ) и **operator** (обработка заявок)
- Управление заявками (просмотр, одобрение, отклонение)
- Управление займами (просмотр, закрытие)
- Управление клиентами (просмотр)
- Подтверждение заявок на оплату
- Просмотр системных уведомлений

### Ключевые сценарии
1. **Подача заявки** → админ одобряет → создаётся займ (ожидает подписания)
2. **Подписание займа** через OTP → создаётся график платежей
3. **Пользователь** создаёт заявку на оплату → админ подтверждает
4. **Платеж** фиксируется → график обновляется → займ закрывается

---

## Установка и запуск

### 1. Клонирование репозитория
```bash
git clone https://github.com/chatorsn/zaim_project.git
cd zaim_project
```

### 2. Настройка базы данных PostgreSQL

#### Установка PostgreSQL (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Создание базы данных
```bash
sudo -u postgres psql -c "CREATE DATABASE lumenbridge;"
sudo -u postgres psql -c "CREATE USER intern WITH PASSWORD 'password123';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE lumenbridge TO intern;"
```

#### Создание схемы базы данных
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

### 3. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:
```bash
DATABASE_URL="postgresql://intern:password123@localhost:5432/lumenbridge"
```

### 4. Установка зависимостей и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка и запуск в production
npm run build
npm run start
```

Приложение будет доступно по адресу: **http://localhost:3000**

---

## Данные для входа

### Админ-панель
- **Администратор:** `admin` / `admin123` (полный доступ)
- **Оператор:** `operator` / `operator123` (только обработка заявок, займов и платежей)

### Пользователь (личный кабинет)
- Вход по номеру телефона с SMS-кодом
- **Важно:** В демо-режиме код выводится в терминал (mock OTP)
- Для тестирования используйте любой номер телефона, например: `+1234567890`

---

## Структура проекта (FSD)

```
app/
├── account/          # Личный кабинет пользователя
├── admin/            # Административная панель
├── api/              # API Routes (backend)
├── components/       # UI-компоненты
├── lib/              # Работа с базой данных
├── features/         # Бизнес-логика
└── shared/           # Переиспользуемые компоненты
```

---

## Калькулятор займа

Формула аннуитетного платежа:
```
A = P × (r × (1 + r)^n) / ((1 + r)^n − 1)
```

Где:
- `A` — размер платежа в день
- `P` — сумма займа
- `r` — процентная ставка в день (0.8% = 0.008)
- `n` — срок займа в днях

Общая сумма к возврату:
```
Total = A × n
```

---

## Mock-сценарии

В учебном проекте используются следующие mock-сценарии:

- **SMS OTP:** Код выводится в терминал (не отправляется реально)
- **Подписание займа:** Любой OTP-код `1234` работает
- **Платежи:** Ручное подтверждение администратором
- **График платежей:** Создается автоматически после подписания

---

## Лицензия

MIT
