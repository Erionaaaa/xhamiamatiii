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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  // Fallback që të mos prishet build. Zëvendësoje me domenin tënd.
  "https://example.com";

let metadataBase: URL;
try {
  metadataBase = new URL(siteUrl);
} catch {
  metadataBase = new URL("https://example.com");
}

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Xhamia Mati 1 — Prishtinë",
    template: "%s | Xhamia Mati 1",
  },
  description:
    "Informacion për xhaminë, oraret e namazit, video sipas tematikave, Akademia, aktivitetet dhe donacionet.",
  keywords: [
    "Xhamia Mati 1",
    "xhamia prishtine",
    "orari i namazit",
    "akademia islame",
    "video islame",
    "aktivitete xhamie",
  ],
  authors: [{ name: "Xhamia Mati 1" }],
  creator: "Xhamia Mati 1",
  publisher: "Xhamia Mati 1",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "sq_XK",
    siteName: "Xhamia Mati 1",
    url: "/",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Xhamia Mati 1",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
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
