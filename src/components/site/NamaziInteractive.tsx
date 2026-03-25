"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { MotionCard } from "@/components/site/motion";
import type {
  GuideKind,
  GuideStep,
  PrayerKey,
} from "@/lib/namazi";
import { buildGuideSteps, getPrayerByKey, PRAYERS } from "@/lib/namazi";

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
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="h-screen w-screen"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function GuideNavigator({
  steps,
  onBack,
}: {
  steps: GuideStep[];
  onBack: () => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);

  const active = steps[activeIdx] ?? steps[0];

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

  const headline = useMemo(() => {
    const raw = active?.title ?? "";
    const split = raw.split("—");
    return split.length > 1 ? split[split.length - 1].trim() : raw;
  }, [active?.title]);

  return (
    <div className="flex h-full flex-col bg-black text-white">
      <div className="min-h-0 flex-1 overflow-auto px-4 pb-24 pt-4 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          {active?.imageSrc ? (
            <div className="overflow-hidden border border-white/10 bg-black">
              <div className="relative h-[34vh] min-h-[220px] sm:h-[42vh]">
                <Image
                  src={active.imageSrc}
                  alt={active.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>
          ) : null}

          <h3 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">
            {activeIdx + 1}. {headline}
          </h3>

          <p className="mt-3 text-base leading-8 text-white/90 sm:text-lg">
            {active?.instruction ?? ""}
          </p>

          {active?.recitations?.length ? (
            <div className="mt-4 border border-white/10 bg-white/5 p-3 sm:p-4">
              <div className="text-lg font-bold text-white sm:text-xl">
                {active.recitationTitle ?? "Thuaj"}
              </div>
              <div className="mt-2 space-y-2">
                {active.recitations.map((line) => {
                  const isSureLine = /(surja|sure|fatiha)/i.test(line);
                  return (
                  <div
                    key={line}
                    className={[
                      "w-fit max-w-full bg-white/14 px-2 py-1 text-base leading-snug text-white sm:text-lg",
                      isSureLine ? "italic" : "",
                    ].join(" ")}
                  >
                    {line}
                  </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/95 p-3">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (activeIdx <= 0) {
                onBack();
                return;
              }
              setActiveIdx((v) => Math.max(0, v - 1));
            }}
            className="h-11 w-11 rounded-full border border-white/20 bg-white/5 text-xl text-white/90"
          >
            ←
          </button>

          <button
            type="button"
            disabled={activeIdx >= steps.length - 1}
            onClick={() =>
              setActiveIdx((v) => Math.min(steps.length - 1, v + 1))
            }
            className="h-11 w-11 rounded-full border border-white/20 bg-white/10 text-xl text-white/90 disabled:opacity-40"
          >
            →
          </button>
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

  const onOpenPrayer = (key: PrayerKey) => {
    setSelectedPrayerKey(key);
    // Kur hapet vakti, hyjmë direkt në udhëzuesin Farz.
    setGuideMode("farz");
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
                Udhëzues i namazit
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
        <GuideNavigator
          steps={steps}
          onBack={() => setOpen(false)}
        />
      </Modal>
    </>
  );
}

