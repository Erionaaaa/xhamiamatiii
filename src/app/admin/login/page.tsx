"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/site/Container";
import { MotionSection, MotionCard } from "@/components/site/motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Nuk u arrit të hyhet.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Gabim gjatë lidhjes me serverin.");
      setLoading(false);
    }
  }

  return (
    <main>
      <MotionSection>
        <Container className="flex min-h-[60vh] items-center justify-center py-12">
          <MotionCard className="w-full max-w-md rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <h1 className="text-2xl font-semibold tracking-tight">
              Paneli i administrimit
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Ky seksion është vetëm për administratën e xhamisë.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-1 text-sm">
                <label className="font-medium">Përdoruesi</label>
                <input
                  className="h-10 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="font-medium">Fjalëkalimi</label>
                <input
                  type="password"
                  className="h-10 w-full rounded-2xl border border-border/70 bg-background px-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error ? (
                <div className="text-xs text-red-500">{error}</div>
              ) : null}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-10 w-full items-center justify-center rounded-full bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Duke hyrë..." : "Hyr në panel"}
              </button>
            </form>
          </MotionCard>
        </Container>
      </MotionSection>
    </main>
  );
}

