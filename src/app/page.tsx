import Image from "next/image";
import Link from "next/link";
import {
  BookOpenCheck,
  Feather,
  Flame,
  GraduationCap,
  ScrollText,
  Telescope
} from "lucide-react";

import { CertificateGallery } from "@/components/certificate-gallery";
import { FaqList } from "@/components/faq-list";
import { HeroSection } from "@/components/hero-section";
import { SectionShell } from "@/components/section-shell";
import { SiteHeader } from "@/components/site-header";
import { TeacherCard } from "@/components/teacher-card";
import { landingCopy } from "@/lib/fallback-data";
import { getHomePageData } from "@/lib/home-data";

const reasons = [
  {
    icon: ScrollText,
    title: "Понятный маршрут",
    text: "Ученик знает, какие темы пройти, что повторить и когда сдавать проверку."
  },
  {
    icon: ScrollText,
    title: "Пробные ЕНТ",
    text: "Тест показывает общий результат и слабые места по каждому предмету."
  },
  {
    icon: Feather,
    title: "Поддержка",
    text: "Кураторы помогают держать темп и не выпадать из подготовки."
  },
  {
    icon: Telescope,
    title: "Цель по баллам",
    text: "Профиль и план подбираются под нужный результат и сроки."
  }
];

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <main className="bg-ink text-parchment">
      <SiteHeader />
      <HeroSection />

      <SectionShell
        id="about"
        eyebrow="О школе"
        title="Подготовка, где понятно что делать"
        description="Мы соединяем пробные ЕНТ, кураторов, дедлайны и разбор ошибок. Ученик видит план и двигается по нему шаг за шагом."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {landingCopy.benefits.map((item, index) => (
            <article
              key={item.title}
              className={
                index === 0
                  ? "hogwarts-letter relative min-h-[220px] overflow-hidden rounded-lg p-6 text-ink"
                  : "gold-frame min-h-[220px] rounded-lg bg-white/5 p-6"
              }
            >
              {index === 0 ? (
                <div className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-full bg-wine text-xs font-bold uppercase tracking-[0.18em] text-parchment shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
                  H
                </div>
              ) : null}
              <h3 className={`font-display text-3xl leading-none ${index === 0 ? "mt-8 max-w-[75%] text-ink" : "text-parchment"}`}>{item.title}</h3>
              <p className={`mt-4 text-sm leading-6 ${index === 0 ? "text-ink/80" : "text-mist/85"}`}>{item.text}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="teachers"
        eyebrow="Наставники"
        title="Преподаватели"
        description=""
        className="section-particles"
      >
        <div className="-mx-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex gap-6">
          {data.teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell
        id="results"
        eyebrow="Результаты"
        title="Баллы наших учеников"
        description="90% наших учеников поступили на грант"
      >
        <CertificateGallery certificates={data.certificates} />
      </SectionShell>

      <SectionShell
        eyebrow="Профили"
        title="Профили подготовки"
        description="Выбери направление"
      >
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {data.profiles.map((profile) => (
            <article key={profile.id} className="gold-frame overflow-hidden rounded-lg ornament-card">
              <div className="relative h-52">
                <Image src={profile.crestImage ?? "/art/hero-castle.svg"} alt={profile.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="font-display text-3xl text-parchment">{profile.name}</div>
                  <div className="mt-2 text-sm uppercase tracking-[0.18em] text-gold">{profile.successMetric}</div>
                </div>
              </div>
              <div className="space-y-4 p-5">
                <p className="text-sm leading-6 text-mist/85">{profile.description}</p>
                <div className="flex flex-wrap gap-2">
                  {profile.subjects.map((item) => (
                    <span key={`${profile.id}-${item.subject.name}`} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.16em] text-mist/85">
                      {item.subject.name}
                    </span>
                  ))}
                </div>
                <div className="font-serif text-xl italic text-parchment/90">{profile.studentsCount}+ учеников в потоке</div>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Почему мы"
        title="Что получает ученик"
        description="Четкий план, поддержку и регулярную проверку результата."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((reason) => (
            <article key={reason.title} className="gold-frame rounded-lg bg-white/5 p-5">
              <reason.icon className="h-10 w-10 text-gold" />
              <h3 className="mt-4 font-display text-3xl leading-none text-parchment">{reason.title}</h3>
              <p className="mt-3 text-sm leading-6 text-mist/85">{reason.text}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Отзывы"
        title="Отзывы"
        description="Что ученики и родители говорят о подготовке."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {landingCopy.reviews.map((review, index) => (
            <article key={review.author} className="gold-frame rounded-lg ornament-card p-6">
              <div className="mb-5 flex items-center gap-2 text-gold">
                {index === 0 ? <Flame className="h-5 w-5" /> : index === 1 ? <BookOpenCheck className="h-5 w-5" /> : <GraduationCap className="h-5 w-5" />}
                <span className="text-xs uppercase tracking-[0.24em]">{review.role}</span>
              </div>
              <p className="font-serif text-2xl italic leading-8 text-parchment/95">“{review.text}”</p>
              <div className="mt-6 text-sm text-mist/75">{review.author}</div>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="FAQ" title="Частые вопросы" description="Коротко о формате подготовки и пробном ЕНТ.">
        <FaqList items={landingCopy.faq} />
      </SectionShell>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="gold-frame overflow-hidden rounded-lg ornament-card">
            <div className="relative">
              <Image src="/art/hero-castle.svg" alt="Замок академии" width={1600} height={780} className="h-72 w-full object-cover sm:h-96" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/55 to-black/45" />
              <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-10">
                <div className="text-xs uppercase tracking-[0.28em] text-gold">Финальный призыв</div>
                <h2 className="magic-title mt-3 max-w-3xl text-6xl leading-none text-parchment sm:text-7xl">
                  Начни с пробного ЕНТ
                </h2>
                <p className="mt-4 max-w-2xl font-serif text-2xl italic leading-8 text-mist/90">
                  Пройди тест, посмотри результат по предметам и пойми, с чего начинать подготовку.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/trial" className="inline-flex items-center justify-center rounded-md bg-parchment px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white">
                    Пройти пробный ЕНТ
                  </Link>
                  <Link href="/apply" className="inline-flex items-center justify-center rounded-md border border-gold/35 bg-gold/10 px-6 py-3 text-sm font-semibold text-parchment transition hover:bg-gold/20">
                    Хочу в Хогвартс
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
