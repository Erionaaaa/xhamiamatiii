"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const body: Record<string, string> = {};
    fd.forEach((v, k) => { body[k] = String(v); });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrorMsg(json.error ?? "Ndodhi një gabim. Provo sërish.");
        setStatus("error");
        return;
      }
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch {
      setErrorMsg("Nuk u lidh me serverin. Kontrollo lidhjen dhe provo sërish.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-3xl border border-emerald-300/60 bg-emerald-50 p-8 text-center dark:bg-emerald-950/30">
        <div className="text-2xl">✅</div>
        <div className="mt-3 text-base font-semibold tracking-tight">
          Mesazhi u dërgua me sukses!
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Do t&apos;ju kontaktojmë sa më shpejt.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 inline-flex h-9 items-center justify-center rounded-full border border-border/70 px-4 text-xs font-semibold text-muted-foreground transition hover:bg-muted"
        >
          Dërgo mesazh tjetër
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="h-11 rounded-2xl border border-border/70 bg-background px-4 text-sm outline-none ring-0 transition focus:border-foreground/40"
          placeholder="Emri *"
          name="name"
          required
          disabled={status === "loading"}
        />
        <input
          className="h-11 rounded-2xl border border-border/70 bg-background px-4 text-sm outline-none ring-0 transition focus:border-foreground/40"
          placeholder="Email *"
          name="email"
          type="email"
          required
          disabled={status === "loading"}
        />
      </div>
      <input
        className="h-11 rounded-2xl border border-border/70 bg-background px-4 text-sm outline-none ring-0 transition focus:border-foreground/40"
        placeholder="Numri i telefonit (opsionale)"
        name="phone"
        type="tel"
        disabled={status === "loading"}
      />
      <textarea
        className="min-h-[140px] rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
        placeholder="Mesazhi *"
        name="message"
        required
        disabled={status === "loading"}
      />
      <input type="hidden" name="context" value="kontakt" />

      {status === "error" && (
        <div className="rounded-2xl border border-red-300/60 bg-red-50 px-4 py-3 text-xs text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Duke dërguar…" : "Dërgo mesazhin"}
      </button>
    </form>
  );
}
