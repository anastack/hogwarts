import Link from "next/link";
import { ArrowRight, RotateCcw, ClipboardList } from "lucide-react";

type ResultPanelProps = {
  result: {
    attemptId: string;
    profileName: string;
    score: number;
    correctCount: number;
    wrongCount: number;
    totalQuestions: number;
    percentage: number;
    subjectBreakdown: Array<{
      subjectName: string;
      total: number;
      correct: number;
      wrong: number;
    }>;
    analysis: string;
  };
};

export function ResultsPanel({ result }: ResultPanelProps) {
  return (
    <div className="space-y-8">
      <div className="gold-frame rounded-lg ornament-card p-8 shadow-glow">
        <div className="text-xs uppercase tracking-[0.28em] text-gold">Результаты теста</div>
        <h1 className="mt-3 font-display text-4xl text-parchment sm:text-5xl">
          {result.profileName}: {result.score}/{result.totalQuestions}
        </h1>
        <p className="mt-4 max-w-3xl font-serif text-2xl italic leading-8 text-mist/90">{result.analysis}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <StatCard label="Общий процент" value={`${result.percentage}%`} />
          <StatCard label="Правильные ответы" value={String(result.correctCount)} />
          <StatCard label="Ошибки" value={String(result.wrongCount)} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.65fr_0.35fr]">
        <div className="gold-frame rounded-lg ornament-card p-6 sm:p-8">
          <div className="flex items-center gap-2 text-gold">
            <ClipboardList className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.26em]">Разбор по предметам</span>
          </div>
          <div className="mt-6 space-y-4">
            {result.subjectBreakdown.map((item) => (
              <div key={item.subjectName} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-medium text-parchment">{item.subjectName}</div>
                  <div className="text-sm text-mist/75">
                    {item.correct}/{item.total}
                  </div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-gold" style={{ width: `${Math.round((item.correct / item.total) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gold-frame rounded-lg ornament-card p-6">
          <div className="font-display text-2xl text-parchment">Следующий шаг</div>
          <p className="mt-4 text-sm leading-6 text-mist/85">
            Зафиксируй результат, усили слабые зоны и подключи наставника, чтобы рост пошел быстрее.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/trial" className="inline-flex items-center justify-center rounded-md border border-gold/35 bg-gold/10 px-5 py-3 text-sm font-semibold text-parchment transition hover:bg-gold/20">
              <RotateCcw className="mr-2 h-4 w-4" />
              Пройти ещё раз
            </Link>
            <Link href="/apply" className="inline-flex items-center justify-center rounded-md bg-parchment px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white">
              <ArrowRight className="mr-2 h-4 w-4" />
              Хочу в Хогвартс
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-5">
      <div className="text-sm text-mist/75">{label}</div>
      <div className="mt-2 font-display text-4xl text-gold">{value}</div>
    </div>
  );
}
