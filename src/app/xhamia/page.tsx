import Image from "next/image";
import { Container } from "@/components/site/Container";
import { prisma } from "@/lib/prisma";
import { MotionSection, MotionCard } from "@/components/site/motion";

export const metadata = {
  title: "Xhamia — Xhamia Mati 1",
};

export default async function MosquePage() {
  const info = await prisma.mosqueInfo.findFirst();

  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
            <div className="absolute inset-0">
              <Image
                src="/xhamia.jpg"
                alt={info?.name ?? "Xhamia"}
                fill
                sizes="100vw"
                className="object-cover object-[center_55%]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
            </div>
            <div className="relative grid gap-6 p-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end">
              <div className="text-zinc-50">
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-200">
                  Xhamia
                </div>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight">
                  {info?.name ?? "Xhamia Mati 1"}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-200">
                  {info?.description ??
                    "Xhamia është qendër e adhurimit, edukimit dhe bashkimit të komunitetit. Këtu gjeni oraret e namazit, ligjërata dhe njoftime për aktivitetet."}
                </p>
              </div>

              <div className="grid gap-3 rounded-3xl border border-white/15 bg-black/25 p-5 text-sm text-zinc-100 backdrop-blur-sm">
                <div className="grid gap-1">
                  <div className="text-xs text-zinc-300">Qyteti</div>
                  <div className="font-semibold">{info?.city ?? "Prishtinë"}</div>
                </div>
                {info?.address ? (
                  <div className="grid gap-1">
                    <div className="text-xs text-zinc-300">Adresa</div>
                    <div className="font-semibold">{info.address}</div>
                  </div>
                ) : null}
                {(info?.phone || info?.email) ? (
                  <div className="grid gap-1">
                    <div className="text-xs text-zinc-300">Kontakt</div>
                    <div className="font-semibold">
                      {info?.phone ?? ""}
                      {info?.phone && info?.email ? " • " : ""}
                      {info?.email ?? ""}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
            <div>
              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <MotionCard className="lg:col-span-2 rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
                  <div className="text-sm font-semibold">Rreth xhamisë</div>
                  <div className="mt-2 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                    {info?.description ??
                      "Xhamia shërben si vend adhurimi dhe qendër komunitare për banorët e lagjes. Përveç namazeve ditore, organizohen ligjërata, mësime dhe aktivitete edukative e humanitare."}
                  </div>
                </MotionCard>

                <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
                  <div className="text-sm font-semibold">Detaje</div>
                  <dl className="mt-3 grid gap-3 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Emri</dt>
                      <dd className="font-medium">{info?.name ?? "Xhamia Mati 1"}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Qyteti</dt>
                      <dd className="font-medium">{info?.city ?? "Prishtinë"}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Adresa</dt>
                      <dd className="font-medium">
                        {info?.address ?? "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Kontakt</dt>
                      <dd className="font-medium">
                        {info?.phone ?? "—"} {info?.email ? ` • ${info.email}` : ""}
                      </dd>
                    </div>
                  </dl>
                </MotionCard>
              </div>
            </div>

            <MotionCard className="overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
              <div className="relative h-60 w-full">
                <Image
                  src="/xhamia.jpg"
                  alt={info?.name ?? "Xhamia Mati 1"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-sm font-medium text-zinc-100">
                  Pamje nga xhamia dhe rrethina.
                </div>
              </div>
            </MotionCard>
          </div>

          <div className="mt-10">
            <div className="text-sm font-semibold">Galeria</div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                { src: "/hero.png", alt: "Pamje nga oborri" },
                { src: "/inside.jpg", alt: "Brenda xhamisë" },
                { src: "/prayer.jpg", alt: "Momente nga namazi" },
              ].map((img) => (
                <MotionCard
                  key={img.src}
                  className="group relative h-56 overflow-hidden rounded-3xl border border-border/70 bg-muted shadow-sm"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-75" />
                  <div className="pointer-events-none absolute bottom-3 left-3 right-3 text-xs font-medium text-white/90">
                    {img.alt}
                  </div>
                </MotionCard>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="text-sm font-semibold">Shërbimet kryesore</div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MotionCard className="rounded-3xl border border-border/70 bg-background p-4 text-sm shadow-sm">
                <div className="font-semibold">Namazet ditore</div>
                <div className="mt-1 text-muted-foreground">
                  Falje e përditshme e namazeve farz dhe sunet, me orar të
                  përditësuar.
                </div>
              </MotionCard>
              <MotionCard className="rounded-3xl border border-border/70 bg-background p-4 text-sm shadow-sm">
                <div className="font-semibold">Akademia</div>
                <div className="mt-1 text-muted-foreground">
                  Kurse për fëmijë, rinorë dhe të rritur në lexim të Kur’anit dhe
                  bazat e fesë.
                </div>
              </MotionCard>
              <MotionCard className="rounded-3xl border border-border/70 bg-background p-4 text-sm shadow-sm">
                <div className="font-semibold">Rinia</div>
                <div className="mt-1 text-muted-foreground">
                  Mbrëmje rinore, takime dhe programe edukative e shoqërore.
                </div>
              </MotionCard>
              <MotionCard className="rounded-3xl border border-border/70 bg-background p-4 text-sm shadow-sm">
                <div className="font-semibold">Aksione humanitare</div>
                <div className="mt-1 text-muted-foreground">
                  Mbështetje për familje në nevojë, shpërndarje ushqimore dhe
                  aktivitete tjera.
                </div>
              </MotionCard>
            </div>
          </div>
        </Container>
      </MotionSection>
    </main>
  );
}

