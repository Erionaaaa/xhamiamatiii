import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { SocialIcon } from "./SocialIcon";

const CONTACT_EMAIL = "info@xhamia.com";
const CONTACT_PHONE = process.env.CONTACT_PHONE ?? "043723623";

const QUICK_LINKS = [
  { href: "/orari", label: "Orari i namazit" },
  { href: "/video", label: "Video" },
  { href: "/akademia", label: "Akademia" },
  { href: "/aktivitete", label: "Aktivitetet" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/xhamiamati1",
    label: "Facebook",
    platform: "facebook",
    iconClass: "bg-[#1877F2]/15 text-[#1877F2]",
  },
  {
    href: "https://www.instagram.com/xhamiamati1/",
    label: "Instagram",
    platform: "instagram",
    iconClass: "bg-[#E4405F]/15 text-[#E4405F]",
  },
  {
    href: "https://www.youtube.com/@xhamiamati1",
    label: "YouTube",
    platform: "youtube",
    iconClass: "bg-[#FF0000]/15 text-[#FF0000]",
  },
  {
    href: "https://www.tiktok.com/@xhamiamati1",
    label: "TikTok",
    platform: "tiktok",
    iconClass: "bg-foreground/10 text-foreground",
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const phoneHref = `tel:${CONTACT_PHONE.replace(/\s+/g, "")}`;
  const emailHref = `mailto:${CONTACT_EMAIL}`;

  return (
    <footer className="border-t border-border/70 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0)_100%)]">
      <Container className="py-9">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-border/70 bg-background shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Logo Xhamia Mati 1"
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-tight">Xhamia Mati 1</h3>
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Qendra e xhematit
                </p>
              </div>
            </Link>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Platformë informative për xhematin: oraret e namazit, video,
              Akademia, aktivitetet dhe donacionet në një vend.
            </p>

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Rrjetet sociale
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-8 items-center justify-center gap-2 rounded-full border border-border/60 px-3 text-xs font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
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

          <div>
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
              </ul>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Kontakt & informata</h4>
            <div className="rounded-2xl border border-border/70 bg-muted/35 p-4">
              <div className="space-y-2 text-sm">
                <a className="block text-muted-foreground transition hover:text-foreground" href={phoneHref}>
                  Tel: {CONTACT_PHONE}
                </a>
                <a className="block break-all text-muted-foreground transition hover:text-foreground sm:break-normal" href={emailHref}>
                  Email: {CONTACT_EMAIL}
                </a>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
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

        <div className="mt-8 flex flex-col gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Xhamia Mati 1. Të gjitha të drejtat e rezervuara.</p>
          <p>Ndërtuar për informim dhe organizim të xhematit.</p>
        </div>
      </Container>
    </footer>
  );
}

