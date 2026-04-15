from __future__ import annotations

import argparse
import json
import sqlite3
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "storage" / "hogwarts.sqlite"
EXPORT_PATH = ROOT / "src" / "data" / "trial-bank.json"

CORE_SUBJECT_SLUGS = ["history-kz", "reading-literacy", "math-literacy"]
QUESTION_COUNTS_BY_SUBJECT = {
    "history-kz": 20,
    "reading-literacy": 10,
    "math-literacy": 10,
}
PROFILE_QUESTIONS_PER_SUBJECT = 40


PROFILES = [
    {
        "id": "profile-biology-geography",
        "name": "Биология География",
        "slug": "biology-geography",
        "description": "Профиль для естественно-научных и географических направлений.",
        "tagline": "Биология и география.",
        "studentsCount": 700,
        "successMetric": "Сильная основа по двум профильным предметам",
        "crestImage": "/art/faculty-biochem.svg",
        "subjects": ["biology", "geography"],
    },
    {
        "id": "profile-math-physics",
        "name": "Математика Физика",
        "slug": "math-physics",
        "description": "Профиль для инженерных, технических и точных направлений.",
        "tagline": "Математика и физика.",
        "studentsCount": 690,
        "successMetric": "Фокус на расчетах и физических моделях",
        "crestImage": "/art/faculty-infomat.svg",
        "subjects": ["math", "physics"],
    },
    {
        "id": "profile-chemistry-biology",
        "name": "Химия Биология",
        "slug": "chemistry-biology",
        "description": "Профиль для медицины, фармацевтики и естественных наук.",
        "tagline": "Химия и биология.",
        "studentsCount": 680,
        "successMetric": "Сильная подготовка к медицинским направлениям",
        "crestImage": "/art/faculty-biochem.svg",
        "subjects": ["chemistry", "biology"],
    },
    {
        "id": "profile-world-history-geography",
        "name": "Всемирная История География",
        "slug": "world-history-geography",
        "description": "Профиль для гуманитарных, международных и географических направлений.",
        "tagline": "Всемирная история и география.",
        "studentsCount": 670,
        "successMetric": "Фокус на гуманитарном анализе",
        "crestImage": "/art/faculty-geomat.svg",
        "subjects": ["world-history", "geography"],
    },
    {
        "id": "profile-foreign-language-world-history",
        "name": "Иностранный язык Всемирная история",
        "slug": "foreign-language-world-history",
        "description": "Профиль для языковых, международных и гуманитарных направлений.",
        "tagline": "Иностранный язык и всемирная история.",
        "studentsCount": 660,
        "successMetric": "Развитие языка и исторического контекста",
        "crestImage": "/art/faculty-lingua.svg",
        "subjects": ["foreign-language", "world-history"],
    },
    {
        "id": "profile-math-geography",
        "name": "Математика География",
        "slug": "math-geography",
        "description": "Профиль для аналитических, экономических и географических направлений.",
        "tagline": "Математика и география.",
        "studentsCount": 650,
        "successMetric": "Сильная аналитика и работа с данными",
        "crestImage": "/art/faculty-geomat.svg",
        "subjects": ["math", "geography"],
    },
    {
        "id": "profile-math-informatics",
        "name": "Математика Информатика",
        "slug": "math-informatics",
        "description": "Профиль для IT, алгоритмов и инженерного мышления.",
        "tagline": "Математика и информатика.",
        "studentsCount": 640,
        "successMetric": "Высокие результаты в IT-направлениях",
        "crestImage": "/art/faculty-infomat.svg",
        "subjects": ["math", "informatics"],
    },
]


