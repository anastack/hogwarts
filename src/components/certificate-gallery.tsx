import { GraduationCap, ImageIcon } from "lucide-react";

type CertificateGalleryProps = {
  certificates: Array<{
    id: string;
    studentName: string;
    score: number;
    university: string;
    program: string;
    imageUrl: string;
    highlight: string;
  }>;
};

export function CertificateGallery({ certificates }: CertificateGalleryProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {certificates.map((certificate) => (
        <article key={certificate.id} className="gold-frame overflow-hidden rounded-lg ornament-card shadow-glow">
          <div className="flex h-56 items-center justify-center border-b border-gold/20 bg-black/25">
            <div className="flex h-28 w-28 items-center justify-center rounded-lg border border-dashed border-gold/40 bg-gold/10">
              <ImageIcon className="h-10 w-10 text-gold" />
            </div>
          </div>
          <div className="space-y-3 p-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-gold">
              <GraduationCap className="h-4 w-4" />
              Поступил
            </div>
            <h3 className="font-display text-3xl text-parchment">{certificate.studentName}</h3>
            <p className="font-serif text-xl italic text-mist/90">
              {certificate.university}
            </p>
            <p className="text-sm leading-6 text-parchment/90">{certificate.program}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
