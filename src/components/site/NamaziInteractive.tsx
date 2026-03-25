"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { MotionCard } from "@/components/site/motion";
import type {
  GuideKind,
  GuideStep,
  PrayerKey,
} from "@/lib/namazi";
import { buildGuideSteps, getPrayerByKey, PRAYERS } from "@/lib/namazi";

function DoveIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M21 3c-2.6.6-4.3 2.2-5.1 4.2-.7-.2-1.5-.3-2.3-.3-3.4 0-6.1 2.5-6.1 5.6 0 3.1 2.7 5.6 6.1 5.6 2 0 3.8-.9 4.9-2.2.2 1.5.9 2.8 2.6 3.3-.7-1.6-.6-3.3-.1-4.9.9-2.9.7-4.9-.9-6.4 0-1.1.1-2.3.9-3.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M3.4 18.6c1.6-3.2 4.2-5.3 8.1-6.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M3.7 15.2c.3 1.4 1.2 2.6 2.7 3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="h-[calc(100vh-2rem)] w-full max-w-[1200px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function GuideNavigator({
  title,
  steps,
  onBack,
}: {
  title: string;
  steps: GuideStep[];
  onBack: () => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  const active = steps[activeIdx] ?? steps[0];
  const progress = steps.length <= 1 ? 0 : activeIdx / (steps.length - 1);

  useEffect(() => {
    // Kur ndryshon modaliteti (p.sh. Farz -> Sunnet), rikthehemi në hapin e parë.
    setActiveIdx(0);
  }, [steps]);

  useEffect(() => {
    if (!steps.length) return;
    if (activeIdx > steps.length - 1) {
      setActiveIdx(steps.length - 1);
    }
  }, [activeIdx, steps.length]);

  useEffect(() => {
    // Kur ndryshon hapi, sigurojmë që lista të mos “shkojë” jashtë fokusit.
    stepRefs.current[activeIdx]?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [activeIdx]);

  return (
    <div className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-zinc-950/70 p-4 text-white shadow-[0_22px_70px_rgba(0,0,0,0.6)] backdrop-blur">
      <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Udhëzues me hapa
          </div>
          <h2 className="mt-2 truncate text-xl font-semibold">{title}</h2>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
        >
          ← Mbrapa
        </button>
      </div>

      <div className="mt-4 grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="min-h-0 overflow-auto pr-1">
          <div className="text-sm font-semibold text-white/70">Hapat</div>
          <div className="mt-3 space-y-2">
            {steps.map((s, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div
                  key={s.id}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className={[
                    "rounded-2xl border px-4 py-3 transition",
                    isActive
                      ? "border-white/35 bg-white/12"
                      : "border-white/10 bg-white/3 hover:bg-white/6",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className="block w-full text-left"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                      Hapi {idx + 1} / {steps.length}
                    </div>
                    <div
                      className={[
                        "mt-1 line-clamp-2 text-sm font-semibold",
                        isActive ? "text-white" : "text-white/85",
                      ].join(" ")}
                    >
                      {s.title}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-4">
          <MotionCard className="min-h-0 flex-1 rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white/90">
                  <DoveIcon className="h-7 w-7" />
                </div>

                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    {activeIdx + 1} / {steps.length}
                  </div>
                  <div className="mt-2 text-base font-semibold leading-6">
                    {active?.title ?? ""}
                  </div>
                  <div className="mt-3 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-7 text-white/85">
                    {active?.instruction ?? ""}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-white/70"
                    style={{ width: `${progress * 100}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1 text-white transition-all duration-500"
                    style={{
                      left: `${progress * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <DoveIcon className="h-5 w-5 animate-bounce" />
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3 text-xs text-white/70">
                  <div>Sa i përket: {title}</div>
                  <div>{Math.round(progress * 100)}%</div>
                </div>
              </div>
            </div>
          </MotionCard>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              disabled={activeIdx <= 0}
              onClick={() => setActiveIdx((v) => Math.max(0, v - 1))}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition disabled:opacity-50"
            >
              ← Prev
            </button>

            <button
              type="button"
              disabled={activeIdx >= steps.length - 1}
              onClick={() =>
                setActiveIdx((v) => Math.min(steps.length - 1, v + 1))
              }
              className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NamaziInteractive({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const [open, setOpen] = useState(false);
  const [selectedPrayerKey, setSelectedPrayerKey] =
    useState<PrayerKey>("dhuhr");
  const [guideMode, setGuideMode] = useState<GuideKind | "komplet">("farz");
  const [view, setView] = useState<"overview" | "guide">("overview");

  const isCompact = variant === "compact";

  const prayer = useMemo(
    () => getPrayerByKey(selectedPrayerKey),
    [selectedPrayerKey],
  );

  const steps = useMemo(() => {
    if (guideMode === "komplet") {
      const farzSteps = buildGuideSteps({
        prayerLabel: prayer.label,
        kind: "farz",
        rakats: prayer.farzRakats,
      });
      const sunnetSteps = buildGuideSteps({
        prayerLabel: prayer.label,
        kind: "sunnet",
        rakats: prayer.sunnetRakats,
      });
      return [...farzSteps, ...sunnetSteps];
    }

    const rakats = guideMode === "farz" ? prayer.farzRakats : prayer.sunnetRakats;
    return buildGuideSteps({
      prayerLabel: prayer.label,
      kind: guideMode,
      rakats,
    });
  }, [guideMode, prayer.farzRakats, prayer.label, prayer.sunnetRakats]);

  const subtitle = useMemo(() => {
    if (guideMode === "komplet") {
      return `${prayer.farzRakats} Farz + ${prayer.sunnetRakats} Sunnet`;
    }
    if (guideMode === "farz") return `${prayer.farzRakats} Farz`;
    return `${prayer.sunnetRakats} Sunnet`;
  }, [guideMode, prayer.farzRakats, prayer.sunnetRakats]);

  const onOpenPrayer = (key: PrayerKey) => {
    setSelectedPrayerKey(key);
    // Kur hapet “Dreka”, automatikisht t’i vendosim 4 Farz + 4 Sunnet si kërkesë.
    setGuideMode("farz");
    setView("guide");
    setOpen(true);
  };

  const prayerTiles = PRAYERS;

  return (
    <>
      <div className={isCompact ? "" : "mt-8"}>
        {!isCompact ? (
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Namazi shqip
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Zgjidh vakatin dhe ndiq hapat
              </h2>
            </div>
            <div className="hidden text-sm text-muted-foreground sm:block">
              Kliko foton → shfaq Farz/Sunnet → udhëzues hap-pas-hapi
            </div>
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {prayerTiles.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => onOpenPrayer(p.key)}
              className="group relative overflow-hidden rounded-[1.8rem] border border-border/70 bg-background p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative">
                <div className="relative h-40 overflow-hidden rounded-2xl border border-border/70 bg-muted">
                  <Image
                    src={p.imageSrc}
                    alt={p.label}
                    fill
                    sizes="(min-width: 1024px) 320px, 90vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                </div>

                <div className="mt-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-foreground/60" />
                    {p.label}
                  </div>
                  <div className="mt-3 text-sm font-semibold">{p.subtitle}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {!isCompact ? (
          <div className="mt-6 rounded-[1.7rem] border border-border/70 bg-background/60 p-5 text-sm leading-7 text-muted-foreground">
            Shënim: numrat e Farz/Sunnet janë të dizajnuar për udhëzim praktik dhe mund të ndryshojnë
            pak sipas medhhebit. Për detaje, ndiq udhëzimin e imam-it.
          </div>
        ) : null}
      </div>

      <Modal
        open={open}
        title="Udhëzuesi i namazit"
        onClose={() => setOpen(false)}
      >
        <div className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-zinc-950/70 p-4 text-white shadow-[0_22px_70px_rgba(0,0,0,0.6)] backdrop-blur">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
            <div className="min-w-0">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                {prayer.label}
              </div>
              <h2 className="mt-2 truncate text-xl font-semibold">
                {view === "guide"
                  ? `Udhëzues: ${
                      guideMode === "komplet"
                        ? "Komplet (Farz + Sunnet)"
                        : guideMode === "farz"
                          ? "Farz"
                          : "Sunnet"
                    }`
                  : `Farz + Sunnet (shiko hapat)`}
              </h2>
              <div className="mt-2 text-sm text-white/80">{subtitle}</div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
            >
              Mbyll
            </button>
          </div>

          <div className="mt-4 min-h-0 flex-1 overflow-auto">
            {view === "overview" ? (
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                <div>
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/20">
                    <div className="relative h-72">
                      <Image
                        src={prayer.imageSrc}
                        alt={prayer.label}
                        fill
                        sizes="(min-width: 1024px) 800px, 90vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold">
                        <DoveIcon className="h-5 w-5 text-emerald-200" />
                        Ndiqe me “dove” (hapat lëvizin)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <MotionCard className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                    <div className="text-sm font-semibold">Farz</div>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <div className="text-3xl font-bold">
                        {prayer.farzRakats}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setGuideMode("farz");
                          setView("guide");
                        }}
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                      >
                        Si falet Farzi
                      </button>
                    </div>
                  </MotionCard>

                  <MotionCard className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                    <div className="text-sm font-semibold">Sunnet</div>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <div className="text-3xl font-bold">
                        {prayer.sunnetRakats}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setGuideMode("sunnet");
                          setView("guide");
                        }}
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                      >
                        Si falet Sunneti
                      </button>
                    </div>
                  </MotionCard>

                  <MotionCard className="rounded-[2rem] border border-white/10 bg-white/8 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold">Komplet</div>
                        <div className="mt-1 text-sm leading-6 text-white/80">
                          {prayer.farzRakats} Farz + {prayer.sunnetRakats} Sunnet
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setGuideMode("komplet");
                          setView("guide");
                        }}
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                      >
                        Si falet komplet
                      </button>
                    </div>
                  </MotionCard>

                  <div className="rounded-[2rem] border border-white/10 bg-black/20 p-5 text-sm leading-7 text-white/80">
                    Pasi ta hapësh udhëzuesin, shigjeta/dove lëviz përgjatë
                    progresit dhe të udhëzon për çdo lëvizje kryesore.
                  </div>
                </div>
              </div>
            ) : (
              <GuideNavigator
                title={
                  guideMode === "komplet"
                    ? `${prayer.label} • Komplet`
                    : `${prayer.label} • ${
                        guideMode === "farz" ? "Farz" : "Sunnet"
                      } • ${
                        guideMode === "farz" ? prayer.farzRakats : prayer.sunnetRakats
                      } rekate`
                }
                steps={steps}
                onBack={() => setView("overview")}
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