SUBJECTS = [
    ("history-kz", "История Казахстана", "history-kz", "CORE"),
    ("reading-literacy", "Грамотность чтения", "reading-literacy", "CORE"),
    ("math-literacy", "Математическая грамотность", "math-literacy", "CORE"),
    ("math", "Математика", "math", "PROFILE"),
    ("informatics", "Информатика", "informatics", "PROFILE"),
    ("geography", "География", "geography", "PROFILE"),
    ("biology", "Биология", "biology", "PROFILE"),
    ("chemistry", "Химия", "chemistry", "PROFILE"),
    ("physics", "Физика", "physics", "PROFILE"),
    ("world-history", "Всемирная история", "world-history", "PROFILE"),
    ("foreign-language", "Иностранный язык", "foreign-language", "PROFILE"),
]


QUESTIONS = [
    {
        "id": "history-kz-1",
        "subject": "history-kz",
        "prompt": "В каком году была принята первая Конституция независимого Казахстана?",
        "imageUrl": None,
        "explanation": "Первая Конституция независимого Казахстана была принята в 1993 году.",
        "options": [("history-kz-1-a", "1993", 1), ("history-kz-1-b", "1991", 0), ("history-kz-1-c", "1995", 0), ("history-kz-1-d", "1998", 0)],
    },
    {
        "id": "history-kz-2",
        "subject": "history-kz",
        "prompt": "Как назывался свод правовых норм, связанный с именем Тауке хана?",
        "imageUrl": None,
        "explanation": "Жеты Жаргы связывают с реформами Тауке хана.",
        "options": [("history-kz-2-a", "Яса", 0), ("history-kz-2-b", "Жеты Жаргы", 1), ("history-kz-2-c", "Ескі жол", 0), ("history-kz-2-d", "Қасқа жол", 0)],
    },
    {
        "id": "reading-1",
        "subject": "reading-literacy",
        "prompt": "Если абзац начинается с тезиса и затем приводит два примера, для чего автор использует примеры?",
        "imageUrl": None,
        "explanation": "Примеры подтверждают и усиливают основную мысль.",
        "options": [("reading-1-a", "Чтобы создать новую тему", 0), ("reading-1-b", "Чтобы подтвердить основную мысль", 1), ("reading-1-c", "Чтобы запутать читателя", 0), ("reading-1-d", "Чтобы убрать аргументацию", 0)],
    },
    {
        "id": "reading-2",
        "subject": "reading-literacy",
        "prompt": "Что лучше всего помогает понять скрытый смысл публицистического текста?",
        "imageUrl": None,
        "explanation": "Скрытый смысл раскрывается через тему, аргументы и позицию автора.",
        "options": [("reading-2-a", "Только первое предложение", 0), ("reading-2-b", "Тема и позиция автора вместе", 1), ("reading-2-c", "Количество абзацев", 0), ("reading-2-d", "Последнее слово текста", 0)],
    },
    {
        "id": "math-lit-1",
        "subject": "math-literacy",
        "prompt": "Ученик решил 18 задач из 24. Какой процент заданий он выполнил?",
        "imageUrl": None,
        "explanation": "18 / 24 = 0.75, то есть 75%.",
        "options": [("math-lit-1-a", "65%", 0), ("math-lit-1-b", "70%", 0), ("math-lit-1-c", "75%", 1), ("math-lit-1-d", "80%", 0)],
    },
    {
        "id": "math-lit-2",
        "subject": "math-literacy",
        "prompt": "На пробный тест отвели 2 часа. Сколько это минут?",
        "imageUrl": None,
        "explanation": "2 часа равны 120 минутам.",
        "options": [("math-lit-2-a", "100", 0), ("math-lit-2-b", "110", 0), ("math-lit-2-c", "120", 1), ("math-lit-2-d", "140", 0)],
    },
    {
        "id": "math-1",
        "subject": "math",
        "prompt": "Найдите x, если 2x + 7 = 19.",
        "imageUrl": None,
        "explanation": "2x = 12, значит x = 6.",
        "options": [("math-1-a", "5", 0), ("math-1-b", "6", 1), ("math-1-c", "7", 0), ("math-1-d", "8", 0)],
    },
    {
        "id": "math-2",
        "subject": "math",
        "prompt": "Функция y = x² - 4x + 3 имеет вершину в точке:",
        "imageUrl": "/art/question-grid.svg",
        "explanation": "x = -b / 2a = 2, y = -1.",
        "options": [("math-2-a", "(2; -1)", 1), ("math-2-b", "(4; 3)", 0), ("math-2-c", "(2; 1)", 0), ("math-2-d", "(-2; -1)", 0)],
    },
    {
        "id": "informatics-1",
        "subject": "informatics",
        "prompt": "Какой тип цикла обычно используют, когда заранее известно количество повторений?",
        "imageUrl": None,
        "explanation": "Цикл for удобен, когда количество повторений известно заранее.",
        "options": [("informatics-1-a", "while", 0), ("informatics-1-b", "for", 1), ("informatics-1-c", "if", 0), ("informatics-1-d", "switch", 0)],
    },
    {
        "id": "informatics-2",
        "subject": "informatics",
        "prompt": "Что точнее всего описывает алгоритм?",
        "imageUrl": None,
        "explanation": "Алгоритм - это последовательность действий для решения задачи.",
        "options": [("informatics-2-a", "Набор случайных действий", 0), ("informatics-2-b", "Последовательность шагов для решения задачи", 1), ("informatics-2-c", "Только компьютерная программа", 0), ("informatics-2-d", "Любой текст на экране", 0)],
    },
    {
        "id": "geography-1",
        "subject": "geography",
        "prompt": "Как называется линия, соединяющая точки с одинаковой температурой?",
        "imageUrl": None,
        "explanation": "Изотерма соединяет точки с одинаковой температурой.",
        "options": [("geography-1-a", "Изобара", 0), ("geography-1-b", "Изотерма", 1), ("geography-1-c", "Изобата", 0), ("geography-1-d", "Горизонталь", 0)],
    },
    {
        "id": "geography-2",
        "subject": "geography",
        "prompt": "Какой фактор сильнее всего влияет на климат побережья?",
        "imageUrl": None,
        "explanation": "Близость океана смягчает климат побережья.",
        "options": [("geography-2-a", "Удаленность от экватора", 0), ("geography-2-b", "Близость океана", 1), ("geography-2-c", "Высота травы", 0), ("geography-2-d", "Количество дорог", 0)],
    },
    {
        "id": "biology-1",
        "subject": "biology",
        "prompt": "Какая органелла клетки отвечает за синтез белка?",
        "imageUrl": None,
        "explanation": "Рибосомы участвуют в синтезе белка.",
        "options": [("biology-1-a", "Лизосома", 0), ("biology-1-b", "Рибосома", 1), ("biology-1-c", "Вакуоль", 0), ("biology-1-d", "Центриоль", 0)],
    },
    {
        "id": "biology-2",
        "subject": "biology",
        "prompt": "Как называется процесс деления соматических клеток?",
        "imageUrl": None,
        "explanation": "Митоз обеспечивает деление соматических клеток.",
        "options": [("biology-2-a", "Мейоз", 0), ("biology-2-b", "Митоз", 1), ("biology-2-c", "Осмос", 0), ("biology-2-d", "Фотосинтез", 0)],
    },
    {
        "id": "chemistry-1",
        "subject": "chemistry",
        "prompt": "Какой химический элемент обозначается символом Na?",
        "imageUrl": None,
        "explanation": "Na - натрий.",
        "options": [("chemistry-1-a", "Азот", 0), ("chemistry-1-b", "Натрий", 1), ("chemistry-1-c", "Неон", 0), ("chemistry-1-d", "Никель", 0)],
    },
    {
        "id": "chemistry-2",
        "subject": "chemistry",
        "prompt": "Какой pH имеет нейтральная среда при 25°C?",
        "imageUrl": None,
        "explanation": "Нейтральная среда имеет pH 7.",
        "options": [("chemistry-2-a", "5", 0), ("chemistry-2-b", "6", 0), ("chemistry-2-c", "7", 1), ("chemistry-2-d", "8", 0)],
    },
    {
        "id": "physics-1",
        "subject": "physics",
        "prompt": "Какая величина измеряется в ньютонах?",
        "imageUrl": None,
        "explanation": "Ньютон является единицей измерения силы.",
        "options": [("physics-1-a", "Сила", 1), ("physics-1-b", "Масса", 0), ("physics-1-c", "Температура", 0), ("physics-1-d", "Время", 0)],
    },
    {
        "id": "physics-2",
        "subject": "physics",
        "prompt": "Как называется изменение положения тела с течением времени?",
        "imageUrl": None,
        "explanation": "Механическое движение - это изменение положения тела относительно других тел.",
        "options": [("physics-2-a", "Инерция", 0), ("physics-2-b", "Механическое движение", 1), ("physics-2-c", "Давление", 0), ("physics-2-d", "Плотность", 0)],
    },
    {
        "id": "world-history-1",
        "subject": "world-history",
        "prompt": "Какое событие традиционно считают началом Первой мировой войны?",
        "imageUrl": None,
        "explanation": "Сараевское убийство 1914 года стало триггером войны.",
        "options": [("world-history-1-a", "Парижская конференция", 0), ("world-history-1-b", "Сараевское убийство", 1), ("world-history-1-c", "Брестский мир", 0), ("world-history-1-d", "Берлинский конгресс", 0)],
    },
    {
        "id": "world-history-2",
        "subject": "world-history",
        "prompt": "С каким периодом связаны имена Леонардо да Винчи и Микеланджело?",
        "imageUrl": None,
        "explanation": "Оба мастера относятся к эпохе Возрождения.",
        "options": [("world-history-2-a", "Просвещение", 0), ("world-history-2-b", "Возрождение", 1), ("world-history-2-c", "Реформация", 0), ("world-history-2-d", "Индустриализация", 0)],
    },
    {
        "id": "foreign-language-1",
        "subject": "foreign-language",
        "prompt": "Choose the correct translation of the word 'environment'.",
        "imageUrl": None,
        "explanation": "'Environment' переводится как 'окружающая среда'.",
        "options": [("foreign-language-1-a", "Окружающая среда", 1), ("foreign-language-1-b", "Расписание", 0), ("foreign-language-1-c", "Путешествие", 0), ("foreign-language-1-d", "Образование", 0)],
    },
    {
        "id": "foreign-language-2",
        "subject": "foreign-language",
        "prompt": "Which sentence is grammatically correct?",
        "imageUrl": None,
        "explanation": "В Present Simple с he/she/it к глаголу добавляется окончание -s.",
        "options": [("foreign-language-2-a", "She read books every day.", 0), ("foreign-language-2-b", "She reads books every day.", 1), ("foreign-language-2-c", "She reading books every day.", 0), ("foreign-language-2-d", "She are reads books every day.", 0)],
    },
]


