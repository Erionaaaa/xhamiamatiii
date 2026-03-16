import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/site/Container";
import { prisma } from "@/lib/prisma";
import { MotionSection, MotionCard } from "@/components/site/motion";

export const metadata = {
  title: "Akademia — Xhamia Mati 1",
};

export default async function AcademyPage() {
  const posts = await prisma.academyPost.findMany({
    where: { isActive: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 30,
  });

  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Akademia</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Hapësirë për mësime, materiale, njoftime dhe artikuj edukativ për
                xhematin dhe sidomos për të rinjtë.
              </p>

              {posts.length === 0 ? (
                <div className="mt-8 rounded-3xl border border-border/70 bg-background p-6 text-sm text-muted-foreground shadow-sm">
                  Ende nuk ka postime. (Këtu do shtohen gradualisht.)
                </div>
              ) : (
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {posts.map((p) => (
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
                        <div className="p-6">
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
              )}
            </div>

            <MotionCard className="overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
              <div className="relative h-60 w-full">
                <Image
                  src="/academy.jpg"
                  alt="Kurse dhe Akademi në xhami"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-sm font-medium text-zinc-100">
                  Akademia e Xhamisë Mati 1: kurse për fëmijë, rinorë dhe të rritur.
                </div>
              </div>
            </MotionCard>
          </div>

          <div className="mt-10">
            <div className="text-sm font-semibold">Programet e Akademisë</div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <MotionCard className="rounded-3xl border border-border/70 bg-background p-4 text-sm shadow-sm">
                <div className="font-semibold">Fëmijë</div>
                <div className="mt-1 text-muted-foreground">
                  Mësime bazë të akides, ahlakut dhe leximit të Kur’anit për
                  moshat e vogla.
                </div>
              </MotionCard>
              <MotionCard className="rounded-3xl border border-border/70 bg-background p-4 text-sm shadow-sm">
                <div className="font-semibold">Rini</div>
                <div className="mt-1 text-muted-foreground">
                  Tema bashkëkohore, identiteti islam dhe orientimi i karrierës
                  në dritën e fesë.
                </div>
              </MotionCard>
              <MotionCard className="rounded-3xl border border-border/70 bg-background p-4 text-sm shadow-sm">
                <div className="font-semibold">Të rritur</div>
                <div className="mt-1 text-muted-foreground">
                  Kurse për lexim të Kur’anit, fik’h praktik dhe ligjërata
                  tematike.
                </div>
              </MotionCard>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
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

            <MotionCard className="rounded-3xl border border-border/70 bg-muted p-6 shadow-sm">
              <div className="text-sm font-semibold">Dëshiron të regjistrohesh?</div>
              <div className="mt-2 text-sm leading-6 text-muted-foreground">
                Na kontakto për informata rreth orareve, niveleve dhe kushteve.
              </div>
              <form
                className="mt-4 grid gap-3"
                method="POST"
                action="/api/contact"
              >
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
          </div>
        </Container>
      </MotionSection>
    </main>
  );
}

