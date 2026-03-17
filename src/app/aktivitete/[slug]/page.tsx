import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/site/Container";
import { prisma } from "@/lib/prisma";
import { MotionSection, MotionCard } from "@/components/site/motion";

const DEFAULT_ACTIVITY_IMAGES = [
  "/activities.jpg",
  "/youth.jpg",
  "/inside.jpg",
  "/xhamia.jpg",
  "/academy.jpg",
];

function resolveActivityImage(coverImage: string | null, seed: string) {
  const normalized = (coverImage ?? "").trim();
  if (normalized.startsWith("/")) {
    return normalized;
  }

  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return DEFAULT_ACTIVITY_IMAGES[hash % DEFAULT_ACTIVITY_IMAGES.length];
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await prisma.activity.findUnique({ where: { slug } });
  if (!a || !a.isActive) notFound();

  const latest = await prisma.activity.findMany({
    where: { isActive: true },
    orderBy: [{ startsAt: "desc" }, { createdAt: "desc" }],
    take: 6,
  });
  const heroImage = resolveActivityImage(a.coverImage, a.slug);

  return (
    <main>
      <MotionSection>
        <div className="relative overflow-hidden border-b border-border/60">
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt="Aktivitete"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_55%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-background" />
          </div>
          <Container className="relative py-12">
            <Link
              href="/aktivitete"
              className="text-sm font-semibold text-zinc-200 hover:text-white"
            >
              ← Kthehu te aktivitetet
            </Link>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-zinc-50">
              {a.title}
            </h1>
            {a.summary ? (
              <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-200">
                {a.summary}
              </p>
            ) : null}
          </Container>
        </div>

        <Container className="py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
            <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
              {a.content ? (
                <div className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                  {a.content}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Përmbajtja do të shtohet.
                </div>
              )}
            </MotionCard>

            <aside className="grid gap-4">
              <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
                <div className="text-sm font-semibold">Aktivitete të tjera</div>
                <div className="mt-4 grid gap-2">
                  {latest
                    .filter((x) => x.slug !== a.slug)
                    .slice(0, 5)
                    .map((x) => (
                      <Link
                        key={x.id}
                        href={`/aktivitete/${x.slug}`}
                        className="rounded-2xl border border-border/70 bg-background p-4 text-sm transition hover:bg-muted"
                      >
                        <div className="font-semibold">{x.title}</div>
                        {x.summary ? (
                          <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {x.summary}
                          </div>
                        ) : null}
                      </Link>
                    ))}
                </div>
              </MotionCard>

              <MotionCard className="overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
                <div className="relative h-40 w-full">
                  <Image
                    src="/activities.jpg"
                    alt="Aktivitete"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-medium text-zinc-100">
                    Kontakto organizatorët për t’u përfshirë në aktivitetet e ardhshme.
                  </div>
                </div>
                <div className="p-5">
                  <Link
                    href="/kontakt"
                    className="inline-flex h-10 w-full items-center justify-center rounded-full bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90"
                  >
                    Kontakto organizatorët
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

