import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "HOGWARTS",
  description: "Онлайн-школа подготовки к ЕНТ с пробными тестами, кураторами и понятным планом."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
