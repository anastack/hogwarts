"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Clock3, ScrollText } from "lucide-react";

type TrialProfile = {
  id: string;
  name: string;
  slug: string;
  description: string;
  tagline: string | null;
  studentsCount: number;
  successMetric: string | null;
  crestImage: string | null;
  subjects: Array<{ id: string; name: string; slug: string }>;
};

type TrialQuestion = {
  id: string;
  subjectId: string;
  subjectName: string;
  prompt: string;
  imageUrl: string | null;
  order: number;
  options: Array<{ id: string; text: string; imageUrl: string | null }>;
};

type TrialSession = {
  attemptId: string;
  durationSeconds: number;
  profile: {
    id: string;
    name: string;
    subjects: Array<{ id: string; name: string; slug: string }>;
  };
  questions: TrialQuestion[];
};

type TrialResult = {
  attemptId: string;
  score: number;
};

type SubjectQuestionGroup = {
  subjectId: string;
  subjectName: string;
  questions: Array<TrialQuestion & { globalIndex: number; subjectOrder: number }>;
};

export function TrialFlow({ profiles }: { profiles: TrialProfile[] }) {
  const [selectedProfile, setSelectedProfile] = useState<TrialProfile | null>(profiles[0] ?? null);
  const [session, setSession] = useState<TrialSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrialResult | null>(null);

  const currentQuestion = session?.questions[currentIndex];
  const groupedQuestions = useMemo(() => {
    if (!session) {
      return [];
    }
    return groupQuestionsBySubject(session.questions);
  }, [session]);
  const currentQuestionMeta = useMemo(() => {
    if (!currentQuestion) {
      return null;
    }
    return groupedQuestions
      .flatMap((group) => group.questions)
      .find((question) => question.id === currentQuestion.id) ?? null;
  }, [currentQuestion, groupedQuestions]);
  const progress = useMemo(() => {
    if (!session) {
      return 0;
    }
    return Math.round((Object.keys(answers).length / session.questions.length) * 100);
  }, [answers, session]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || !session) {
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((current) => (current === null ? current : current - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [session, timeLeft]);

  // Timer expiration should trigger a single submit for the current attempt.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (timeLeft === 0 && session) {
      void handleSubmit();
    }
  }, [timeLeft, session]);

  async function handleStart() {
    if (!selectedProfile) {
      return;
    }

    setLoading(true);
    const response = await fetch("/api/trial/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId: selectedProfile.id })
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      return;
    }

    setSession(data);
    setAnswers({});
    setCurrentIndex(0);
    setTimeLeft(data.durationSeconds);
    setResult(null);
  }

  async function handleSubmit() {
    if (!session || loading) {
      return;
    }

    setLoading(true);
    const response = await fetch("/api/trial/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        attemptId: session.attemptId,
        answers: session.questions.map((question) => ({
          questionId: question.id,
          selectedOptionId: answers[question.id] ?? null
        }))
      })
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      return;
    }
    setResult(data);
  }

  if (result) {
    return (
      <div className="gold-frame rounded-lg bg-white/5 p-8">
        <div className="text-xs uppercase tracking-[0.28em] text-gold">Тест завершен</div>
        <h2 className="mt-3 font-display text-4xl text-parchment">
          {result.score} из {session?.questions.length} верных ответов
        </h2>
        <p className="mt-4 max-w-2xl text-mist/85">
          Результат готов. Открой страницу с баллами и разбивкой по предметам.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={`/results/${result.attemptId}`} className="rounded-md bg-parchment px-5 py-3 text-center text-sm font-semibold text-ink transition hover:bg-white">
            Открыть результаты
          </Link>
          <button type="button" onClick={() => { setSession(null); setResult(null); setTimeLeft(null); }} className="rounded-md border border-gold/35 bg-gold/10 px-5 py-3 text-sm font-semibold text-parchment transition hover:bg-gold/20">
            Пройти еще раз
          </button>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="space-y-8">
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {profiles.map((profile) => {
            const isActive = selectedProfile?.id === profile.id;
            return (
              <button key={profile.id} type="button" onClick={() => setSelectedProfile(profile)} className={`gold-frame overflow-hidden rounded-lg bg-white/5 text-left transition ${isActive ? "ring-1 ring-gold/50" : "hover:bg-white/10"}`}>
                <div className="relative h-40">
                  {profile.crestImage ? <Image src={profile.crestImage} alt={profile.name} fill className="object-cover" /> : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="font-display text-2xl text-parchment">{profile.name}</div>
                  </div>
                </div>
                <div className="space-y-3 p-4">
                  <p className="text-sm leading-6 text-mist/85">{profile.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.subjects.map((subject) => (
                      <span key={subject.id} className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-mist/85">
                        {subject.name}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="gold-frame rounded-lg bg-white/5 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-gold">Шаг 1</div>
              <h2 className="mt-3 font-display text-3xl text-parchment">Выбери профиль подготовки</h2>
              <p className="mt-4 max-w-2xl text-mist/85">
                В тест автоматически войдут История Казахстана - 20 вопросов, Грамотность
                чтения - 10, Математическая грамотность - 10 и два профильных предмета по 40
                вопросов. Результат покажет общий балл, разбивку по предметам и точку роста.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-5">
              <div className="text-sm text-mist/75">Состав теста</div>
              <div className="mt-3 font-display text-2xl text-parchment">{selectedProfile?.name ?? "Профиль"}</div>
              <ul className="mt-4 space-y-2 text-sm text-mist/85">
                <li>История Казахстана - 20 вопросов</li>
                <li>Грамотность чтения - 10 вопросов</li>
                <li>Математическая грамотность - 10 вопросов</li>
                {selectedProfile?.subjects.map((subject) => <li key={subject.id}>{subject.name} - 40 вопросов</li>)}
              </ul>
              <button type="button" onClick={handleStart} disabled={!selectedProfile || loading} className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-parchment px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white disabled:opacity-70">
                {loading ? "Открываем тест..." : "Начать пробный ЕНТ"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
      <aside className="space-y-5">
        <div className="gold-frame rounded-lg bg-white/5 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.26em] text-gold">Шаг 2</div>
              <div className="mt-2 font-display text-2xl text-parchment">{session.profile.name}</div>
            </div>
            <div className="rounded-md border border-gold/25 bg-gold/10 px-3 py-2 text-sm text-parchment">
              <Clock3 className="mb-1 h-4 w-4 text-gold" />
              {formatRemaining(timeLeft ?? 0)}
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-gold transition" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-sm text-mist/75">{progress}% ответов отмечено</p>
        </div>

        <div className="gold-frame rounded-lg bg-white/5 p-4">
          <div className="text-sm font-medium text-parchment">Навигация по вопросам</div>
          <div className="mt-4 max-h-[62vh] space-y-5 overflow-y-auto pr-1">
            {groupedQuestions.map((group) => (
              <div key={group.subjectId}>
                <div className="mb-2 text-xs uppercase tracking-[0.18em] text-gold">{group.subjectName}</div>
                <div className="grid grid-cols-5 gap-2">
                  {group.questions.map((question) => {
                    const answered = Boolean(answers[question.id]);
                    const active = question.globalIndex === currentIndex;
                    return (
                      <button
                        key={question.id}
                        type="button"
                        onClick={() => setCurrentIndex(question.globalIndex)}
                        className={`rounded-md px-3 py-3 text-sm transition ${
                          active
                            ? answered
                              ? "bg-parchment text-ink"
                              : "bg-parchment text-ink ring-2 ring-red-400/80"
                            : answered
                              ? "border border-gold/30 bg-gold/10 text-parchment"
                              : "border border-red-400/45 bg-red-950/45 text-red-100 hover:bg-red-900/50"
                        }`}
                      >
                        {question.subjectOrder}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="gold-frame rounded-lg bg-white/5 p-6 sm:p-8">
        {currentQuestion ? (
          <>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-gold">
              <span>{currentQuestion.subjectName}</span>
              {currentQuestionMeta ? (
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-mist/70">
                  Вопрос {currentQuestionMeta.subjectOrder}
                </span>
              ) : null}
            </div>
            <h3 className="mt-4 text-2xl font-semibold leading-9 text-parchment">
              {currentQuestionMeta?.subjectOrder ?? currentQuestion.order}. {currentQuestion.prompt}
            </h3>

            {currentQuestion.imageUrl ? (
              <div className="relative mt-6 h-60 overflow-hidden rounded-lg">
                <Image src={currentQuestion.imageUrl} alt={currentQuestion.prompt} fill className="object-cover" />
              </div>
            ) : null}

            <div className="mt-6 space-y-3">
              {currentQuestion.options.map((option, index) => {
                const checked = answers[currentQuestion.id] === option.id;
                return (
                  <button key={option.id} type="button" onClick={() => setAnswers((current) => ({ ...current, [currentQuestion.id]: option.id }))} className={`gold-frame flex w-full items-start gap-4 rounded-lg p-4 text-left transition ${checked ? "bg-gold/15" : "bg-black/20 hover:bg-white/10"}`}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-sm text-gold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="pt-1 text-sm leading-6 text-parchment/95">{option.text}</div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button type="button" onClick={() => setCurrentIndex((current) => Math.max(0, current - 1))} className="rounded-md border border-white/10 bg-black/20 px-5 py-3 text-sm font-medium text-mist/85 transition hover:bg-white/10">
                Предыдущий вопрос
              </button>
              <div className="flex flex-col gap-3 sm:flex-row">
                {currentIndex < session.questions.length - 1 ? (
                  <button type="button" onClick={() => setCurrentIndex((current) => Math.min(session.questions.length - 1, current + 1))} className="rounded-md border border-gold/30 bg-gold/10 px-5 py-3 text-sm font-semibold text-parchment transition hover:bg-gold/20">
                    Следующий вопрос
                  </button>
                ) : null}
                <button type="button" onClick={handleSubmit} disabled={loading} className="rounded-md bg-parchment px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white disabled:opacity-70">
                  <ScrollText className="mr-2 inline h-4 w-4" />
                  Завершить тест
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function groupQuestionsBySubject(questions: TrialQuestion[]): SubjectQuestionGroup[] {
  const groups: SubjectQuestionGroup[] = [];

  questions.forEach((question, globalIndex) => {
    let group = groups.find((item) => item.subjectId === question.subjectId);
    if (!group) {
      group = {
        subjectId: question.subjectId,
        subjectName: question.subjectName,
        questions: []
      };
      groups.push(group);
    }

    group.questions.push({
      ...question,
      globalIndex,
      subjectOrder: group.questions.length + 1
    });
  });

  return groups;
}

function formatRemaining(value: number) {
  const minutes = Math.floor(value / 60).toString().padStart(2, "0");
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
