import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const trimmed = digits.startsWith("8") ? `7${digits.slice(1)}` : digits;

  if (!trimmed) {
    return "";
  }

  const parts = [
    trimmed.slice(0, 1),
    trimmed.slice(1, 4),
    trimmed.slice(4, 7),
    trimmed.slice(7, 9),
    trimmed.slice(9, 11)
  ].filter(Boolean);

  return `+${parts[0]} ${parts[1] ?? ""} ${parts[2] ?? ""} ${parts[3] ?? ""} ${parts[4] ?? ""}`.trim();
}

export function toPercent(value: number, total: number) {
  if (!total) {
    return 0;
  }

  return Math.round((value / total) * 100);
}
