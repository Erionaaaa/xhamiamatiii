"use client";

import { useState } from "react";
import { QUOTES, type Quote } from "@/lib/quotes";

type Filter = "Të gjitha" | Quote["kind"];

const kindStyle: Record<
  Quote["kind"],
  { badge: string; border: string; arabic: string }
> = {
  Ajet: {
    badge:
      "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700",
    border: "border-emerald-200/70 dark:border-emerald-800/50",
    arabic: "text-emerald-900 dark:text-emerald-100",
  },
  Hadith: {
    badge:
      "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700",
    border: "border-amber-200/70 dark:border-amber-800/50",
    arabic: "text-amber-900 dark:text-amber-100",
  },
  Dua: {
    badge:
      "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-700",
    border: "border-sky-200/70 dark:border-sky-800/50",
    arabic: "text-sky-900 dark:text-sky-100",
  },
};

const counts: Record<Quote["kind"], number> = {
  Ajet: QUOTES.filter((q) => q.kind === "Ajet").length,
  Hadith: QUOTES.filter((q) => q.kind === "Hadith").length,
  Dua: QUOTES.filter((q) => q.kind === "Dua").length,
};

function CopyButton({ text, id }: { text: string; id: string }) {
  const [done, setDone] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      className="rounded-full p-1.5 text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:text-foreground"
      title="Kopjo"
      aria-label="Kopjo tekstin"
    >
      {done ? (
        <svg
          className="h-4 w-4 text-emerald-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      )}
    </button>
  );
}

export function AjeteClient() {
  const [filter, setFilter] = useState<Filter>("Të gjitha");

  // "Ajeti i Ditës" — ndryshon çdo ditë bazuar në datën e sotme
  const today = new Date();
  const dayOfYear =
    Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        86_400_000,
    ) - 1;
  const daily = QUOTES[((dayOfYear % QUOTES.length) + QUOTES.length) % QUOTES.length];

  const filtered =
    filter === "Të gjitha" ? QUOTES : QUOTES.filter((q) => q.kind === filter);

  const filters: { label: string; value: Filter }[] = [
    { label: `Të gjitha (${QUOTES.length})`, value: "Të gjitha" },
    { label: `Ajete (${counts.Ajet})`, value: "Ajet" },
    { label: `Hadithe (${counts.Hadith})`, value: "Hadith" },
    { label: `Dua (${counts.Dua})`, value: "Dua" },
  ];

  return (
    <>
      {/* ── Ajeti i Ditës ─────────────────────────────── */}
      <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 p-8 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
          ✦ Ajeti i Ditës
        </p>
        <p
          className="mt-5 text-right text-2xl leading-[2.2] text-white"
          dir="rtl"
          lang="ar"
        >
          {daily.ar}
        </p>
        <p className="mt-4 text-base leading-7 text-emerald-100">{daily.sq}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="rounded-full bg-emerald-600/50 px-3 py-1 text-xs font-medium text-emerald-200">
            {daily.ref}
          </span>
          <button
            onClick={() =>
              navigator.clipboard.writeText(`${daily.sq}\n— ${daily.ref}`)
            }
            className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white transition hover:bg-white/20"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Kopjo
          </button>
        </div>
      </div>

      {/* ── Filter pills ──────────────────────────────── */}
      <div className="mt-10 flex flex-wrap gap-2">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === value
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:border-foreground/50 hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Grid ─────────────────────────────────────── */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((q, idx) => {
          const s = kindStyle[q.kind];
          const copyText = `${q.sq}\n— ${q.ref}`;
          return (
            <div
              key={`${q.ref}-${idx}`}
              className={`group relative flex flex-col rounded-3xl border ${s.border} bg-background p-6 shadow-sm transition-transform duration-300 motion-safe:hover:-translate-y-1`}
            >
              {/* Header row */}
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${s.badge}`}
                >
                  {q.kind}
                </span>
                <CopyButton text={copyText} id={`${q.ref}-${idx}`} />
              </div>

              {/* Arabic text */}
              <p
                className={`mt-5 text-right text-xl leading-[2.2] ${s.arabic}`}
                dir="rtl"
                lang="ar"
              >
                {q.ar}
              </p>

              {/* Translation */}
              <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                {q.sq}
              </p>

              {/* Reference */}
              <p className="mt-4 text-xs font-medium text-muted-foreground/60">
                {q.ref}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
