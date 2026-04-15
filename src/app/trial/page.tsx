import Image from "next/image";

import { SectionShell } from "@/components/section-shell";
import { SiteHeader } from "@/components/site-header";
import { TrialFlow } from "@/components/trial-flow";
import { getTrialBootstrap } from "@/lib/trial";

export default async function TrialPage() {
  const profiles = await getTrialBootstrap();

  return (
    <main className="min-h-screen bg-ink text-parchment">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image src="/art/hero-castle.svg" alt="Зал испытаний" fill className="object-cover" />
          <div className="absolute inset-0 bg-veil" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.28em] text-gold">Пробный ЕНТ</div>
            <h1 className="magic-title mt-4 text-6xl leading-none text-parchment sm:text-7xl">
              Пробный ЕНТ перед экзаменом
            </h1>
            <p className="mt-5 max-w-2xl font-serif text-3xl italic leading-9 text-mist/90">
              Выбери профиль, пройди тест и посмотри результат по каждому предмету.
            </p>
          </div>
        </div>
      </section>

      <SectionShell
        title="Выбери профиль подготовки"
        description="В тест входят обязательные предметы и два профильных блока. После завершения ты увидишь общий балл и разбивку по предметам."
      >
        <TrialFlow profiles={profiles} />
      </SectionShell>
    </main>
  );
}
