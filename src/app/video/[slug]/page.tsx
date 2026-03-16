import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/site/Container";
import { prisma } from "@/lib/prisma";
import { getYouTubeId } from "@/lib/youtube";
import { MotionSection, MotionCard } from "@/components/site/motion";

function coverFor(slug: string) {
  switch (slug) {
    case "kuran":
      return "/inside.jpg";
    case "hytbe":
      return "/hero.png";
    case "familja-edukimi":
      return "/youth.jpg";
    default:
      return "/xhamia.jpg";
  }
}

export default async function VideoCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await prisma.videoCategory.findUnique({
    where: { slug },
  });
  if (!category || !category.isActive) notFound();

  const categories = await prisma.videoCategory.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: { _count: { select: { videos: true } } },
  });

  const videos = await prisma.video.findMany({
    where: { isActive: true, categoryId: category.id },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return (
    <main>
      <MotionSection>
        <div className="relative overflow-hidden border-b border-border/60">
          <div className="absolute inset-0">
            <Image
              src={coverFor(slug)}
              alt={category.name}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_55%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-background" />
          </div>
          <Container className="relative py-12">
            <div className="max-w-3xl text-zinc-50">
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-200">
                Video • Kategori
              </div>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight">
                {category.name}
              </h1>
              <p className="mt-3 text-sm leading-7 text-zinc-200">
                Video të organizuara sipas tematikave. Këtu mund të shtoni
                ligjërata, hytbe, Kur’an dhe tema edukative.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/video"
                  className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-100 px-4 text-xs font-semibold text-zinc-900 transition hover:bg-white"
                >
                  Të gjitha kategoritë
                </Link>
                <Link
                  href="/orari"
                  className="inline-flex h-10 items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 text-xs font-semibold text-zinc-50 backdrop-blur transition hover:bg-white/15"
                >
                  Orari i namazit
                </Link>
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
            <div>
              {videos.length === 0 ? (
                <div className="rounded-3xl border border-border/70 bg-background p-6 text-sm text-muted-foreground shadow-sm">
                  Ende nuk ka video në këtë kategori.
                </div>
              ) : (
                <div className="grid gap-6 lg:grid-cols-2">
                  {videos.map((v) => {
                    const id = getYouTubeId(v.youtubeUrl);
                    return (
                      <MotionCard
                        key={v.id}
                        id={v.slug}
                        className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm"
                      >
                        <div className="text-base font-semibold tracking-tight">
                          {v.title}
                        </div>
                        {v.description ? (
                          <div className="mt-2 text-sm leading-6 text-muted-foreground">
                            {v.description}
                          </div>
                        ) : null}

                        {id ? (
                          <div className="mt-4 aspect-video overflow-hidden rounded-2xl border border-border/70 bg-muted">
                            <iframe
                              className="h-full w-full"
                              src={`https://www.youtube.com/embed/${id}`}
                              title={v.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            />
                          </div>
                        ) : (
                          <div className="mt-4 rounded-2xl border border-border/70 bg-muted p-4 text-sm text-muted-foreground">
                            Linku i YouTube nuk u njoh. Hap direkt:{" "}
                            <a className="underline" href={v.youtubeUrl}>
                              {v.youtubeUrl}
                            </a>
                          </div>
                        )}
                      </MotionCard>
                    );
                  })}
                </div>
              )}
            </div>

            <aside className="grid gap-4">
              <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
                <div className="text-sm font-semibold">Kategori</div>
                <div className="mt-3 grid gap-2">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/video/${c.slug}`}
                      className={`flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3 text-sm transition hover:bg-muted ${
                        c.slug === slug ? "bg-muted" : "bg-background"
                      }`}
                    >
                      <span className="font-medium">{c.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {c._count.videos}
                      </span>
                    </Link>
                  ))}
                </div>
              </MotionCard>

              <MotionCard className="overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
                <div className="relative h-40 w-full">
                  <Image
                    src="/donation.webp"
                    alt="Donacione"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-medium text-zinc-100">
                    Mbështete programet edukative dhe aktivitetet.
                  </div>
                </div>
                <div className="p-5">
                  <Link
                    href="/donacione"
                    className="inline-flex h-10 w-full items-center justify-center rounded-full bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90"
                  >
                    Shiko donacionet
                  </Link>
                </div>
              </MotionCard>
            </aside>
          </div>
        </Container>
      </MotionSection>
    </main>
  );
}

