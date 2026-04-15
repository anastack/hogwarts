"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqList({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = index === openIndex;

        return (
          <button
            key={item.question}
            type="button"
            onClick={() => setOpenIndex(isOpen ? -1 : index)}
            className="gold-frame w-full rounded-lg bg-white/5 p-5 text-left transition hover:bg-white/10"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-medium text-parchment">{item.question}</span>
              <ChevronDown className={cn("h-5 w-5 text-gold transition", isOpen && "rotate-180")} />
            </div>
            {isOpen ? <p className="mt-3 text-sm leading-6 text-mist/85">{item.answer}</p> : null}
          </button>
        );
      })}
    </div>
  );
}
