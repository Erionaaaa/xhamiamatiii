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
  const nextKeyByLabel = {
    Sabahu: "fajr",
    Dreka: "dhuhr",
    Ikindia: "asr",
    Akshami: "maghrib",
    Jacia: "isha",
  } as const;
  const nextPrayerKey = next ? nextKeyByLabel[next.label as keyof typeof nextKeyByLabel] : null;
  const localTime = new Intl.DateTimeFormat("sq-XK", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: data.timezone ?? "Europe/Belgrade",
  }).format(new Date());
  const prayerCards = [
    { key: "fajr", label: "Sabahu (Fajr)", value: data.timings.fajr },
    { key: "sunrise", label: "Lindja e diellit", value: data.timings.sunrise },
    { key: "dhuhr", label: "Dreka (Dhuhr)", value: data.timings.dhuhr },
    { key: "asr", label: "Ikindia (Asr)", value: data.timings.asr },
    { key: "maghrib", label: "Akshami (Maghrib)", value: data.timings.maghrib },
    { key: "isha", label: "Jacia (Isha)", value: data.timings.isha },
  ] as const;
  const prayerGuideSteps = [
    {
      title: "Përgatitja",
      body: "Merr abdes, pastro vendin e faljes, drejtohu nga kibla dhe bëje nijetin në zemër për namazin që do të falësh.",
    },
    {
      title: "Fillimi i namazit",
      body: "Ngriji duart dhe thuaj Allahu Ekber për të hyrë në namaz. Pastaj qëndro në këmbë me qetësi dhe fillo leximin.",
    },
    {
      title: "Leximi në këmbë",
      body: "Lexo El-Fatihën. Në dy rekatet e para lexohet edhe një sure ose disa ajete të tjera nga Kurani.",
    },
    {
      title: "Ruku dhe ngritja",
      body: "Përkulu në ruku, qëndro i qetë dhe pastaj ngrihu sërish në këmbë derisa trupi të stabilizohet plotësisht.",
    },
    {
      title: "Dy sexhdet",
      body: "Bëj sexhden e parë, ulu shkurt mes dy sexhdeve dhe pastaj bëj sexhden e dytë. Kjo përbën pjesën kryesore të një rekati.",
    },
    {
      title: "Rekati tjetër",
      body: "Ngrihu për rekatin tjetër dhe përsëriti të njëjtat hapa. Numri i rekateve varet nga namazi që po fal.",
    },
    {
      title: "Ettehijati dhe përfundimi",
      body: "Në uljen e fundit lexo ettehijatin, salavatet dhe lutjet, pastaj jep selam në të djathtë dhe në të majtë për ta mbyllur namazin.",
    },
  ] as const;

  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-background px-6 py-8 shadow-sm sm:px-8 lg:px-10">
            <div className="pointer-events-none absolute inset-0 opacity-80 [background:radial-gradient(700px_circle_at_15%_20%,rgba(245,158,11,0.16),transparent_50%),radial-gradient(800px_circle_at_85%_0%,rgba(59,130,246,0.14),transparent_48%),radial-gradient(700px_circle_at_50%_100%,rgba(16,185,129,0.12),transparent_50%)]" />
            <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full border border-border/40 bg-muted/50 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full border border-border/40 bg-muted/40 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_380px] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Orari ditor i namazit
                </div>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Orari i namazit
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Ndiqe ritmin e ditës me kohët e namazit për Prishtinë, me një
                  pamje më të pastër, më të qetë dhe më të lehtë për t’u
                  përdorur në telefon dhe desktop.
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-xs sm:text-sm">
                  <div className="rounded-full border border-border/70 bg-background/80 px-4 py-2 text-muted-foreground backdrop-blur-sm">
                    {data.locationLabel} • {data.dateLabel}
                  </div>
                  <div className="rounded-full border border-border/70 bg-background/80 px-4 py-2 text-muted-foreground backdrop-blur-sm">
                    Koha lokale • {localTime}
                  </div>
                  <div className="rounded-full border border-border/70 bg-background/80 px-4 py-2 text-muted-foreground backdrop-blur-sm">
                    {data.locationLabel}
                  </div>
                </div>

                <div className="mt-5">
                  <NextPrayerCountdown
                    label={next?.label ?? "Namazi i radhës"}
                    targetIso={next?.iso ?? null}
                  />
                </div>

                <div className="mt-6 text-xs text-muted-foreground">
                  Burimi: BIK (bislame.com), me rezervë Aladhan
                </div>
              </div>

              <MotionCard className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950 shadow-2xl">
                <div className="relative h-[320px] w-full">
                  <Image
                    src="/inside.jpg"
                    alt="Brendësia e xhamisë"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent" />

                  <div className="absolute left-4 top-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur-md">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                      Namazi i radhës
                    </div>
                    <div className="mt-1 text-lg font-semibold">
                      {next?.label ?? "Përditësohet së shpejti"}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-white backdrop-blur-md">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-white/65">
                        Kohët e sotme
                      </div>
                      <div className="mt-1 text-2xl font-semibold">5 vakte</div>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-white backdrop-blur-md">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-white/65">
                        Mesazh
                      </div>
                      <div className="mt-1 text-sm leading-6 text-white/90">
                        Namazi e strukturon ditën dhe e mban zemrën të lidhur.
                      </div>
                    </div>
                  </div>
                </div>
              </MotionCard>
            </div>
          </div>

          <div className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {prayerCards.map((item) => (
                <TimeCard
                  key={item.key}
                  label={item.label}
                  value={item.value}
                  isHighlighted={item.key === nextPrayerKey}
                />
              ))}
            </div>

            <div className="mt-10 rounded-[2rem] border border-border/70 bg-background p-6 shadow-sm sm:p-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Udhëzues i shkurtër
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Si të falemi
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  Më poshtë është një përmbledhje e thjeshtë e hapave kryesorë të
                  namazit. Është menduar si udhëzim i shpejtë për fillestarë dhe
                  si kujtesë praktike në faqe.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {prayerGuideSteps.map((step, index) => (
                  <MotionCard
                    key={step.title}
                    className="rounded-3xl border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.02))] p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-foreground text-sm font-semibold text-background">
                        {index + 1}
                      </div>
                      <div className="text-base font-semibold tracking-tight">
                        {step.title}
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {step.body}
                    </p>
                  </MotionCard>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-border/70 bg-muted/35 px-5 py-4 text-sm leading-7 text-muted-foreground">
                Shënim: Ky është një manual i shkurtër për orientim të shpejtë.
                Për mësim praktik më të detajuar, lexim korrekt dhe dallimet që
                mund të ketë sipas medhhebit, konsultohu me imam ose mësues të
                besueshëm.
              </div>
            </div>
          </div>
        </Container>
      </MotionSection>
    </main>
  );
}

function TimeCard({
  label,
  value,
  isHighlighted = false,
}: {
  label: string;
  value: string;
  isHighlighted?: boolean;
}) {
  return (
    <MotionCard
      className={`rounded-3xl border p-6 shadow-sm transition ${
        isHighlighted
          ? "border-amber-300/40 bg-[linear-gradient(180deg,rgba(245,158,11,0.16),rgba(255,255,255,0.02))]"
          : "border-border/70 bg-background"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm text-muted-foreground">{label}</div>
        {isHighlighted ? (
          <span className="rounded-full bg-amber-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-600 dark:text-amber-300">
            Tani në fokus
          </span>
        ) : null}
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight">{value}</div>
    </MotionCard>
  );
}

