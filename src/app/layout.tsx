import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xhamia Mati 1 — Prishtinë",
  description:
    "Informacion për xhaminë, oraret e namazit, video sipas tematikave, Akademia, aktivitetet dhe donacionet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sq">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-dvh bg-background text-foreground">
          <Navbar />
          <div className="min-h-[calc(100dvh-4rem)]">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
