import Image from "next/image";
import { Container } from "@/components/site/Container";
import { getPrayerTimesForPrishtina } from "@/lib/prayer-times";
import { MotionSection, MotionCard } from "@/components/site/motion";
import { NextPrayerCountdown } from "@/components/site/NextPrayerCountdown";
import { getNextPrayer } from "@/lib/next-prayer";

export const metadata = {
  title: "Orari i namazit — Xhamia Mati 1",
};

export default async function PrayerTimesPage() {
  const data = await getPrayerTimesForPrishtina();

  const next = getNextPrayer(data.timings, data.timezone ?? "Europe/Belgrade");

  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Orari i namazit
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Prishtinë • {data.dateLabel}
                {data.timezone ? ` • ${data.timezone}` : ""}
              </p>
              <NextPrayerCountdown
                label={next?.label ?? "Namazi i radhës"}
                targetIso={next?.iso ?? null}
              />
            </div>
            <div className="text-xs text-muted-foreground">
              Burimi: shërbim publik (Aladhan)
            </div>
          </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <TimeCard label="Sabahu (Fajr)" value={data.timings.fajr} />
            <TimeCard label="Lindja e diellit" value={data.timings.sunrise} />
            <TimeCard label="Dreka (Dhuhr)" value={data.timings.dhuhr} />
            <TimeCard label="Ikindia (Asr)" value={data.timings.asr} />
            <TimeCard label="Akshami (Maghrib)" value={data.timings.maghrib} />
            <TimeCard label="Jacia (Isha)" value={data.timings.isha} />
          </div>

          <MotionCard className="overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
            <div className="relative h-56 w-full">
              <Image
                src="/prayer.jpg"
                alt="Falja e namazit"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-sm font-medium text-zinc-100">
                “Ndërtoni lidhjen me Allahun përmes namazit të rregullt.”
              </div>
            </div>
            <div className="p-5 text-xs text-muted-foreground">
              Shënim: Orari është informues (Prishtinë/Kosovë).
            </div>
          </MotionCard>
        </div>
        </Container>
      </MotionSection>
    </main>
  );
}

function TimeCard({ label, value }: { label: string; value: string }) {
  return (
    <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
    </MotionCard>
  );
}

