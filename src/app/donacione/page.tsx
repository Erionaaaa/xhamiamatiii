import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/site/Container";
import { prisma } from "@/lib/prisma";
import { MotionSection, MotionCard } from "@/components/site/motion";

export const metadata = {
  title: "Donacione — Xhamia Mati 1",
  description:
    "Mënyrat e donacionit për Xhaminë Mati 1, me informata të qarta për pagesa bankare, online dhe kontakt direkt.",
};

export default async function DonationsPage() {
  const methods = await prisma.donationMethod.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  const bankMethods = methods.filter((m) => m.bankName || m.iban || m.swift).length;
  const onlineMethods = methods.filter((m) => m.linkUrl).length;
  const directMethods = methods.filter((m) => m.phone).length;

  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
            <div className="absolute inset-0">
              <Image
                src="/donation.webp"
                alt="Donacione"
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/25" />
            </div>

            <div className="relative grid gap-6 p-6 text-zinc-50 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-end md:p-8">
              <div>
                <div className="inline-flex items-center rounded-full border border-white/20 bg-black/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-200 backdrop-blur-sm">
                  Donacione
                </div>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Mbështete xhaminë
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-200">
                  Faleminderit për mbështetjen tuaj. Më poshtë i gjeni mënyrat e
                  dhurimit me informata të qarta për pagesa bankare, online dhe
                  kontakt direkt.
                </p>
              </div>

              <div className="grid gap-2.5 rounded-3xl border border-white/15 bg-black/25 p-4 text-sm backdrop-blur-sm">
                <StatRow label="Totali i metodave" value={String(methods.length)} />
                <StatRow label="Bankë" value={String(bankMethods)} />
                <StatRow label="Online" value={String(onlineMethods)} />
                <StatRow label="Kontakt direkt" value={String(directMethods)} />
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-start">
            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="text-sm font-semibold">Mënyrat e dhurimit</div>
                <div className="text-xs text-muted-foreground">
                  Shembujt janë demo • zëvendësoji me të dhëna reale
                </div>
              </div>

              {methods.length === 0 ? (
                <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 text-sm text-muted-foreground shadow-sm">
                  Ende nuk ka metoda aktive të donacionit.
                </MotionCard>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {methods.map((m) => (
                    <MotionCard
                      key={m.id}
                      className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="text-base font-semibold tracking-tight">
                          {m.title}
                        </div>
                        <span className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {methodType(m)}
                        </span>
                      </div>

                      {m.description ? (
                        <div className="mt-2 text-sm leading-6 text-muted-foreground">
                          {m.description}
                        </div>
                      ) : null}

                      <dl className="mt-4 grid gap-2.5 text-sm">
                        {m.bankName ? <Row label="Banka" value={m.bankName} /> : null}
                        {m.accountName ? <Row label="Përfituesi" value={m.accountName} /> : null}
                        {m.iban ? <Row label="IBAN" value={m.iban} /> : null}
                        {m.swift ? <Row label="SWIFT" value={m.swift} /> : null}
                        {m.phone ? <Row label="Telefon" value={m.phone} /> : null}
                        {m.linkUrl ? (
                          <Row
                            label="Link"
                            value={
                              <a
                                className="underline underline-offset-2"
                                href={m.linkUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {m.linkUrl}
                              </a>
                            }
                          />
                        ) : null}
                      </dl>

                      {m.linkUrl || m.phone ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {m.linkUrl ? (
                            <a
                              href={m.linkUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex h-9 items-center justify-center rounded-full bg-foreground px-4 text-xs font-semibold text-background transition hover:opacity-90"
                            >
                              Hap pagesën
                            </a>
                          ) : null}
                          {m.phone ? (
                            <a
                              href={`tel:${m.phone.replace(/\s+/g, "")}`}
                              className="inline-flex h-9 items-center justify-center rounded-full border border-border/70 bg-background px-4 text-xs font-semibold transition hover:bg-muted"
                            >
                              Thirr tani
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </MotionCard>
                  ))}
                </div>
              )}
            </div>
            <aside className="grid gap-4 lg:sticky lg:top-6">
              <MotionCard className="overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
                <div className="relative h-56 w-full">
                  <Image
                    src="/donation.webp"
                    alt="Donacion"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-sm font-medium text-zinc-100">
                    “Kush jep një të mirë sa një grimcë, do ta shohë atë.”
                  </div>
                </div>
              </MotionCard>

              <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
                <div className="text-sm font-semibold">Pse të dhurosh?</div>
                <div className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground">
                  <p>Donacionet mbështesin mirëmbajtjen e xhamisë dhe shërbimet për xhematin.</p>
                  <p>Kontributi yt ndihmon projekte edukative, humanitare dhe komunitare.</p>
                </div>
              </MotionCard>

              <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
                <div className="text-sm font-semibold">Keni pyetje për donacion?</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Për donacione specifike, iftare, renovime ose pajisje, na
                  kontakto dhe koordinojmë mënyrën më të mirë.
                </p>
                <Link
                  href="/kontakt"
                  className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-xs font-semibold text-background transition hover:opacity-90"
                >
                  Na kontakto
                </Link>
              </MotionCard>
            </aside>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Transparencë"
              text="Mund të publikohen raporte mujore/vjetore për përdorimin e mjeteve dhe objektivat e projekteve."
            />
            <InfoCard
              title="Organizim"
              text="Metodat e donacionit janë të ndara qartë për pagesa bankare, online dhe kontakt direkt."
            />
            <InfoCard
              title="Fokus komunitar"
              text="Donacionet synojnë mirëmbajtjen e xhamisë, edukimin dhe aktivitetet në shërbim të lagjes."
            />
          </div>
        </Container>
      </MotionSection>
    </main>
  );
}

function methodType(m: {
  bankName: string | null;
  iban: string | null;
  swift: string | null;
  linkUrl: string | null;
  phone: string | null;
}) {
  if (m.linkUrl) return "Online";
  if (m.bankName || m.iban || m.swift) return "Bankë";
  if (m.phone) return "Kontakt";
  return "Donacion";
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/12 bg-white/5 px-3 py-2">
      <span className="text-zinc-300">{label}</span>
      <span className="font-semibold text-zinc-100">{value}</span>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-sm leading-6 text-muted-foreground">{text}</div>
    </MotionCard>
  );
}

