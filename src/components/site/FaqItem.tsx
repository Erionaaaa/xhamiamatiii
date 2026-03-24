"use client";

import { useState } from "react";

export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/60 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-semibold leading-6">{q}</span>
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border/70 text-xs text-muted-foreground">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="pb-4 text-sm leading-7 text-muted-foreground">{a}</div>
      )}
    </div>
  );
}
