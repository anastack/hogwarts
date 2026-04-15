import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

export function SectionShell({ id, eyebrow, title, description, className, children }: SectionShellProps) {
  return (
    <section id={id} className={cn("relative py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow ? <div className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</div> : null}
          <h2 className="font-display text-3xl text-parchment sm:text-4xl">{title}</h2>
          {description ? <p className="mt-4 text-base leading-7 text-mist/85 sm:text-lg">{description}</p> : null}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
