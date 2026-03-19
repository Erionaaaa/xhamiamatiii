import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Container } from "./Container";
import { SocialIcon } from "./SocialIcon";

const DEFAULT_FACEBOOK_URL = "https://www.facebook.com/xhamiamati1";
const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com/xhamiamati1/";
const DEFAULT_YOUTUBE_URL = "https://www.youtube.com/@xhamiamati1";
const DEFAULT_TIKTOK_URL = "https://www.tiktok.com/@xhamiamati1";

const QUICK_LINKS = [
  { href: "/orari", label: "Orari i namazit" },
  { href: "/video", label: "Video" },
  { href: "/akademia", label: "Akademia" },
  { href: "/aktivitete", label: "Aktivitetet" },
];

export async function Footer() {
  const info = await prisma.mosqueInfo.findFirst();
  const year = new Date().getFullYear();
  const mosqueName = info?.name ?? "Xhamia Mati 1";
  const mosqueCity = info?.city ?? "Prishtinë";
  const contactEmail = info?.email ?? process.env.CONTACT_EMAIL ?? "info@xhamia.com";
  const contactPhone = info?.phone ?? process.env.CONTACT_PHONE ?? "043723623";
  const contactAddress = info?.address?.trim();
  const phoneHref = `tel:${contactPhone.replace(/\s+/g, "")}`;
  const emailHref = `mailto:${contactEmail}`;
  const socialLinks = [
    {
      href: info?.facebookUrl || DEFAULT_FACEBOOK_URL,
      label: "Facebook",
      platform: "facebook",
      iconClass: "bg-[#1877F2]/15 text-[#1877F2]",
    },
    {
      href: info?.instagramUrl || DEFAULT_INSTAGRAM_URL,
      label: "Instagram",
      platform: "instagram",
      iconClass: "bg-[#E4405F]/15 text-[#E4405F]",
    },
    {
      href: info?.youtubeUrl || DEFAULT_YOUTUBE_URL,
      label: "YouTube",
      platform: "youtube",
      iconClass: "bg-[#FF0000]/15 text-[#FF0000]",
    },
    {
      href: DEFAULT_TIKTOK_URL,
      label: "TikTok",
      platform: "tiktok",
      iconClass: "bg-foreground/10 text-foreground",
    },
  ] as const;

  return (
    <footer className="border-t border-border/70 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0)_100%)]">
      <Container className="py-12 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.8fr)_minmax(0,1fr)]">
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-border/70 bg-background shadow-sm">
                  <Image
                    src="/logo.png"
                    alt={`Logo ${mosqueName}`}
                    fill
                    sizes="48px"
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-tight">{mosqueName}</h3>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {mosqueCity} • Qendra e xhematit
                  </p>
                </div>
              </Link>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                Informacion i përmbledhur për xhaminë: oraret, aktivitetet, Akademia dhe video.
              </p>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Rrjetet sociale
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {socialLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-border/60 bg-background px-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    >
                      <span
                        className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${item.iconClass}`}
                      >
                        <SocialIcon platform={item.platform} className="h-3 w-3" />
                      </span>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <nav className="space-y-3" aria-label="Linqe të shpejta">
                <h4 className="text-sm font-semibold">Linqe të shpejta</h4>
                <ul className="grid gap-2 text-sm text-muted-foreground">
                  {QUICK_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link className="transition hover:text-foreground" href={item.href}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link className="transition hover:text-foreground" href="/kontakt">
                      Kontakti
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="space-y-4 lg:justify-self-end">
              <h4 className="text-sm font-semibold">Kontakt</h4>
              <div className="w-full max-w-md rounded-3xl border border-border/70 bg-muted/20 p-5">
                <div className="space-y-2 text-sm">
                  <div className="grid gap-2 text-muted-foreground">
                    {contactAddress ? (
                      <div className="leading-6">
                        <span className="text-foreground/80">Adresa:</span>{" "}
                        <span className="break-words">{contactAddress}</span>
                      </div>
                    ) : null}
                    <a
                      className="block transition hover:text-foreground"
                      href={phoneHref}
                      aria-label={`Telefono ${contactPhone}`}
                    >
                      <span className="text-foreground/80">Tel:</span> {contactPhone}
                    </a>
                    <a
                      className="block break-all transition hover:text-foreground sm:break-normal"
                      href={emailHref}
                      aria-label={`Dergo email ne ${contactEmail}`}
                    >
                      <span className="text-foreground/80">Email:</span> {contactEmail}
                    </a>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href="/kontakt"
                    className="inline-flex h-9 items-center justify-center rounded-full border border-border/70 bg-background px-4 text-xs font-semibold text-foreground transition hover:bg-muted"
                  >
                    Na kontakto
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-2 border-t border-border/60 pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {mosqueName}. Të gjitha të drejtat e rezervuara.</p>
          <p>{mosqueCity} • Platformë informative për xhematin.</p>
        </div>
      </Container>
    </footer>
  );
}

