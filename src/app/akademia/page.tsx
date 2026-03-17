import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/site/Container";
import { prisma } from "@/lib/prisma";
import { MotionSection, MotionCard } from "@/components/site/motion";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Akademia — Xhamia Mati 1",
};

export default async function AcademyPage() {
  const posts = await prisma.academyPost
    .findMany({
      where: { isActive: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 30,
    })
    .catch(() => []);

  const featured = posts[0] ?? null;
  const restPosts = featured ? posts.slice(1) : posts;

  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
            <div className="absolute inset-0">
              <Image
                src="/academy.jpg"
                alt="Akademia"
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/25" />
            </div>

            <div className="relative grid gap-6 p-6 text-zinc-50 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-end md:p-8">
              <div>
                <div className="inline-flex items-center rounded-full border border-white/20 bg-black/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-200 backdrop-blur-sm">
                  Akademia
                </div>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Mësim dhe edukim në xhami
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-200">
                  Hapësirë për mësime, materiale, njoftime dhe artikuj edukativë
                  për xhematin dhe sidomos për të rinjtë.
                </p>
              </div>

              <div className="grid gap-2.5 rounded-3xl border border-white/15 bg-black/25 p-4 text-sm backdrop-blur-sm">
                <StatRow label="Postime aktive" value={String(posts.length)} />
                <StatRow label="Artikull i veçuar" value={featured ? "Po" : "Jo"} />
                <StatRow label="Programet" value="Fëmijë • Rini • Të rritur" />
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
            <div>
              {posts.length === 0 ? (
                <div className="rounded-3xl border border-border/70 bg-background p-6 text-sm text-muted-foreground shadow-sm">
                  Ende nuk ka postime. (Këtu do shtohen gradualisht.)
                </div>
              ) : (
                <div className="space-y-5">
                  {featured ? (
                    <MotionCard className="group overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
                      <Link href={`/akademia/${featured.slug}`} className="block">
                        <div className="relative h-56 w-full bg-muted">
                          <Image
                            src={featured.coverImage || "/academy.jpg"}
                            alt={featured.title}
                            fill
                            sizes="(min-width: 1024px) 760px, 95vw"
                            className="object-cover transition duration-700 group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                          <div className="absolute left-4 top-4 inline-flex rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-100">
                            Artikulli i veçuar
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="text-lg font-semibold tracking-tight">
                            {featured.title}
                          </div>
                          {featured.excerpt ? (
                            <div className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                              {featured.excerpt}
                            </div>
                          ) : null}

                          <div className="mt-4 inline-flex text-sm font-semibold text-foreground">
                            Lexo më shumë →
                          </div>
                        </div>
                      </Link>
                    </MotionCard>
                  ) : null}

                  <div className="grid gap-4 md:grid-cols-2">
                    {restPosts.map((p) => (
                      <MotionCard
                        key={p.id}
                        className="group h-full overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm transition hover:bg-muted"
                      >
                        <Link href={`/akademia/${p.slug}`} className="block h-full">
                          <div className="relative h-40 w-full border-b border-border/70 bg-muted">
                            <Image
                              src={p.coverImage || "/academy.jpg"}
                              alt={p.title}
                              fill
                              sizes="(min-width: 768px) 380px, 90vw"
                              className="object-cover transition duration-700 group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                          </div>
                          <div className="p-5">
                            <div className="text-sm font-semibold tracking-tight">
                              {p.title}
                            </div>
                            {p.excerpt ? (
                              <div className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                                {p.excerpt}
                              </div>
                            ) : null}
                          </div>
                        </Link>
                      </MotionCard>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="grid gap-4 lg:sticky lg:top-6">
              <MotionCard className="overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
                <div className="relative h-56 w-full">
                  <Image
                    src="/academy.jpg"
                    alt="Kurse dhe Akademi në xhami"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-medium text-zinc-100">
                    Akademia e Xhamisë Mati 1: kurse për fëmijë, rini dhe të rritur.
                  </div>
                </div>
              </MotionCard>

              <MotionCard className="rounded-3xl border border-border/70 bg-background p-5 shadow-sm">
                <div className="text-sm font-semibold">Programet e Akademisë</div>
                <div className="mt-3 grid gap-3 text-sm">
                  <ProgramItem
                    title="Fëmijë"
                    text="Mësime bazë të akides, ahlakut dhe leximit të Kur’anit për moshat e vogla."
                  />
                  <ProgramItem
                    title="Rini"
                    text="Tema bashkëkohore, identiteti islam dhe orientimi i karrierës në dritën e fesë."
                  />
                  <ProgramItem
                    title="Të rritur"
                    text="Kurse për lexim të Kur’anit, fik’h praktik dhe ligjërata tematike."
                  />
                </div>
              </MotionCard>

              <MotionCard className="rounded-3xl border border-border/70 bg-muted p-5 shadow-sm">
                <div className="text-sm font-semibold">Dëshiron të regjistrohesh?</div>
                <div className="mt-2 text-sm leading-6 text-muted-foreground">
                  Na kontakto për informata rreth orareve, niveleve dhe kushteve.
                </div>
                <form className="mt-4 grid gap-3" method="POST" action="/api/contact">
                  <input
                    className="h-10 rounded-2xl border border-border/70 bg-background px-3 text-xs outline-none ring-0 transition focus:border-foreground/40"
                    name="name"
                    placeholder="Emri i nxënësit / pjesëmarrësit"
                  />
                  <input
                    className="h-10 rounded-2xl border border-border/70 bg-background px-3 text-xs outline-none ring-0 transition focus:border-foreground/40"
                    name="email"
                    type="email"
                    placeholder="Email i prindit ose kontaktit"
                  />
                  <textarea
                    className="min-h-[80px] rounded-2xl border border-border/70 bg-background px-3 py-2 text-xs outline-none ring-0 transition focus:border-foreground/40"
                    name="message"
                    placeholder="Programi i interesuar (p.sh. Fëmijë / Rini / Të rritur) dhe ndonjë shënim shtesë."
                  />
                  <input type="hidden" name="context" value="regjistrim-akademi" />
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-4 text-xs font-semibold text-background transition hover:opacity-90"
                  >
                    Dërgo kërkesën për regjistrim
                  </button>
                  <div className="text-[11px] text-muted-foreground">
                    Kërkesa dërgohet në emailin e kontaktit të xhamisë. Mund t’i
                    ndryshosh adresën/numrin në `.env`.
                  </div>
                </form>
              </MotionCard>
            </aside>
          </div>

          <div className="mt-10">
            <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
              <div className="text-sm font-semibold">Pyetje të shpeshta (FAQ)</div>
              <div className="mt-4 grid gap-4 text-sm">
                <div className="rounded-2xl border border-border/70 bg-background p-4">
                  <div className="font-semibold">Si bëhet regjistrimi?</div>
                  <div className="mt-1 text-muted-foreground">
                    Regjistrimi mund të bëhet përmes kontaktit të xhamisë. Në fazën
                    tjetër mund ta shtojmë edhe regjistrimin online.
                  </div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background p-4">
                  <div className="font-semibold">A ka grupe sipas moshës?</div>
                  <div className="mt-1 text-muted-foreground">
                    Po. Fëmijët, rinia dhe të rriturit mund të ndahen në grupe
                    sipas nivelit dhe moshës.
                  </div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background p-4">
                  <div className="font-semibold">Çfarë tematika trajtohen?</div>
                  <div className="mt-1 text-muted-foreground">
                    Kur’an, akide, ahlak, fik’h praktik dhe tema edukative për
                    jetën e përditshme.
                  </div>
                </div>
              </div>
            </MotionCard>
          </div>
        </Container>
      </MotionSection>
    </main>
  );
}

function ProgramItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background p-4">
      <div className="font-semibold">{title}</div>
      <div className="mt-1 text-muted-foreground">{text}</div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/12 bg-white/5 px-3 py-2">
      <span className="text-zinc-300">{label}</span>
      <span className="font-semibold text-zinc-100">{value}</span>
    </div>
  );
}

