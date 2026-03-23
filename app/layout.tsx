import type { Metadata } from "next";
import { Great_Vibes, Lato } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  variable: "--font-fleur",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fiesta de Mary - 28 de marzo de 2026",
  description: "Ven a mi fiesta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${greatVibes.variable} ${lato.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
