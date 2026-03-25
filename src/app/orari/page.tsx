import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { getPrayerTimesForPrishtina } from "@/lib/prayer-times";
import { MotionSection, MotionCard } from "@/components/site/motion";
import { NextPrayerCountdown } from "@/components/site/NextPrayerCountdown";
import { getNextPrayer } from "@/lib/next-prayer";

export const metadata = {
  title: "Orari i namazit — Xhamia Mati 1",
  description:
    "Oraret e namazit për Prishtinë, të përditësuara për Xhaminë Mati 1. Falënderimi dhe praktika ditore në një vend.",
  alternates: {
    canonical: "/orari",
  },
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
  const prayerTutorialVideos = [
    {
      id: "yt-specific-prayer-guide",
      title: "Si të falemi namazin - video udhëzuese",
      description:
        "Video e rekomanduar për mësimin praktik të namazit hap pas hapi.",
      embedUrl: "https://www.youtube-nocookie.com/embed/gvRcklfqO0c",
      watchUrl: "https://www.youtube.com/watch?v=gvRcklfqO0c",
    },
  ] as const;
  const primaryTutorialVideo = prayerTutorialVideos[0] ?? null;
  const prayerGuideSteps = [
    {
      image: "/marrjaeabdesit1.jpg",
      title: "Përgatitja",
      body: "Merr abdes, pastro vendin e faljes, drejtohu nga kibla dhe bëje nijetin në zemër për namazin që do të falësh.",
    },
    {
      image: "/filliminamazit1.jpg",
      title: "Fillimi i namazit",
      body: "Ngriji duart dhe thuaj Allahu Ekber për të hyrë në namaz. Pastaj qëndro në këmbë me qetësi dhe fillo leximin.",
    },
    {
      image: "/leximinekembe2.jpg",
      title: "Leximi në këmbë",
      body: "Lexo El-Fatihën. Në dy rekatet e para lexohet edhe një sure ose disa ajete të tjera nga Kurani.",
    },
    {
      image: "/rukje1.jpg",
      title: "Ruku dhe ngritja",
      body: "Përkulu në ruku, qëndro i qetë dhe pastaj ngrihu sërish në këmbë derisa trupi të stabilizohet plotësisht.",
    },
    {
      image: "/dysexhdet1.jpg",
      title: "Dy sexhdet",
      body: "Bëj sexhden e parë, ulu shkurt mes dy sexhdeve dhe pastaj bëj sexhden e dytë. Kjo përbën pjesën kryesore të një rekati.",
    },
    {
      image: "/ikona8.jpg",
      title: "Rekati tjetër",
      body: "Ngrihu për rekatin tjetër dhe përsëriti të njëjtat hapa. Numri i rekateve varet nga namazi që po fal.",
    },
    {
      image: "/etijati1.jpg",
      title: "Ettehijati dhe përfundimi",
      body: "Në uljen e fundit lexo ettehijatin, salavatet dhe lutjet, pastaj jep selam në të djathtë dhe në të majtë për ta mbyllur namazin.",
    },
    {
      image: "/perfundimi1.jpg",
      title: "Vazhdimësia dhe rregullsia",
      body: "Namazi falet pesë herë në ditë. Mundohu ta falësh në kohën e caktuar dhe ndërto gradualisht zakonin e rregullt — secila falje e vonuar është e plotësueshme.",
    },
  ] as const;
  const afterPrayerItems = [
    {
      title: "Dhikri pas selamit",
      body: "Pas përfundimit të namazit, qëndro pak me qetësi dhe bëj dhikrin e zakonshëm si istigfari, tesbihat dhe falënderimet ndaj Allahut.",
    },
    {
      title: "Lutje personale",
      body: "Pas dhikrit mund të bësh dua me fjalët e tua, duke kërkuar falje, udhëzim, lehtësi dhe mirësi për veten, familjen dhe komunitetin.",
    },
    {
      title: "Mëso gradualisht",
      body: "Nëse je fillestar, mëso fillimisht shtyllat kryesore dhe leximet bazë. Më pas shto sure, dua dhe rregulla të tjera hap pas hapi.",
    },
    {
      title: "Pyet kur nuk je i sigurt",
      body: "Nëse ke paqartësi për shqiptimin, numrin e rekateve ose veprimet në namaz, verifikoji me imam ose me një mësues të besueshëm.",
    },
  ] as const;
  const ayahCards = [
    {
      text: "Vërtet, namazi i ndalon veprat e shëmtuara dhe të këqija.",
      reference: "El-Ankebut, 45",
    },
    {
      text: "Ruajini me kujdes namazet dhe namazin e mesëm.",
      reference: "El-Bekare, 238",
    },
    {
      text: "E përmend Allahun shpesh, që të shpëtosh.",
      reference: "El-Xhumua, 10",
    },
    {
      text: "Dhe kërkoni ndihmë me durim dhe namaz.",
      reference: "El-Bekare, 45",
    },
    {
      text: "Kujtoni Mua, që t'ju kujtoj juve.",
      reference: "El-Bekare, 152",
    },
    {
      text: "Ai është me durimtarët.",
      reference: "El-Bekare, 153",
    },
  ] as const;
  const beginnerPrayerPdfUrl =
    "https://d1.islamhouse.com/data/sq/ih_articles/single/sq_Falja_e_namazit_per_fillestare.pdf";

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

            <div className="mt-8 rounded-[2rem] border border-border/70 bg-background p-5 shadow-sm sm:p-7">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Reflektim i ditës
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Ajete për qetësi dhe motivim
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  Një përzgjedhje e shkurtër ajetesh për ta bërë faqen më të dobishme
                  në përdorim ditor, sidomos në mobile.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {ayahCards.map((ayah) => (
                  <MotionCard
                    key={ayah.reference}
                    className="rounded-3xl border border-border/70 bg-[linear-gradient(180deg,rgba(16,185,129,0.08),rgba(255,255,255,0.02))] p-5 shadow-sm"
                  >
                    <p className="text-sm leading-7 text-foreground/90">&ldquo;{ayah.text}&rdquo;</p>
                    <div className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {ayah.reference}
                    </div>
                  </MotionCard>
                ))}
              </div>
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

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-2">
                {prayerGuideSteps.map((step) => (
                  <MotionCard
                    key={step.title}
                    className="overflow-hidden rounded-3xl border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.02))] shadow-sm"
                  >
                    <div className="grid min-h-[250px] grid-cols-[145px_minmax(0,1fr)] sm:grid-cols-[180px_minmax(0,1fr)]">
                      <div className="relative h-full w-full border-r border-border/70 bg-muted">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          sizes="(min-width: 1280px) 180px, (min-width: 640px) 180px, 145px"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-5 sm:p-6">
                        <div className="text-base font-semibold tracking-tight">
                          {step.title}
                        </div>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {step.body}
                        </p>
                        <div className="mt-4 inline-flex rounded-full border border-border/70 bg-muted/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Hap i namazit
                        </div>
                      </div>
                    </div>
                  </MotionCard>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-border/70 bg-muted/35 px-5 py-4 text-sm leading-7 text-muted-foreground">
                Shënim: Ky është një manual i shkurtër për orientim të shpejtë.
                Për mësim praktik më të detajuar, lexim korrekt dhe dallimet që
                mund të ketë sipas medhhebit, konsultohu me imam ose mësues të
                besueshëm.
              </div>

              <div className="mt-6 rounded-[2rem] border border-border/70 bg-background p-5 shadow-sm sm:p-6">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Pas ettehijatit
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
                    Çfarë mund të bësh pas përfundimit të namazit
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    Pasi jep selam dhe përfundon namazin, zakonisht vazhdohet me
                    dhikër, lutje dhe mësim gradual të pjesëve që ende nuk i ke
                    të sigurta.
                  </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {afterPrayerItems.map((item) => (
                    <MotionCard
                      key={item.title}
                      className="rounded-4xl border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.02))] p-5 shadow-sm"
                    >
                      <div className="text-base font-semibold tracking-tight">
                        {item.title}
                      </div>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {item.body}
                      </p>
                    </MotionCard>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-amber-300/45 bg-[linear-gradient(150deg,rgba(245,158,11,0.16),rgba(16,185,129,0.08)_60%,rgba(255,255,255,0.02))] px-5 py-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-bold leading-7 text-muted-foreground">
                    Material shtesë për fillestarë:
                  </p>
                  <a
                    href={beginnerPrayerPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-amber-500/70 bg-amber-500 px-5 py-2 text-sm font-extrabold text-zinc-950 shadow-[0_10px_26px_-12px_rgba(245,158,11,0.9)] transition duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-[0_16px_30px_-14px_rgba(245,158,11,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 focus-visible:ring-offset-2"
                  >
                    <span className="inline-flex rounded-full border border-zinc-900/20 bg-zinc-950/10 px-2 py-0.5 text-[11px] font-black tracking-[0.08em]">
                      PDF
                    </span>
                    Hap udhezuesin e namazit
                  </a>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-border/70 bg-[linear-gradient(160deg,rgba(16,185,129,0.10),rgba(59,130,246,0.08)_38%,rgba(245,158,11,0.08)_72%,rgba(255,255,255,0.01))] p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/85 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Video udhëzuese
                    </div>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                      Mëso praktikisht me video
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">
                      Përveç hapave me tekst, mund t’i ndjekësh videot e publikuara
                      për mësim më të qartë dhe më vizual.
                    </p>
                  </div>
                  <Link
                    href="/video"
                    className="inline-flex h-10 items-center justify-center rounded-full border border-border/70 bg-background px-4 text-xs font-semibold text-foreground transition hover:bg-muted"
                  >
                    Shiko të gjitha videot
                  </Link>
                </div>

                <div className="mt-6">
                  {primaryTutorialVideo ? (
                    <MotionCard className="overflow-hidden rounded-3xl border border-border/70 bg-background/90 shadow-sm">
                      <div className="grid lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
                        <div className="border-b border-border/70 lg:border-b-0 lg:border-r">
                          <iframe
                            className="aspect-video w-full lg:min-h-[420px]"
                            src={primaryTutorialVideo.embedUrl}
                            title={primaryTutorialVideo.title}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>

                        <div className="flex flex-col justify-between gap-4 p-5 sm:p-6">
                          <div>
                            <h4 className="text-base font-semibold tracking-tight sm:text-lg">
                              {primaryTutorialVideo.title}
                            </h4>
                            <p className="mt-2 text-sm leading-7 text-muted-foreground">
                              {primaryTutorialVideo.description ??
                                "Përmbajtje edukative nga seksioni i videove të xhamisë."}
                            </p>
                          </div>

                          <a
                            href={primaryTutorialVideo.watchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-10 items-center justify-center rounded-full border border-border/70 bg-background px-4 text-xs font-semibold text-foreground transition hover:bg-muted"
                          >
                            Hap videon në YouTube
                          </a>
                        </div>
                      </div>
                    </MotionCard>
                  ) : (
                    <div className="rounded-3xl border border-border/70 bg-background/85 p-6 text-sm text-muted-foreground">
                      Për momentin nuk ka video aktive për shfaqje këtu. Mund t’i
                      shikosh materialet sapo të publikohen te seksioni i videove.
                    </div>
                  )}
                </div>
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
      <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0 text-left">
          <div className="text-sm text-muted-foreground">{label}</div>
          {isHighlighted ? (
            <span className="mt-2 inline-flex rounded-full bg-amber-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-600 dark:text-amber-300">
              Tani në fokus
            </span>
          ) : null}
        </div>
        <div className="shrink-0 whitespace-nowrap text-right text-2xl font-semibold tracking-tight sm:text-3xl">
          {value}
        </div>
      </div>
    </MotionCard>
  );
}

