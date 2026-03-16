import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/site/Container";
import { prisma } from "@/lib/prisma";
import { MotionSection, MotionCard } from "@/components/site/motion";

export const metadata = {
  title: "Video — Xhamia Mati 1",
};

export default async function VideosPage() {
  const categories = await prisma.videoCategory.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: {
      _count: { select: { videos: true } },
    },
  });

  const featured = await prisma.video.findMany({
    where: {
      isActive: true,
      isFeatured: true,
      category: { is: { isActive: true } },
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 6,
    include: { category: true },
  });

  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-background p-8 shadow-sm">
            <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background:radial-gradient(900px_circle_at_20%_15%,rgba(16,185,129,0.16),transparent_55%),radial-gradient(900px_circle_at_80%_10%,rgba(99,102,241,0.14),transparent_55%),radial-gradient(900px_circle_at_50%_95%,rgba(244,63,94,0.10),transparent_60%)]" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-border/50 bg-muted/40 blur-2xl" />
            <div className="pointer-events-none absolute -left-24 bottom-[-110px] h-80 w-80 rounded-full border border-border/50 bg-muted/40 blur-2xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Ligjërata • Hytbe • Kur’an
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                Video
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Kategori të ndara sipas tematikave. Zgjidh kategorinë dhe shiko
                videot përkatëse.
              </p>
            </div>
          </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {categories.map((c) => (
              <MotionCard
                key={c.id}
                className="group relative overflow-hidden rounded-3xl border border-border/70 bg-background p-6 shadow-sm transition hover:bg-muted"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-muted/70 blur-2xl transition group-hover:opacity-80" />
                <Link href={`/video/${c.slug}`} className="block">
                  <div className="text-base font-semibold tracking-tight">
                    {c.name}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {c._count.videos} video
                  </div>
                </Link>
              </MotionCard>
            ))}
          </div>

          <MotionCard className="overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
            <div className="relative h-56 w-full">
              <Image
                src="/youth.jpg"
                alt="Rinia në islam"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-sm font-medium text-zinc-100">
                Përmes videove synohet të arrihet sidomos rinia, me mesazhe të
                qarta dhe edukative.
              </div>
            </div>
          </MotionCard>
        </div>

        <div className="mt-12">
          <div className="text-sm font-semibold">Të veçuara</div>
          {featured.length === 0 ? (
            <div className="mt-3 rounded-3xl border border-border/70 bg-background p-6 text-sm text-muted-foreground shadow-sm">
              Nuk ka video të veçuara ende.
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((v) => (
                <MotionCard
                  key={v.id}
                  className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm transition hover:bg-muted"
                >
                  <Link
                    href={`/video/${v.category.slug}#${v.slug}`}
                    className="block"
                  >
                    <div className="text-xs text-muted-foreground">
                      {v.category.name}
                    </div>
                    <div className="mt-1 text-sm font-semibold tracking-tight">
                      {v.title}
                    </div>
                    {v.description ? (
                      <div className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {v.description}
                      </div>
                    ) : null}
                  </Link>
                </MotionCard>
              ))}
            </div>
          )}
        </div>
        </Container>
      </MotionSection>
    </main>
  );
}