def required_question_count(subject_slug: str) -> int:
    return QUESTION_COUNTS_BY_SUBJECT.get(subject_slug, PROFILE_QUESTIONS_PER_SUBJECT)


def build_seed_questions() -> list[dict[str, Any]]:
    templates_by_subject: dict[str, list[dict[str, Any]]] = {}
    for question in QUESTIONS:
        templates_by_subject.setdefault(question["subject"], []).append(question)

    expanded_questions: list[dict[str, Any]] = []
    option_letters = ["a", "b", "c", "d"]
    for _, _, subject_slug, _ in SUBJECTS:
        templates = templates_by_subject.get(subject_slug, [])
        if not templates:
            continue

        for question_index in range(1, required_question_count(subject_slug) + 1):
            template = templates[(question_index - 1) % len(templates)]
            question_id = f"{subject_slug}-{question_index}"
            options = [
                (f"{question_id}-{option_letters[index]}", text, is_correct)
                for index, (_, text, is_correct) in enumerate(template["options"])
            ]
            expanded_questions.append(
                {
                    **template,
                    "id": question_id,
                    "options": options,
                }
            )

    return expanded_questions


def connect() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def create_schema(conn: sqlite3.Connection) -> None:
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS profiles (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            description TEXT NOT NULL,
            tagline TEXT,
            students_count INTEGER NOT NULL DEFAULT 0,
            success_metric TEXT,
            crest_image TEXT
        );

        CREATE TABLE IF NOT EXISTS subjects (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            kind TEXT NOT NULL CHECK(kind IN ('CORE', 'PROFILE'))
        );

        CREATE TABLE IF NOT EXISTS profile_subjects (
            profile_id TEXT NOT NULL,
            subject_slug TEXT NOT NULL,
            sort_order INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY (profile_id, subject_slug),
            FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
            FOREIGN KEY (subject_slug) REFERENCES subjects(slug) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS questions (
            id TEXT PRIMARY KEY,
            subject_slug TEXT NOT NULL,
            prompt TEXT NOT NULL,
            image_url TEXT,
            explanation TEXT,
            is_active INTEGER NOT NULL DEFAULT 1,
            sort_order INTEGER NOT NULL DEFAULT 0,
            FOREIGN KEY (subject_slug) REFERENCES subjects(slug) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS answer_options (
            id TEXT PRIMARY KEY,
            question_id TEXT NOT NULL,
            text TEXT NOT NULL,
            is_correct INTEGER NOT NULL DEFAULT 0,
            sort_order INTEGER NOT NULL DEFAULT 0,
            FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
        );
        """
    )


def seed(conn: sqlite3.Connection, reset: bool = False) -> None:
    if reset:
        conn.executescript(
            """
            DELETE FROM answer_options;
            DELETE FROM questions;
            DELETE FROM profile_subjects;
            DELETE FROM profiles;
            DELETE FROM subjects;
            """
        )

    for subject_id, name, slug, kind in SUBJECTS:
        conn.execute(
            "INSERT OR REPLACE INTO subjects (id, name, slug, kind) VALUES (?, ?, ?, ?)",
            (subject_id, name, slug, kind),
        )

    for profile in PROFILES:
        conn.execute(
            """
            INSERT OR REPLACE INTO profiles
            (id, name, slug, description, tagline, students_count, success_metric, crest_image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                profile["id"],
                profile["name"],
                profile["slug"],
                profile["description"],
                profile["tagline"],
                profile["studentsCount"],
                profile["successMetric"],
                profile["crestImage"],
            ),
        )
        for index, subject_slug in enumerate(profile["subjects"], start=1):
            conn.execute(
                """
                INSERT OR REPLACE INTO profile_subjects
                (profile_id, subject_slug, sort_order)
                VALUES (?, ?, ?)
                """,
                (profile["id"], subject_slug, index),
            )

    for index, question in enumerate(build_seed_questions(), start=1):
        conn.execute(
            """
            INSERT OR REPLACE INTO questions
            (id, subject_slug, prompt, image_url, explanation, is_active, sort_order)
            VALUES (?, ?, ?, ?, ?, 1, ?)
            """,
            (
                question["id"],
                question["subject"],
                question["prompt"],
                question["imageUrl"],
                question["explanation"],
                index,
            ),
        )
        for option_index, (option_id, text, is_correct) in enumerate(question["options"], start=1):
            conn.execute(
                """
                INSERT OR REPLACE INTO answer_options
                (id, question_id, text, is_correct, sort_order)
                VALUES (?, ?, ?, ?, ?)
                """,
                (option_id, question["id"], text, is_correct, option_index),
            )

    conn.commit()


def add_question(args: argparse.Namespace) -> None:
    with connect() as conn:
        create_schema(conn)
        question_id = args.id
        conn.execute(
            """
            INSERT INTO questions
            (id, subject_slug, prompt, image_url, explanation, is_active, sort_order)
            VALUES (?, ?, ?, ?, ?, 1, COALESCE((SELECT MAX(sort_order) + 1 FROM questions), 1))
            """,
            (question_id, args.subject, args.prompt, args.image_url, args.explanation),
        )
        for index, option in enumerate(args.option, start=1):
            option_id = f"{question_id}-{index}"
            conn.execute(
                """
                INSERT INTO answer_options (id, question_id, text, is_correct, sort_order)
                VALUES (?, ?, ?, ?, ?)
                """,
                (option_id, question_id, option, 1 if index == args.correct else 0, index),
            )
        conn.commit()
        export_json(conn)


def export_json(conn: sqlite3.Connection) -> None:
    profiles = []
    for profile in conn.execute("SELECT * FROM profiles ORDER BY students_count DESC").fetchall():
        subjects = [
            row["subject_slug"]
            for row in conn.execute(
                "SELECT subject_slug FROM profile_subjects WHERE profile_id = ? ORDER BY sort_order",
                (profile["id"],),
            ).fetchall()
        ]
        profiles.append(
            {
                "id": profile["id"],
                "name": profile["name"],
                "slug": profile["slug"],
                "description": profile["description"],
                "tagline": profile["tagline"],
                "studentsCount": profile["students_count"],
                "successMetric": profile["success_metric"],
                "crestImage": profile["crest_image"],
                "subjects": subjects,
            }
        )

    subjects = []
    for subject in conn.execute("SELECT * FROM subjects ORDER BY kind, name").fetchall():
        questions = []
        rows = conn.execute(
            """
            SELECT * FROM questions
            WHERE subject_slug = ? AND is_active = 1
            ORDER BY sort_order
            """,
            (subject["slug"],),
        ).fetchall()
        for question in rows:
            option_rows = conn.execute(
                "SELECT * FROM answer_options WHERE question_id = ? ORDER BY sort_order",
                (question["id"],),
            ).fetchall()
            correct = next((option["id"] for option in option_rows if option["is_correct"]), None)
            questions.append(
                {
                    "id": question["id"],
                    "prompt": question["prompt"],
                    "imageUrl": question["image_url"],
                    "explanation": question["explanation"],
                    "options": [{"id": option["id"], "text": option["text"]} for option in option_rows],
                    "correctOptionId": correct,
                }
            )
        subjects.append(
            {
                "id": subject["id"],
                "name": subject["name"],
                "slug": subject["slug"],
                "kind": subject["kind"],
                "questions": questions,
            }
        )

    EXPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    EXPORT_PATH.write_text(
        json.dumps({"profiles": profiles, "subjects": subjects}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def init_db(reset: bool) -> None:
    with connect() as conn:
        create_schema(conn)
        seed(conn, reset=reset)
        export_json(conn)


def main() -> None:
    parser = argparse.ArgumentParser(description="Local SQLite question bank for HOGWARTS.")
    subparsers = parser.add_subparsers(dest="command")

    init = subparsers.add_parser("init", help="Create and seed the local SQLite database.")
    init.add_argument("--reset", action="store_true", help="Clear existing demo data before seeding.")

    add = subparsers.add_parser("add-question", help="Add one question and export JSON for the app.")
    add.add_argument("--id", required=True)
    add.add_argument("--subject", required=True, help="Subject slug, for example math or history-kz.")
    add.add_argument("--prompt", required=True)
    add.add_argument("--image-url", default=None)
    add.add_argument("--explanation", default=None)
    add.add_argument("--option", action="append", required=True, help="Answer option text. Pass 4 times.")
    add.add_argument("--correct", type=int, required=True, help="1-based index of correct option.")

    export = subparsers.add_parser("export", help="Export SQLite data to src/data/trial-bank.json.")

    args = parser.parse_args()
    if args.command == "add-question":
        add_question(args)
    elif args.command == "export":
        with connect() as conn:
            create_schema(conn)
            export_json(conn)
    else:
        init_db(reset=getattr(args, "reset", False))


if __name__ == "__main__":
    main()
