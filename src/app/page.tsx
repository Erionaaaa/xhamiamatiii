import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/site/Container";
import { MotionSection, MotionCard } from "@/components/site/motion";
import {
  getPrayerTimesForPrishtina,
  type PrayerTimes,
} from "@/lib/prayer-times";
import { getYouTubeId } from "@/lib/youtube";
import { NextPrayerCountdown } from "@/components/site/NextPrayerCountdown";
import { QUOTES } from "@/lib/quotes";
import { GalleryLightbox } from "@/components/site/GalleryLightbox";
import { getNextPrayer } from "@/lib/next-prayer";

export default async function Home() {
  const info = await prisma.mosqueInfo.findFirst();
  const prayer = await getPrayerTimesForPrishtina();
  const latestPosts = await prisma.academyPost.findMany({
    where: { isActive: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 4,
  });
  const latestActivities = await prisma.activity.findMany({
    where: { isActive: true },
    orderBy: [{ startsAt: "desc" }, { createdAt: "desc" }],
    take: 4,
  });
  const latestVideos = await prisma.video.findMany({
    where: { isActive: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 6,
    include: { category: true },
  });

  const next = getNextPrayer(prayer.timings, prayer.timezone ?? "Europe/Belgrade");

  return (
    <main>
      <Hero
        infoName={info?.name}
        infoCity={info?.city}
        infoDescription={info?.description}
        prayer={prayer}
        next={next}
      />
      <Sections />
      <Quotes />
      <Latest
        posts={latestPosts}
        activities={latestActivities}
        videos={latestVideos}
      />
      <Gallery />
      <DonateCTA />
    </main>
  );
}

function Hero({
  infoName,
  infoCity,
  infoDescription,
  prayer,
  next,
}: {
  infoName?: string | null;
  infoCity?: string | null;
  infoDescription?: string | null;
  prayer: PrayerTimes;
  next: { label: string; iso: string } | null;
}) {
  return (
    <MotionSection className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt={infoName ?? "Xhamia Mati 1"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/18 to-black/40 sm:from-black/58 sm:via-black/24 sm:to-black/48" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/75 to-transparent" />
      </div>

      <Container className="relative flex min-h-[72vh] flex-col justify-center gap-10 py-14 lg:min-h-[82vh]">
        <div className="max-w-xl space-y-4 text-zinc-50">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-zinc-200 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Platformë zyrtare e Xhamisë Mati 1
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {infoName ?? "Xhamia Mati 1"}
          </h1>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-300">
            {infoCity ?? "Prishtinë"} • ORET E NAMAZIT
          </p>
          <p className="max-w-xl text-sm leading-7 text-zinc-200">
            {infoDescription ??
              "Orari i namazit në kohë reale, ligjërata, Akademia, aktivitetet dhe mundësitë për të ndihmuar xhaminë."}
          </p>
          <div className="pt-1">
            <NextPrayerCountdown
              label={next?.label ?? "Namazi i radhës"}
              targetIso={next?.iso ?? null}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
            <PrayerCard
              label="Sabahu"
              time={prayer.timings.fajr}
              accent="from-sky-400 to-emerald-400"
            />
            <PrayerCard
              label="Dreka"
              time={prayer.timings.dhuhr}
              accent="from-amber-300 to-orange-400"
            />
            <PrayerCard
              label="Ikindia"
              time={prayer.timings.asr}
              accent="from-orange-400 to-rose-400"
            />
            <PrayerCard
              label="Akshami"
              time={prayer.timings.maghrib}
              accent="from-rose-400 to-fuchsia-400"
            />
            <PrayerCard
              label="Jacia"
              time={prayer.timings.isha}
              accent="from-indigo-400 to-sky-500"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-300">
            <div>
              {prayer.locationLabel} • {prayer.dateLabel}
            </div>
            <div className="flex gap-3">
              <Link
                href="/orari"
                className="inline-flex items-center justify-center rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-900 shadow-sm transition hover:bg-white"
              >
                Shiko orarin e plotë
              </Link>
              <Link
                href="/video"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-50 backdrop-blur transition hover:bg-white/10"
              >
                Shiko ligjëratat
              </Link>
            </div>
          </div>
        </div>

      </Container>
    </MotionSection>
  );
}

function PrayerCard({
  label,
  time,
  accent,
}: {
  label: string;
  time: string;
  accent: string;
}) {
  return (
    <MotionCard className="relative overflow-hidden rounded-3xl border border-white/12 bg-black/18 p-4 text-zinc-50 shadow-[0_16px_48px_rgba(0,0,0,0.32)] backdrop-blur-[1px] sm:backdrop-blur-[2px]">
      <div className={`pointer-events-none absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r ${accent}`} />
      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-300">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{time}</div>
    </MotionCard>
  );
}

function Sections() {
  return (
    <MotionSection className="">
      <Container className="py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <Feature
            title="Orari i namazit (Prishtinë)"
            desc="I përditësuar automatikisht nga BIK (bislame.com)."
            href="/orari"
            imageSrc="/prayer.jpg"
          />
          <Feature
            title="Video të organizuara"
            desc="Kategori të ndara sipas tematikave."
            href="/video"
            imageSrc="/inside.jpg"
          />
          <Feature
            title="Platformë e zgjerueshme"
            desc="Funksione të reja mund të shtohen gradualisht."
            href="/xhamia"
            imageSrc="/xhamia.jpg"
          />
        </div>
      </Container>
    </MotionSection>
  );
}

function Feature({
  title,
  desc,
  href,
  imageSrc,
}: {
  title: string;
  desc: string;
  href: string;
  imageSrc: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-3xl border border-border/70 bg-background p-6 shadow-sm transition hover:shadow-lg"
    >
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/20" />
      <div className="relative text-zinc-50">
        <div className="text-base font-semibold tracking-tight">{title}</div>
        <div className="mt-2 text-sm leading-6 text-zinc-200">{desc}</div>
      </div>
    </Link>
  );
}

function Quotes() {
  return (
    <MotionSection>
      <Container className="py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Fjala e Allahut & mësime
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Ajete dhe thënie motivuese
            </h2>
          </div>
          <Link
            href="/ajete"
            className="text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            Shiko të gjitha →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {QUOTES.slice(0, 9).map((q, idx) => (
            <MotionCard
              key={`${q.ref}-${idx}`}
              className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm"
            >
              <div className="inline-flex rounded-full border border-border/70 bg-muted px-3 py-1 text-xs font-semibold">
                {q.kind}
              </div>
              <div className="mt-4 text-lg leading-8 tracking-tight">{q.ar}</div>
              <div className="mt-3 text-sm leading-6 text-muted-foreground">
                {q.sq}
              </div>
              <div className="mt-4 text-xs font-medium text-muted-foreground">
                {q.ref}
              </div>
            </MotionCard>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}

function Latest({
  posts,
  activities,
  videos,
}: {
  posts: Array<{ id: string; title: string; slug: string; excerpt: string | null }>;
  activities: Array<{ id: string; title: string; slug: string; summary: string | null }>;
  videos: Array<{
    id: string;
    title: string;
    slug: string;
    youtubeUrl: string;
    category: { slug: string; name: string };
  }>;
}) {
  return (
    <MotionSection>
      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <MotionCard className="overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm lg:col-span-2">
            <div className="flex items-end justify-between gap-4 p-6">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Video
                </div>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Të fundit
                </h2>
              </div>
              <Link
                href="/video"
                className="text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                Të gjitha →
              </Link>
            </div>
            <div className="grid gap-4 p-6 pt-0 md:grid-cols-2">
              {videos.slice(0, 4).map((v) => {
                const id = getYouTubeId(v.youtubeUrl);
                return (
                  <Link
                    key={v.id}
                    href={`/video/${v.category.slug}#${v.slug}`}
                    className="group grid gap-3 rounded-2xl border border-border/70 bg-background p-4 transition hover:bg-muted"
                  >
                    <div className="text-xs text-muted-foreground">
                      {v.category.name}
                    </div>
                    <div className="text-sm font-semibold tracking-tight">
                      {v.title}
                    </div>
                    {id ? (
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-border/70 bg-muted">
                        <Image
                          src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                          alt={v.title}
                          fill
                          sizes="(min-width: 768px) 320px, 90vw"
                          className="object-cover transition duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </MotionCard>

          <div className="grid gap-4">
            <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Akademia
                  </div>
                  <div className="mt-2 text-lg font-semibold tracking-tight">
                    Postime të reja
                  </div>
                </div>
                <Link
                  href="/akademia"
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  →
                </Link>
              </div>
              <div className="mt-4 grid gap-3">
                {posts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/akademia/${p.slug}`}
                    className="rounded-2xl border border-border/70 bg-background p-4 transition hover:bg-muted"
                  >
                    <div className="text-sm font-semibold">{p.title}</div>
                    {p.excerpt ? (
                      <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {p.excerpt}
                      </div>
                    ) : null}
                  </Link>
                ))}
              </div>
            </MotionCard>

            <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Aktivitete
                  </div>
                  <div className="mt-2 text-lg font-semibold tracking-tight">
                    Njoftime
                  </div>
                </div>
                <Link
                  href="/aktivitete"
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  →
                </Link>
              </div>
              <div className="mt-4 grid gap-3">
                {activities.map((a) => (
                  <Link
                    key={a.id}
                    href={`/aktivitete/${a.slug}`}
                    className="rounded-2xl border border-border/70 bg-background p-4 transition hover:bg-muted"
                  >
                    <div className="text-sm font-semibold">{a.title}</div>
                    {a.summary ? (
                      <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {a.summary}
                      </div>
                    ) : null}
                  </Link>
                ))}
              </div>
            </MotionCard>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}

function Gallery() {
  const imgs = [
    { src: "/hero.png", alt: "Pamje" },
    { src: "/xhamia.jpg", alt: "Xhamia" },
    { src: "/inside.jpg", alt: "Brenda" },
    { src: "/prayer.jpg", alt: "Namazi" },
    { src: "/academy.jpg", alt: "Akademia" },
    { src: "/activities.jpg", alt: "Aktivitete" },
  ];

  return (
    <MotionSection>
      <Container className="py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Galeri
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Momente nga xhamia
            </h2>
          </div>
          <Link
            href="/xhamia"
            className="text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            Më shumë →
          </Link>
        </div>

        <div className="mt-6">
          <GalleryLightbox images={imgs} />
        </div>
      </Container>
    </MotionSection>
  );
}

function DonateCTA() {
  return (
    <MotionSection>
      <Container className="py-12">
        <MotionCard className="relative overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
          <div className="absolute inset-0">
            <Image
              src="/donation.webp"
              alt="Donacione"
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          </div>
          <div className="relative grid gap-6 p-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Donacione
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Mbështete Xhaminë Mati 1
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Donacionet ndihmojnë në mirëmbajtje, programe edukative dhe
                projekte humanitare. Mund ta zgjedhësh mënyrën që të përshtatet.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link
                href="/donacione"
                className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90"
              >
                Shiko mënyrat e donacionit
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex h-11 items-center justify-center rounded-full border border-border/70 bg-background px-5 text-sm font-semibold transition hover:bg-muted"
              >
                Kontakto
              </Link>
            </div>
          </div>
        </MotionCard>
      </Container>
    </MotionSection>
  );
}
