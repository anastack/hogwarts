import Image from "next/image";

import { LeadForm } from "@/components/lead-form";
import { SectionShell } from "@/components/section-shell";
import { SiteHeader } from "@/components/site-header";
import { getHomePageData } from "@/lib/home-data";

export default async function ApplyPage() {
  const data = await getHomePageData();

  return (
    <main className="min-h-screen bg-ink text-parchment">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Image src="/art/hero-castle.svg" alt="Письмо о зачислении" fill className="object-cover" />
          <div className="absolute inset-0 bg-veil" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.28em] text-gold">Форма заявки</div>
            <h1 className="magic-title mt-4 text-6xl leading-none text-parchment sm:text-7xl">Хочу в Хогвартс</h1>
            <p className="mt-5 max-w-2xl font-serif text-3xl italic leading-9 text-mist/90">
              Мы свяжемся, уточним цель по баллам и поможем выбрать профиль подготовки.
            </p>
          </div>
        </div>
      </section>

      <SectionShell
        title="Подберем формат подготовки"
        description="Заполни короткую форму. Куратор поможет понять, с чего начать и какой темп подойдет."
      >
        <LeadForm profiles={data.profiles.map((profile) => ({ id: profile.id, name: profile.name }))} />
      </SectionShell>
    </main>
  );
}
