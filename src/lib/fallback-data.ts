export const homePageData = {
  teachers: [
    {
      id: "teacher-1",
      name: "Айдана Ермекова",
      subject: "Математика",
      experienceYears: 12,
      photoUrl: "/art/teacher-placeholder.svg",
      accent: "#d6b56a",
      isPlaceholder: true
    },
    {
      id: "teacher-2",
      name: "Нуржан Сагындык",
      subject: "Информатика",
      experienceYears: 8,
      photoUrl: "/art/teacher-placeholder.svg",
      accent: "#7298d8",
      isPlaceholder: true
    },
    {
      id: "teacher-3",
      name: "Малика Турсынова",
      subject: "Биология",
      experienceYears: 10,
      photoUrl: "/art/teacher-placeholder.svg",
      accent: "#98b86c",
      isPlaceholder: true
    },
    {
      id: "teacher-4",
      name: "Аслан Омаров",
      subject: "История Казахстана",
      experienceYears: 11,
      photoUrl: "/art/teacher-placeholder.svg",
      accent: "#b95b5d",
      isPlaceholder: true
    },
    {
      id: "teacher-5",
      name: "Сабина Жумабаева",
      subject: "Грамотность чтения",
      experienceYears: 7,
      photoUrl: "/art/teacher-placeholder.svg",
      accent: "#d9a36c",
      isPlaceholder: true
    },
    {
      id: "teacher-6",
      name: "Ерлан Касым",
      subject: "Физика",
      experienceYears: 9,
      photoUrl: "/art/teacher-placeholder.svg",
      accent: "#7da0e8",
      isPlaceholder: true
    },
    {
      id: "teacher-7",
      name: "Алия Нурбек",
      subject: "Английский язык",
      experienceYears: 6,
      photoUrl: "/art/teacher-placeholder.svg",
      accent: "#8da4d9",
      isPlaceholder: true
    }
  ],
  certificates: [
    {
      id: "certificate-1",
      studentName: "Аружан М.",
      score: 128,
      university: "NU",
      program: "Computer Science",
      imageUrl: "/art/certificate-aurora.svg",
      highlight: "С 92 до 128 за один сезон подготовки"
    },
    {
      id: "certificate-2",
      studentName: "Данияр К.",
      score: 121,
      university: "КазНМУ",
      program: "General Medicine",
      imageUrl: "/art/certificate-vanguard.svg",
      highlight: "Профильный блок стабильно выше цели"
    },
    {
      id: "certificate-3",
      studentName: "Айгерим С.",
      score: 117,
      university: "ENU",
      program: "International Relations",
      imageUrl: "/art/certificate-luna.svg",
      highlight: "Сильный рост в истории и чтении"
    }
  ],
  profiles: [
    {
      id: "profile-biology-geography",
      name: "Биология География",
      slug: "biology-geography",
      description: "Профиль для естественно-научных и географических направлений.",
      tagline: "Биология и география.",
      crestImage: "/art/faculty-biochem.svg",
      successMetric: "Сильная основа по двум профильным предметам",
      studentsCount: 700,
      subjects: [{ subject: { name: "Биология" } }, { subject: { name: "География" } }]
    },
    {
      id: "profile-math-physics",
      name: "Математика Физика",
      slug: "math-physics",
      description: "Профиль для инженерных, технических и точных направлений.",
      tagline: "Математика и физика.",
      crestImage: "/art/faculty-infomat.svg",
      successMetric: "Фокус на расчетах и физических моделях",
      studentsCount: 690,
      subjects: [{ subject: { name: "Математика" } }, { subject: { name: "Физика" } }]
    },
    {
      id: "profile-chemistry-biology",
      name: "Химия Биология",
      slug: "chemistry-biology",
      description: "Профиль для медицины, фармацевтики и естественных наук.",
      tagline: "Химия и биология.",
      crestImage: "/art/faculty-biochem.svg",
      successMetric: "Сильная подготовка к медицинским направлениям",
      studentsCount: 680,
      subjects: [{ subject: { name: "Химия" } }, { subject: { name: "Биология" } }]
    },
    {
      id: "profile-world-history-geography",
      name: "Всемирная История География",
      slug: "world-history-geography",
      description: "Профиль для гуманитарных, международных и географических направлений.",
      tagline: "Всемирная история и география.",
      crestImage: "/art/faculty-geomat.svg",
      successMetric: "Фокус на гуманитарном анализе",
      studentsCount: 670,
      subjects: [{ subject: { name: "Всемирная история" } }, { subject: { name: "География" } }]
    },
    {
      id: "profile-foreign-language-world-history",
      name: "Иностранный язык Всемирная история",
      slug: "foreign-language-world-history",
      description: "Профиль для языковых, международных и гуманитарных направлений.",
      tagline: "Иностранный язык и всемирная история.",
      crestImage: "/art/faculty-lingua.svg",
      successMetric: "Развитие языка и исторического контекста",
      studentsCount: 660,
      subjects: [{ subject: { name: "Иностранный язык" } }, { subject: { name: "Всемирная история" } }]
    },
    {
      id: "profile-math-geography",
      name: "Математика География",
      slug: "math-geography",
      description: "Профиль для аналитических, экономических и географических направлений.",
      tagline: "Математика и география.",
      crestImage: "/art/faculty-geomat.svg",
      successMetric: "Сильная аналитика и работа с данными",
      studentsCount: 650,
      subjects: [{ subject: { name: "Математика" } }, { subject: { name: "География" } }]
    },
    {
      id: "profile-math-informatics",
      name: "Математика Информатика",
      slug: "math-informatics",
      description: "Профиль для IT, алгоритмов и инженерного мышления.",
      tagline: "Математика и информатика.",
      crestImage: "/art/faculty-infomat.svg",
      successMetric: "Высокие результаты в IT-направлениях",
      studentsCount: 640,
      subjects: [{ subject: { name: "Математика" } }, { subject: { name: "Информатика" } }]
    }
  ]
};

