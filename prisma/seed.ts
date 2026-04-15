import { PrismaClient, SubjectKind } from "@prisma/client";

const prisma = new PrismaClient();

const image = {
  castle:
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1400&q=80",
  owl:
    "https://images.unsplash.com/photo-1501706362039-c6e80948f11f?auto=format&fit=crop&w=900&q=80",
  candles:
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
  scroll:
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80",
  teacher1:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  teacher2:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  teacher3:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
  teacher4:
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80",
  teacher5:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
  certificate1:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
  certificate2:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  certificate3:
    "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
  math:
    "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1200&q=80"
};

async function main() {
  await prisma.testAttemptAnswer.deleteMany();
  await prisma.testAttempt.deleteMany();
  await prisma.answerOption.deleteMany();
  await prisma.question.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.profileSubject.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.subject.deleteMany();

  const subjects = await Promise.all([
    prisma.subject.create({ data: { name: "История Казахстана", slug: "history-kz", kind: SubjectKind.CORE, icon: "ScrollText", description: "Исторические периоды, события и личности." } }),
    prisma.subject.create({ data: { name: "Грамотность чтения", slug: "reading-literacy", kind: SubjectKind.CORE, icon: "BookOpen", description: "Логика текста, смысловые связи и аналитика." } }),
    prisma.subject.create({ data: { name: "Математическая грамотность", slug: "math-literacy", kind: SubjectKind.CORE, icon: "Sigma", description: "Прикладные задачи и базовая математика." } }),
    prisma.subject.create({ data: { name: "Математика", slug: "math", kind: SubjectKind.PROFILE, icon: "Calculator", description: "Алгебра, функции и геометрические методы." } }),
    prisma.subject.create({ data: { name: "Информатика", slug: "informatics", kind: SubjectKind.PROFILE, icon: "Cpu", description: "Алгоритмы, логика и основы ИКТ." } }),
    prisma.subject.create({ data: { name: "География", slug: "geography", kind: SubjectKind.PROFILE, icon: "Globe2", description: "Карты, процессы и экономическая география." } }),
    prisma.subject.create({ data: { name: "Биология", slug: "biology", kind: SubjectKind.PROFILE, icon: "Leaf", description: "Клетка, генетика и системы организмов." } }),
    prisma.subject.create({ data: { name: "Химия", slug: "chemistry", kind: SubjectKind.PROFILE, icon: "FlaskConical", description: "Реакции, вещества и расчетные задачи." } }),
    prisma.subject.create({ data: { name: "Физика", slug: "physics", kind: SubjectKind.PROFILE, icon: "Atom", description: "Законы движения, энергия и физические модели." } }),
    prisma.subject.create({ data: { name: "Всемирная история", slug: "world-history", kind: SubjectKind.PROFILE, icon: "Landmark", description: "Исторические процессы и международный контекст." } }),
    prisma.subject.create({ data: { name: "Иностранный язык", slug: "foreign-language", kind: SubjectKind.PROFILE, icon: "Languages", description: "Лексика, грамматика и понимание текста." } })
  ]);

  const subjectBySlug = Object.fromEntries(subjects.map((subject) => [subject.slug, subject]));

  const profiles = await Promise.all([
    prisma.profile.create({ data: { name: "Биология География", slug: "biology-geography", description: "Профиль для естественно-научных и географических направлений.", tagline: "Биология и география.", accent: "#9fb46c", crestImage: image.scroll, studentsCount: 700, successMetric: "Сильная база по двум профильным предметам" } }),
    prisma.profile.create({ data: { name: "Математика Физика", slug: "math-physics", description: "Профиль для инженерных, технических и точных направлений.", tagline: "Математика и физика.", accent: "#d6b56a", crestImage: image.owl, studentsCount: 690, successMetric: "Фокус на расчетах и физических моделях" } }),
    prisma.profile.create({ data: { name: "Химия Биология", slug: "chemistry-biology", description: "Профиль для медицины, фармацевтики и естественных наук.", tagline: "Химия и биология.", accent: "#93b76d", crestImage: image.scroll, studentsCount: 680, successMetric: "Сильная подготовка к медицинским направлениям" } }),
    prisma.profile.create({ data: { name: "Всемирная История География", slug: "world-history-geography", description: "Профиль для гуманитарных, международных и географических направлений.", tagline: "Всемирная история и география.", accent: "#b95b5d", crestImage: image.candles, studentsCount: 670, successMetric: "Фокус на гуманитарном анализе" } }),
    prisma.profile.create({ data: { name: "Иностранный язык Всемирная история", slug: "foreign-language-world-history", description: "Профиль для языковых, международных и гуманитарных направлений.", tagline: "Иностранный язык и всемирная история.", accent: "#8da4d9", crestImage: image.castle, studentsCount: 660, successMetric: "Развитие языка и исторического контекста" } }),
    prisma.profile.create({ data: { name: "Математика География", slug: "math-geography", description: "Профиль для аналитических, экономических и географических направлений.", tagline: "Математика и география.", accent: "#b95b5d", crestImage: image.candles, studentsCount: 650, successMetric: "Сильная аналитика и работа с данными" } }),
    prisma.profile.create({ data: { name: "Математика Информатика", slug: "math-informatics", description: "Профиль для IT, алгоритмов и инженерного мышления.", tagline: "Математика и информатика.", accent: "#d6b56a", crestImage: image.owl, studentsCount: 640, successMetric: "Высокие результаты в IT-направлениях" } })
  ]);

  const profileBySlug = Object.fromEntries(profiles.map((profile) => [profile.slug, profile]));

  await prisma.profileSubject.createMany({
    data: [
      { profileId: profileBySlug["biology-geography"].id, subjectId: subjectBySlug.biology.id, order: 1 },
      { profileId: profileBySlug["biology-geography"].id, subjectId: subjectBySlug.geography.id, order: 2 },
      { profileId: profileBySlug["math-physics"].id, subjectId: subjectBySlug.math.id, order: 1 },
      { profileId: profileBySlug["math-physics"].id, subjectId: subjectBySlug.physics.id, order: 2 },
      { profileId: profileBySlug["chemistry-biology"].id, subjectId: subjectBySlug.chemistry.id, order: 1 },
      { profileId: profileBySlug["chemistry-biology"].id, subjectId: subjectBySlug.biology.id, order: 2 },
      { profileId: profileBySlug["world-history-geography"].id, subjectId: subjectBySlug["world-history"].id, order: 1 },
      { profileId: profileBySlug["world-history-geography"].id, subjectId: subjectBySlug.geography.id, order: 2 },
      { profileId: profileBySlug["foreign-language-world-history"].id, subjectId: subjectBySlug["foreign-language"].id, order: 1 },
      { profileId: profileBySlug["foreign-language-world-history"].id, subjectId: subjectBySlug["world-history"].id, order: 2 },
      { profileId: profileBySlug["math-geography"].id, subjectId: subjectBySlug.math.id, order: 1 },
      { profileId: profileBySlug["math-geography"].id, subjectId: subjectBySlug.geography.id, order: 2 },
      { profileId: profileBySlug["math-informatics"].id, subjectId: subjectBySlug.math.id, order: 1 },
      { profileId: profileBySlug["math-informatics"].id, subjectId: subjectBySlug.informatics.id, order: 2 }
    ]
  });

  await prisma.teacher.createMany({
    data: [
      { name: "Айдана Ермекова", subject: "Математика", title: "Архитектор сильного балла", bio: "12 лет готовит к ЕНТ, разбирает сложные темы через ясную систему и регулярную аналитику.", achievements: ["Средний результат группы 36/45", "Автор 400+ разборов", "Грантовые кейсы KBTU и NU"], photoUrl: image.teacher1, accent: "#d6b56a" },
      { name: "Нуржан Сагындык", subject: "Информатика", title: "Наставник по логике и алгоритмам", bio: "Собирает мышление олимпиадника и переводит его в формат экзамена с понятной тактикой.", achievements: ["Ex-mentor IT bootcamp", "92% учеников подняли профильный блок", "Сильные спринты по задачам"], photoUrl: image.teacher2, accent: "#7da0e8" },
      { name: "Малика Турсынова", subject: "Биология", title: "Мастер системного запоминания", bio: "Строит биологию как карту взаимосвязей, чтобы темы удерживались без зубрежки.", achievements: ["Свыше 100 мед-грантов", "Система ассоциаций и конспектов", "Профильные мини-экзамены каждую неделю"], photoUrl: image.teacher5, accent: "#93b76d" },
      { name: "Аслан Омаров", subject: "История Казахстана", title: "Хранитель дат и причин", bio: "Учит видеть не набор фактов, а цепочки решений, реформ и последствий.", achievements: ["Автор исторических карт памяти", "Сильные короткие интенсивы", "Глубокий блок по ошибкам прошлых лет"], photoUrl: image.teacher3, accent: "#b95b5d" },
      { name: "Сабина Жумабаева", subject: "Грамотность чтения", title: "Наставник по смыслу и вниманию", bio: "Помогает быстро считывать структуру текста и не терять баллы на ловушках формулировок.", achievements: ["Методика скоростного анализа", "Рост точности ответов у большинства учеников", "Подготовка к сложным текстам"], photoUrl: image.teacher4, accent: "#d9a36c" }
    ]
  });

  await prisma.certificate.createMany({
    data: [
      { studentName: "Аружан М.", score: 128, university: "NU", program: "Computer Science", imageUrl: image.certificate1, highlight: "С 92 до 128 за 5 месяцев", profileId: profileBySlug["math-informatics"].id },
      { studentName: "Данияр К.", score: 121, university: "КазНМУ", program: "General Medicine", imageUrl: image.certificate2, highlight: "Закрыл профильный блок без провалов", profileId: profileBySlug["chemistry-biology"].id },
      { studentName: "Айгерим С.", score: 117, university: "ENU", program: "International Relations", imageUrl: image.certificate3, highlight: "Подняла чтение и историю на максимум", profileId: profileBySlug["foreign-language-world-history"].id }
    ]
  });

  const questionSets = [
    { subject: "history-kz", items: [
      { prompt: "В каком году была принята первая Конституция независимого Казахстана?", options: ["1993", "1991", "1995", "1998"], correctIndex: 0, explanation: "Первая Конституция независимого Казахстана была принята в 1993 году." },
      { prompt: "Как назывался традиционный свод норм кочевого права, связанный с Тауке ханом?", options: ["Яса", "Жеты Жаргы", "Касым ханның қасқа жолы", "Есім ханның ескі жолы"], correctIndex: 1, explanation: "Именно Жеты Жаргы связывают с реформами Тауке хана." }
    ]},
    { subject: "reading-literacy", items: [
      { prompt: "Если абзац начинается с тезиса, а затем приводит два примера, какова основная функция примеров?", options: ["Создать новый тезис", "Опровергнуть автора", "Подтвердить исходную мысль", "Увести читателя от темы"], correctIndex: 2, explanation: "Примеры усиливают и подтверждают заявленный тезис." },
      { prompt: "Что лучше всего отражает скрытый смысл публицистического текста?", options: ["Только первое предложение", "Тема и позиция автора вместе", "Количество абзацев", "Последнее слово текста"], correctIndex: 1, explanation: "Скрытый смысл раскрывается через тему, аргументы и авторскую позицию." }
    ]},
    { subject: "math-literacy", items: [
      { prompt: "Ученик решил 18 задач из 24. Какой процент заданий он выполнил?", options: ["65%", "70%", "75%", "80%"], correctIndex: 2, explanation: "18 / 24 = 0.75, то есть 75%." },
      { prompt: "На пробный тест отвели 2 часа. Сколько это минут?", options: ["100", "110", "120", "140"], correctIndex: 2, explanation: "2 часа = 120 минут." }
    ]},
    { subject: "math", items: [
      { prompt: "Найдите значение x, если 2x + 7 = 19.", options: ["5", "6", "7", "8"], correctIndex: 1, explanation: "2x = 12, значит x = 6." },
      { prompt: "Функция y = x^2 - 4x + 3 имеет вершину в точке:", imageUrl: image.math, options: ["(2; -1)", "(4; 3)", "(2; 1)", "(-2; -1)"], correctIndex: 0, explanation: "Координата вершины x = -b/2a = 2, y = -1." }
    ]},
    { subject: "informatics", items: [
      { prompt: "Какой тип цикла обычно используют, когда заранее известно количество повторений?", options: ["while", "for", "if", "switch"], correctIndex: 1, explanation: "Цикл for удобен, когда количество повторений известно." },
      { prompt: "Какой из вариантов описывает алгоритм?", options: ["Набор случайных действий", "Последовательность шагов для решения задачи", "Только компьютерная программа", "Любой текст на экране"], correctIndex: 1, explanation: "Алгоритм - это точная последовательность шагов для достижения результата." }
    ]},
    { subject: "geography", items: [
      { prompt: "Как называется условная линия, соединяющая точки с одинаковой температурой?", options: ["Изобара", "Изотерма", "Изобата", "Горизонталь"], correctIndex: 1, explanation: "Изотерма соединяет точки с одинаковой температурой." },
      { prompt: "Какой фактор сильнее всего влияет на климат побережья?", options: ["Удаленность от экватора", "Близость океана", "Высота травы", "Количество дорог"], correctIndex: 1, explanation: "Морское влияние заметно смягчает климат побережья." }
    ]},
    { subject: "biology", items: [
      { prompt: "Какая органелла клетки отвечает за синтез белка?", options: ["Лизосома", "Рибосома", "Вакуоль", "Центриоль"], correctIndex: 1, explanation: "Рибосомы участвуют в синтезе белка." },
      { prompt: "Как называется процесс деления соматических клеток?", options: ["Мейоз", "Митоз", "Фотосинтез", "Осмос"], correctIndex: 1, explanation: "Митоз обеспечивает деление соматических клеток." }
    ]},
    { subject: "chemistry", items: [
      { prompt: "Какой химический элемент обозначается символом Na?", options: ["Азот", "Натрий", "Неон", "Никель"], correctIndex: 1, explanation: "Na - натрий." },
      { prompt: "Какой pH имеет нейтральная среда при 25°C?", options: ["5", "6", "7", "8"], correctIndex: 2, explanation: "Нейтральная среда имеет pH 7." }
    ]},
    { subject: "physics", items: [
      { prompt: "Какая величина измеряется в ньютонах?", options: ["Сила", "Масса", "Температура", "Время"], correctIndex: 0, explanation: "Ньютон является единицей измерения силы." },
      { prompt: "Как называется изменение положения тела с течением времени?", options: ["Инерция", "Механическое движение", "Давление", "Плотность"], correctIndex: 1, explanation: "Механическое движение - это изменение положения тела относительно других тел." }
    ]},
    { subject: "world-history", items: [
      { prompt: "Какое событие традиционно считают началом Первой мировой войны?", options: ["Парижская конференция", "Сараевское убийство", "Брестский мир", "Берлинский конгресс"], correctIndex: 1, explanation: "Сараевское убийство 1914 года стало триггером начала войны." },
      { prompt: "Какой период в Европе связан с именами Леонардо да Винчи и Микеланджело?", options: ["Просвещение", "Возрождение", "Реформация", "Индустриализация"], correctIndex: 1, explanation: "Оба мастера относятся к эпохе Возрождения." }
    ]},
    { subject: "foreign-language", items: [
      { prompt: "Choose the correct translation of the word 'environment'.", options: ["Окружающая среда", "Расписание", "Путешествие", "Образование"], correctIndex: 0, explanation: "'Environment' переводится как 'окружающая среда'." },
      { prompt: "Which sentence is grammatically correct?", options: ["She read books every day.", "She reads books every day.", "She reading books every day.", "She are reads books every day."], correctIndex: 1, explanation: "В Present Simple с he/she/it к глаголу добавляется окончание -s." }
    ]}
  ];

  for (const set of questionSets) {
    const subject = subjectBySlug[set.subject];
    for (const [index, item] of set.items.entries()) {
      const question = await prisma.question.create({
        data: {
          prompt: item.prompt,
          imageUrl: "imageUrl" in item ? item.imageUrl : undefined,
          explanation: item.explanation,
          subjectId: subject.id,
          sortOrder: index + 1
        }
      });

      await prisma.answerOption.createMany({
        data: item.options.map((option, optionIndex) => ({
          questionId: question.id,
          text: option,
          isCorrect: optionIndex === item.correctIndex,
          sortOrder: optionIndex + 1
        }))
      });
    }
  }

  console.log("Seed complete");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


