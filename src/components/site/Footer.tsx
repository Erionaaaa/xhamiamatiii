import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "info@xhamia.com";
const CONTACT_PHONE = process.env.CONTACT_PHONE ?? "043723623";

const QUICK_LINKS = [
  { href: "/orari", label: "Orari i namazit" },
  { href: "/video", label: "Video" },
  { href: "/akademia", label: "Akademia" },
  { href: "/aktivitete", label: "Aktivitetet" },
];

const ABOUT_LINKS = [
  { href: "/xhamia", label: "Rreth xhamisë" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/admin/login", label: "Admin" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const phoneHref = `tel:${CONTACT_PHONE.replace(/\s+/g, "")}`;
  const emailHref = `mailto:${CONTACT_EMAIL}`;

  return (
    <footer className="border-t border-border/70 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0)_100%)]">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
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
          </div>

          <nav className="space-y-3 lg:col-span-3" aria-label="Linqe të shpejta">
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

          <div className="space-y-4 lg:col-span-4">
            <h4 className="text-sm font-semibold">Kontakt & informata</h4>
            <div className="rounded-2xl border border-border/70 bg-muted/35 p-4">
              <div className="space-y-2 text-sm">
                <a className="block text-muted-foreground transition hover:text-foreground" href={phoneHref}>
                  Tel: {CONTACT_PHONE}
                </a>
                <a className="block text-muted-foreground transition hover:text-foreground" href={emailHref}>
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
                {ABOUT_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex h-9 items-center justify-center rounded-full border border-border/60 px-3 text-xs font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Xhamia Mati 1. Të gjitha të drejtat e rezervuara.</p>
          <p>Ndërtuar për informim dhe organizim të xhematit.</p>
        </div>
      </Container>
    </footer>
  );
}

