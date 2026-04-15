"use client";

import { useMemo, useState } from "react";
import { Loader2, Send } from "lucide-react";

import { formatPhone } from "@/lib/utils";

type LeadFormProps = {
  profiles: Array<{ id: string; name: string }>;
};

const initialState = {
  name: "",
  phone: "",
  classLevel: "",
  entProfile: ""
};

export function LeadForm({ profiles }: LeadFormProps) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const isDisabled = useMemo(() => !form.name || !form.phone || !form.classLevel || !form.entProfile, [form]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setForm(initialState);
  }

  return (
    <form onSubmit={handleSubmit} className="gold-frame rounded-lg bg-white/5 p-6 shadow-glow sm:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Имя">
          <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm text-parchment outline-none transition focus:border-gold/40" placeholder="Как к тебе обращаться" />
        </Field>
        <Field label="Телефон">
          <input value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: formatPhone(event.target.value) }))} className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm text-parchment outline-none transition focus:border-gold/40" placeholder="+7 777 000 00 00" />
        </Field>
        <Field label="Класс">
          <input value={form.classLevel} onChange={(event) => setForm((current) => ({ ...current, classLevel: event.target.value }))} className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm text-parchment outline-none transition focus:border-gold/40" placeholder="10 класс / 11 класс / выпускник" />
        </Field>
        <Field label="Профиль ЕНТ">
          <select value={form.entProfile} onChange={(event) => setForm((current) => ({ ...current, entProfile: event.target.value }))} className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm text-parchment outline-none transition focus:border-gold/40">
            <option value="">Выбери профиль</option>
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.name}>
                {profile.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-mist/75">
          После отправки куратор свяжется с тобой и поможет выбрать следующий шаг.
        </p>
        <button type="submit" disabled={isDisabled || status === "loading"} className="inline-flex items-center justify-center rounded-md bg-parchment px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60">
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Отправляем
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Отправить заявку
            </>
          )}
        </button>
      </div>

      {status === "success" ? <div className="mt-4 rounded-md border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">Заявка принята. Мы сохранили данные и скоро свяжемся с тобой.</div> : null}
      {status === "error" ? <div className="mt-4 rounded-md border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">Не получилось отправить форму. Проверь поля и попробуй еще раз.</div> : null}
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2 text-sm text-mist/85">
      <span>{label}</span>
      {children}
    </label>
  );
}
