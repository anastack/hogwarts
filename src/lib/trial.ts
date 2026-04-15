import { randomUUID } from "crypto";

import trialBank from "@/data/trial-bank.json";
import { toPercent } from "@/lib/utils";
import { readJsonFile, writeJsonFile } from "@/lib/store";

const CORE_SUBJECT_SLUGS = ["history-kz", "reading-literacy", "math-literacy"];
const QUESTIONS_BY_SUBJECT: Record<string, number> = {
  "history-kz": 20,
  "reading-literacy": 10,
  "math-literacy": 10
};
const PROFILE_QUESTIONS_PER_SUBJECT = 40;
export const TRIAL_DURATION_SECONDS = 60 * 60 * 4;

type TrialBank = typeof trialBank;
type TrialProfile = TrialBank["profiles"][number];
type TrialSubject = TrialBank["subjects"][number];

type StoredAttempt = {
  id: string;
  profileId: string;
  profileName: string;
  durationSeconds: number;
  totalQuestions: number;
  status: "IN_PROGRESS" | "COMPLETED";
  correctCount: number;
  wrongCount: number;
  score: number;
  startedAt: string;
  completedAt: string | null;
  answers: Array<{
    questionId: string;
    subjectId: string;
    selectedOptionId: string | null;
    isCorrect: boolean;
  }>;
  subjectBreakdown: Array<{
    subjectName: string;
    total: number;
    correct: number;
    wrong: number;
  }>;
};

export async function getTrialBootstrap() {
  return trialBank.profiles.map((profile) => ({
    ...profile,
    subjects: profile.subjects.map((subjectSlug) => {
      const subject = getSubjectBySlug(subjectSlug);
      return {
        id: subject.id,
        name: subject.name,
        slug: subject.slug
      };
    })
  }));
}

export async function startTrial(profileId: string) {
  const profile = trialBank.profiles.find((item) => item.id === profileId);
  if (!profile) {
    throw new Error("PROFILE_NOT_FOUND");
  }

  const selectedSubjects = [
    ...CORE_SUBJECT_SLUGS.map(getSubjectBySlug),
    ...profile.subjects.map(getSubjectBySlug)
  ];

  const questions = selectedSubjects.flatMap((subject) =>
    subject.questions.slice(0, getQuestionCount(subject.slug)).map((question) => ({
      id: question.id,
      subjectId: subject.id,
      subjectName: subject.name,
      prompt: question.prompt,
      imageUrl: question.imageUrl,
      options: question.options
    }))
  );

  const attempts = await readJsonFile<StoredAttempt[]>("attempts.json", []);
  const attemptId = randomUUID();

  attempts.push({
    id: attemptId,
    profileId: profile.id,
    profileName: profile.name,
    durationSeconds: TRIAL_DURATION_SECONDS,
    totalQuestions: questions.length,
    status: "IN_PROGRESS",
    correctCount: 0,
    wrongCount: 0,
    score: 0,
    startedAt: new Date().toISOString(),
    completedAt: null,
    answers: [],
    subjectBreakdown: []
  });

  await writeJsonFile("attempts.json", attempts);

  return {
    attemptId,
    durationSeconds: TRIAL_DURATION_SECONDS,
    profile: {
      id: profile.id,
      name: profile.name,
      subjects: selectedSubjects.map((subject) => ({
        id: subject.id,
        name: subject.name,
        slug: subject.slug
      }))
    },
    questions: questions.map((question, index) => ({
      ...question,
      order: index + 1
    }))
  };
}

