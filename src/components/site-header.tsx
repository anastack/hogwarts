"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Castle, ScrollText } from "lucide-react";

import { cn } from "@/lib/utils";

const navigation = [
  { href: "/#about", label: "О школе" },
  { href: "/#teachers", label: "Преподаватели" },
  { href: "/#results", label: "Результаты" },
  { href: "/trial", label: "Пробный ЕНТ" },
  { href: "/apply", label: "Заявка" }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="gold-frame flex h-11 w-11 items-center justify-center rounded-lg bg-white/5">
            <Castle className="h-5 w-5 text-gold" />
          </div>
          <div>
            <div className="magic-title text-3xl leading-none text-parchment">HOGWARTS</div>
            <div className="text-xs uppercase tracking-[0.2em] text-mist/70">ENT Academy</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-mist/85 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("transition hover:text-parchment", pathname === item.href && "text-parchment")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/trial"
            className="rounded-md border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-medium text-parchment transition hover:bg-gold/20"
          >
            Пройти ЕНТ
          </Link>
          <Link
            href="/apply"
            className="hidden rounded-md bg-parchment px-4 py-2 text-sm font-semibold text-ink transition hover:bg-white sm:inline-flex"
          >
            <ScrollText className="mr-2 h-4 w-4" />
            Хочу в Хогвартс
          </Link>
        </div>
      </div>
    </header>
  );
}