export const landingCopy = {
  stats: [
    { value: "Бесплатное", label: "пробное ЕНТ" },
    { value: "Материалы", label: "для подготовки" },
    { value: "Помощь", label: "поддержка и разбор ошибок" }
  ],
  benefits: [
    {
      title: "Кураторы как друзья",
      text: "Объяснят, поддержат и помогут не бросить подготовку, когда становится сложно."
    },
    {
      title: "Платформа с дедлайнами",
      text: "Ты всегда знаешь, что делать сегодня, какой урок пройти и что сдать дальше."
    },
    {
      title: "Зачеты, разборы, мотивация",
      text: "За старания есть обратная связь, понятные задачи и регулярная проверка прогресса."
    },
    {
      title: "Атмосфера комьюнити",
      text: "Подготовка становится привычкой, а учеба перестает быть одиночеством."
    }
  ],
  faq: [
    {
      question: "Это только для сильных учеников?",
      answer: "Нет. Система подходит и тем, кто начинает с пробелами, и тем, кто идет за высоким грантом."
    },
    {
      question: "Можно ли сначала пройти тест, а потом выбрать профиль?",
      answer: "Да. Пробный ЕНТ как раз помогает понять, где ты сейчас и какой профиль стоит усилить."
    },
    {
      question: "Можно ли заниматься, если нет стабильного графика?",
      answer: "Да. Куратор помогает выстроить понятный темп и держать дедлайны без лишнего давления."
    },
    {
      question: "Что я увижу после пробного ЕНТ?",
      answer: "Общий результат, разбивку по предметам и темы, с которых лучше начать подготовку."
    }
  ],
  reviews: [
    {
      author: "Алихан, 11 класс",
      role: "Математика Информатика",
      text: "Здесь впервые появилось ощущение, что я не просто учусь, а прохожу через четко собранную систему подготовки."
    },
    {
      author: "Мадина, мама ученицы",
      role: "Химия Биология",
      text: "Нравится, что всё собрано красиво и понятно. Видно не только атмосферу, но и серьезный упор на результат."
    },
    {
      author: "Айгерим, выпускница",
      role: "Иностранный язык Всемирная история",
      text: "Понравилось, что есть план и поддержка. Учиться стало спокойнее, потому что понятно, что делать дальше."
    }
  ]
};
