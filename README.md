# HOGWARTS

Демо-проект для онлайн-школы подготовки к ЕНТ: премиальный лендинг, форма заявки, пробный ЕНТ и страница результатов.

## Запуск

```bash
npm install
npm run dev
```

Открыть:

```text
http://localhost:3000
```

Если порт занят, Next поднимет соседний, например `http://localhost:3001` или `http://localhost:3002`.

## Локальная SQL-база вопросов

В проекте настроена SQLite-база:

```text
storage/hogwarts.sqlite
```

Она хранит:

- `profiles`
- `subjects`
- `profile_subjects`
- `questions`
- `answer_options`

Next.js читает экспортированный файл:

```text
src/data/trial-bank.json
```

Источник истины — SQLite. JSON нужен как быстрый слой для сайта.

## Команды базы

Создать базу заново и заполнить тестовыми вопросами:

```bash
npm run db:init
```

Экспортировать SQLite в JSON для сайта:

```bash
npm run db:export
```

Добавить вопрос:

```bash
npm run db:add-question -- --id math-3 --subject math --prompt "Сколько будет 5 + 7?" --option "10" --option "11" --option "12" --option "13" --correct 3 --explanation "5 + 7 = 12"
```

После добавления вопроса скрипт сам обновит `src/data/trial-bank.json`.

## Локальное хранилище демо

- Заявки сохраняются в `storage/leads.json`
- Попытки тестов сохраняются в `storage/attempts.json`
- Вопросы лежат в `storage/hogwarts.sqlite`

## Шрифты

Файл `Harry Potter.ttf` подключен как локальный шрифт и используется только на главных акцентных словах через CSS-класс `magic-title`, а не на всем сайте.
