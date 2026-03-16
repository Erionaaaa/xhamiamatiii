import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/site/Container";
import { prisma } from "@/lib/prisma";
import { MotionSection, MotionCard } from "@/components/site/motion";

export default async function AcademyPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.academyPost.findUnique({ where: { slug } });
  if (!post || !post.isActive) notFound();

  const latest = await prisma.academyPost.findMany({
    where: { isActive: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 6,
  });

  return (
    <main>
      <MotionSection>
        <div className="relative overflow-hidden border-b border-border/60">
          <div className="absolute inset-0">
            <Image
              src={post.coverImage || "/academy.jpg"}
              alt="Akademia"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_50%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-background" />
          </div>
          <Container className="relative py-12">
            <Link
              href="/akademia"
              className="text-sm font-semibold text-zinc-200 hover:text-white"
            >
              ← Kthehu te Akademia
            </Link>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-zinc-50">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-200">
                {post.excerpt}
              </p>
            ) : null}
          </Container>
        </div>

        <Container className="py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
            <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
              <div className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                {post.content}
              </div>
            </MotionCard>

            <aside className="grid gap-4">
              <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
                <div className="text-sm font-semibold">Postime të tjera</div>
                <div className="mt-4 grid gap-2">
                  {latest
                    .filter((p) => p.slug !== post.slug)
                    .slice(0, 5)
                    .map((p) => (
                      <Link
                        key={p.id}
                        href={`/akademia/${p.slug}`}
                        className="rounded-2xl border border-border/70 bg-background p-4 text-sm transition hover:bg-muted"
                      >
                        <div className="font-semibold">{p.title}</div>
                        {p.excerpt ? (
                          <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {p.excerpt}
                          </div>
                        ) : null}
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
                    Mbështete Akademinë dhe programet edukative.
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

