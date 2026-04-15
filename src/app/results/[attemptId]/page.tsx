import Link from "next/link";

import { ResultsPanel } from "@/components/results-panel";
import { SectionShell } from "@/components/section-shell";
import { SiteHeader } from "@/components/site-header";
import { getAttemptResult } from "@/lib/trial";

export default async function ResultsPage({ params }: { params: { attemptId: string } }) {
  const result = await getAttemptResult(params.attemptId);

  return (
    <main className="min-h-screen bg-ink text-parchment">
      <SiteHeader />
      <SectionShell
        title="Страница результатов"
        description="Общий балл, разбивка по предметам и краткий вывод: куда направить усилия в первую очередь."
      >
        {result ? (
          <ResultsPanel result={result} />
        ) : (
          <div className="gold-frame rounded-lg ornament-card p-8">
            <h1 className="font-display text-4xl text-parchment">Результат пока недоступен</h1>
            <p className="mt-4 max-w-2xl text-mist/85">
              Возможно, эта попытка еще не была завершена. Вернись к пробному ЕНТ и пройди тест заново.
            </p>
            <Link href="/trial" className="mt-6 inline-flex rounded-md bg-parchment px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white">
              Перейти к пробному ЕНТ
            </Link>
          </div>
        )}
      </SectionShell>
    </main>
  );
}
