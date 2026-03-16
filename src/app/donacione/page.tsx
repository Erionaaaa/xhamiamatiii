import Image from "next/image";
import { Container } from "@/components/site/Container";
import { prisma } from "@/lib/prisma";
import { MotionSection, MotionCard } from "@/components/site/motion";

export const metadata = {
  title: "Donacione — Xhamia Mati 1",
};

export default async function DonationsPage() {
  const methods = await prisma.donationMethod.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Donacione</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Faleminderit për mbështetjen tuaj. Më poshtë janë mënyrat e dhurimit.
                Ky seksion mund të zgjerohet me listë donatorësh, transparencë
                mujore/vjetore, dhe raporte.
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              Shembujt janë demo • zëvendësoji me të dhëna reale
            </div>
          </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="grid gap-4 md:grid-cols-2">
          {methods.map((m) => (
            <MotionCard
              key={m.id}
              className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm"
            >
              <div className="text-base font-semibold tracking-tight">
                {m.title}
              </div>
              {m.description ? (
                <div className="mt-2 text-sm leading-6 text-muted-foreground">
                  {m.description}
                </div>
              ) : null}

              <dl className="mt-4 grid gap-2 text-sm">
                {m.bankName ? (
                  <Row label="Banka" value={m.bankName} />
                ) : null}
                {m.accountName ? (
                  <Row label="Përfituesi" value={m.accountName} />
                ) : null}
                {m.iban ? <Row label="IBAN" value={m.iban} /> : null}
                {m.swift ? <Row label="SWIFT" value={m.swift} /> : null}
                {m.phone ? <Row label="Telefon" value={m.phone} /> : null}
                {m.linkUrl ? (
                  <Row
                    label="Link"
                    value={
                      <a
                        className="underline"
                        href={m.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Hap
                      </a>
                    }
                  />
                ) : null}
              </dl>
            </MotionCard>
          ))}
        </div>

          <MotionCard className="overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
            <div className="relative h-56 w-full">
              <Image
                src="/donation.webp"
                alt="Donacion"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-sm font-medium text-zinc-100">
                “Kush jep një të mirë sa një grimcë, do ta shohë atë.” (Kur’an)
              </div>
            </div>
          </MotionCard>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
            <div className="text-sm font-semibold">Pse të dhurosh?</div>
            <div className="mt-2 text-sm leading-6 text-muted-foreground">
              Donacionet ndihmojnë në mirëmbajtjen e xhamisë dhe shërbimet për
              xhematin.
            </div>
          </MotionCard>
          <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
            <div className="text-sm font-semibold">Transparencë</div>
            <div className="mt-2 text-sm leading-6 text-muted-foreground">
              Në fazën tjetër mund të shtojmë raporte mujore/vjetore dhe projekte
              me qëllime të qarta.
            </div>
          </MotionCard>
          <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
            <div className="text-sm font-semibold">Donacione specifike</div>
            <div className="mt-2 text-sm leading-6 text-muted-foreground">
              Për aksione humanitare, iftare, renovime, ose pajisje—na kontakto
              për koordinim.
            </div>
          </MotionCard>
        </div>

        <div className="mt-10 rounded-3xl border border-border/70 bg-muted p-6 text-sm text-muted-foreground">
          Për një përvojë edhe më profesionale (në fazën tjetër), mund të shtojmë:
          panel administrimi, verifikim donatorësh, “campaigns”, dhe integrim me
          pagesa online.
        </div>
        </Container>
      </MotionSection>
    </main>
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

