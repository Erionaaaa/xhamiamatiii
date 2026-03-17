"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { useState } from "react";

const nav = [
  { href: "/", label: "Ballina" },
  { href: "/xhamia", label: "Xhamia" },
  { href: "/orari", label: "Orari i namazit" },
  { href: "/video", label: "Video" },
  { href: "/ajete", label: "Ajete & Duate" },
  { href: "/akademia", label: "Akademia" },
  { href: "/aktivitete", label: "Aktivitete" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-border/70 bg-background">
            <Image
              src="/logo.png"
              alt="Xhamia Mati 1"
              fill
              sizes="36px"
              className="object-contain"
              priority
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">
              Xhamia Mati 1
            </div>
            <div className="text-xs text-muted-foreground">Prishtinë</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Hap menunë"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background text-foreground md:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span
                className={`block h-[2px] w-4 rounded-full bg-foreground transition-transform ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-4 rounded-full bg-foreground transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-[2px] w-4 rounded-full bg-foreground transition-transform ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-border/70 bg-background/95 pb-3 pt-2 md:hidden">
          <Container className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}