export async function submitTrial(payload: {
  attemptId: string;
  answers: Array<{ questionId: string; selectedOptionId: string | null }>;
}) {
  const attempts = await readJsonFile<StoredAttempt[]>("attempts.json", []);
  const attemptIndex = attempts.findIndex((item) => item.id === payload.attemptId);

  if (attemptIndex === -1) {
    throw new Error("ATTEMPT_NOT_FOUND");
  }

  const attempt = attempts[attemptIndex];
  const breakdownMap = new Map<string, { subjectName: string; total: number; correct: number; wrong: number }>();
  const storedAnswers = payload.answers.map((answer) => {
    const subject = getSubjectByQuestionId(answer.questionId);
    const question = subject.questions.find((item) => item.id === answer.questionId);

    if (!question) {
      throw new Error("QUESTION_NOT_FOUND");
    }

    const isCorrect = question.correctOptionId === answer.selectedOptionId;
    const breakdown = breakdownMap.get(subject.id) ?? {
      subjectName: subject.name,
      total: 0,
      correct: 0,
      wrong: 0
    };

    breakdown.total += 1;
    breakdown.correct += isCorrect ? 1 : 0;
    breakdown.wrong += isCorrect ? 0 : 1;
    breakdownMap.set(subject.id, breakdown);

    return {
      questionId: question.id,
      subjectId: subject.id,
      selectedOptionId: answer.selectedOptionId,
      isCorrect
    };
  });

  const correctCount = storedAnswers.filter((item) => item.isCorrect).length;
  const wrongCount = storedAnswers.length - correctCount;
  const subjectBreakdown = Array.from(breakdownMap.values());

  attempts[attemptIndex] = {
    ...attempt,
    status: "COMPLETED",
    correctCount,
    wrongCount,
    score: correctCount,
    completedAt: new Date().toISOString(),
    answers: storedAnswers,
    subjectBreakdown
  };

  await writeJsonFile("attempts.json", attempts);

  return serializeResult(attempts[attemptIndex]);
}

export async function getAttemptResult(attemptId: string) {
  const attempts = await readJsonFile<StoredAttempt[]>("attempts.json", []);
  const attempt = attempts.find((item) => item.id === attemptId && item.status === "COMPLETED");
  return attempt ? serializeResult(attempt) : null;
}

function serializeResult(attempt: StoredAttempt) {
  return {
    attemptId: attempt.id,
    profileName: attempt.profileName,
    score: attempt.score,
    correctCount: attempt.correctCount,
    wrongCount: attempt.wrongCount,
    totalQuestions: attempt.totalQuestions,
    percentage: toPercent(attempt.correctCount, attempt.totalQuestions),
    subjectBreakdown: attempt.subjectBreakdown,
    analysis: buildAnalysis(attempt.correctCount, attempt.totalQuestions, attempt.subjectBreakdown)
  };
}

function buildAnalysis(
  correctCount: number,
  totalQuestions: number,
  subjectBreakdown: Array<{ subjectName: string; correct: number; total: number }>
) {
  const percentage = toPercent(correctCount, totalQuestions);
  const weakest = [...subjectBreakdown].sort((left, right) => {
    const leftRate = left.total ? left.correct / left.total : 0;
    const rightRate = right.total ? right.correct / right.total : 0;
    return leftRate - rightRate;
  })[0];

  if (percentage >= 85) {
    return `Очень сильный старт. Держи темп и дочищай ${weakest?.subjectName ?? "слабые темы"}, чтобы выйти на максимум.`;
  }
  if (percentage >= 60) {
    return `Основа уже собрана. Следующий скачок даст работа над ${weakest?.subjectName ?? "профильным блоком"} и регулярные пробные тесты.`;
  }
  return `Запас для роста большой. Начни с ${weakest?.subjectName ?? "базовых предметов"} и коротких ежедневных спринтов на закрепление.`;
}

function getSubjectBySlug(slug: string): TrialSubject {
  const subject = trialBank.subjects.find((item) => item.slug === slug);
  if (!subject) {
    throw new Error(`SUBJECT_NOT_FOUND:${slug}`);
  }
  return subject;
}

function getQuestionCount(subjectSlug: string) {
  return QUESTIONS_BY_SUBJECT[subjectSlug] ?? PROFILE_QUESTIONS_PER_SUBJECT;
}

function getSubjectByQuestionId(questionId: string): TrialSubject {
  const subject = trialBank.subjects.find((item) =>
    item.questions.some((question) => question.id === questionId)
  );
  if (!subject) {
    throw new Error(`QUESTION_SUBJECT_NOT_FOUND:${questionId}`);
  }
  return subject;
}
