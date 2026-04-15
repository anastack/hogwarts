import Link from "next/link";
import { BookOpenCheck, CalendarCheck, ScrollText, TimerReset, UsersRound } from "lucide-react";

import { landingCopy } from "@/lib/fallback-data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="constellation opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_20%,rgba(214,181,106,0.14),transparent_25%),radial-gradient(circle_at_25%_10%,rgba(115,48,76,0.35),transparent_24%)]" />
      <div className="dark-castle-bg" />

      <div className="relative mx-auto grid min-h-[88vh] max-w-7xl gap-10 px-4 pb-14 pt-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pt-20">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.28em] text-gold">
            <BookOpenCheck className="h-4 w-4" />
            Подготовка к ЕНТ
          </div>
          <h1 className="magic-title max-w-4xl text-balance text-6xl leading-[0.95] text-parchment sm:text-8xl">
            HOGWARTS
          </h1>
          <p className="mt-4 max-w-3xl font-serif text-3xl italic leading-tight text-gold/90">
            Работаем на результат: понятный план, дедлайны, пробные тесты и поддержка кураторов.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-mist/90">
            Готовим к ЕНТ по обязательным и профильным предметам. Помогаем понять слабые темы,
            держать темп и не оставаться один на один с подготовкой.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/trial" className="inline-flex items-center justify-center rounded-md bg-parchment px-6 py-3 text-base font-semibold text-ink transition hover:bg-white">
              <TimerReset className="mr-2 h-5 w-5" />
              Пройти пробный ЕНТ
            </Link>
            <Link href="/apply" className="inline-flex items-center justify-center rounded-md border border-gold/35 bg-gold/10 px-6 py-3 text-base font-semibold text-parchment transition hover:bg-gold/20">
              <CalendarCheck className="mr-2 h-5 w-5" />
              Хочу в Хогвартс
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {landingCopy.stats.map((stat) => (
              <div key={stat.label} className="gold-frame rounded-lg bg-black/35 p-5 backdrop-blur-sm">
                <div className="font-display text-4xl text-gold">{stat.value}</div>
                <div className="mt-2 text-sm leading-6 text-mist/85">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <div className="gold-frame ornament-card w-full rounded-lg p-6 shadow-glow sm:p-8">
            <div className="flex items-center gap-3 text-gold">
              <ScrollText className="h-5 w-5" />
              <span className="text-xs uppercase tracking-[0.28em]">Письмо о зачислении</span>
            </div>
            <div className="mt-6 rounded-lg border border-gold/25 bg-[#f1e3c1] p-6 text-[#1b233c]">
              <div className="text-sm uppercase tracking-[0.2em] text-[#7b1e3a]">HOGWARTS</div>
              <h2 className="magic-title mt-4 text-5xl leading-none">Работаем на результат</h2>
              <p className="mt-4 font-serif text-2xl italic text-[#7b1e3a]">
                Подготовка становится понятной, когда есть план и поддержка.
              </p>
              <div className="mt-6 space-y-3 text-base leading-7">
                <p>Пять предметов. Один пробный тест. Разбор результата по каждому блоку.</p>
                <p>Сначала диагностика. Затем маршрут. Затем регулярная работа до результата.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                <UsersRound className="h-6 w-6 text-gold" />
                <div className="mt-3 font-display text-2xl text-parchment">Кураторы</div>
                <p className="mt-2 text-sm leading-6 text-mist/85">
                  Объяснят, поддержат и помогут держать темп.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                <CalendarCheck className="h-6 w-6 text-gold" />
                <div className="mt-3 font-display text-2xl text-parchment">Дедлайны</div>
                <p className="mt-2 text-sm leading-6 text-mist/85">
                  Ты всегда знаешь, что делать дальше.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
