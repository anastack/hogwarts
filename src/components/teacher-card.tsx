import Image from "next/image";
import { Camera } from "lucide-react";

type TeacherCardProps = {
  teacher: {
    id: string;
    name: string;
    subject: string;
    experienceYears: number;
    photoUrl: string;
    accent?: string | null;
    isPlaceholder?: boolean;
  };
};

export function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <article className="gold-frame w-[280px] shrink-0 overflow-hidden rounded-lg ornament-card shadow-glow sm:w-[320px]">
      <div className="relative h-72 overflow-hidden">
        <Image src={teacher.photoUrl} alt={teacher.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        {teacher.isPlaceholder ? (
          <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/35 px-3 py-2 text-xs uppercase tracking-[0.26em] text-gold">
            <Camera className="h-3.5 w-3.5" />
            Placeholder
          </div>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="text-xs uppercase tracking-[0.24em] text-gold">{teacher.subject}</div>
          <h3 className="mt-2 font-display text-3xl leading-none text-parchment">{teacher.name}</h3>
          <p className="mt-2 text-sm text-mist/85">{teacher.experienceYears} лет опыта</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 p-5">
        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.16em] text-mist/85">
          {teacher.subject}
        </span>
        <span className="text-sm text-parchment/90">{teacher.experienceYears}+ лет</span>
      </div>
    </article>
  );
}
