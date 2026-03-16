import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/site/Container";
import { prisma } from "@/lib/prisma";
import { MotionSection, MotionCard } from "@/components/site/motion";

export const metadata = {
  title: "Aktivitete — Xhamia Mati 1",
};

function formatDate(value?: Date | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("sq-AL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

function activityStatus(
  now: Date,
  startsAt?: Date | null,
  endsAt?: Date | null,
): "upcoming" | "ongoing" | "past" {
  if (startsAt && startsAt > now) return "upcoming";
  if (endsAt && endsAt < now) return "past";
  if (startsAt && startsAt <= now) return "ongoing";
  return "upcoming";
}

function statusLabel(status: "upcoming" | "ongoing" | "past") {
  if (status === "ongoing") return "Në zhvillim";
  if (status === "past") return "I përfunduar";
  return "Në vijim";
}

export default async function ActivitiesPage() {
  const items = await prisma.activity.findMany({
    where: { isActive: true },
    orderBy: [{ startsAt: "desc" }, { createdAt: "desc" }],
    take: 50,
  });

  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const normalized = items.map((item) => {
    const status = activityStatus(now, item.startsAt, item.endsAt);
    return { ...item, status };
  });

  const upcoming = normalized
    .filter((item) => item.status !== "past")
    .sort((a, b) => {
      const aTime = a.startsAt ? a.startsAt.getTime() : Number.MAX_SAFE_INTEGER;
      const bTime = b.startsAt ? b.startsAt.getTime() : Number.MAX_SAFE_INTEGER;
      return aTime - bTime;
    });

  const past = normalized
    .filter((item) => item.status === "past")
    .sort((a, b) => {
      const aTime = a.startsAt ? a.startsAt.getTime() : 0;
      const bTime = b.startsAt ? b.startsAt.getTime() : 0;
      return bTime - aTime;
    });

  const activeThisMonth = normalized.filter(
    (item) => (item.startsAt ?? item.createdAt) >= thisMonthStart,
  ).length;

  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Aksione & aktivitete
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Njoftime për aktivitete, aksione humanitare, ligjërata speciale
                dhe evente të xhamisë gjatë vitit.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <StatCard label="Totali" value={`${normalized.length}`} />
                <StatCard label="Në vijim" value={`${upcoming.length}`} />
                <StatCard label="Këtë muaj" value={`${activeThisMonth}`} />
              </div>

              {items.length === 0 ? (
                <div className="mt-8 rounded-3xl border border-border/70 bg-background p-6 text-sm text-muted-foreground shadow-sm">
                  Ende nuk ka aktivitete të publikuara.
                </div>
              ) : (
                <div className="mt-8 space-y-10">
                  <section>
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h2 className="text-base font-semibold">Në vijim</h2>
                      <span className="text-xs text-muted-foreground">
                        {upcoming.length} aktivitete
                      </span>
                    </div>
                    {upcoming.length === 0 ? (
                      <div className="rounded-3xl border border-border/70 bg-background p-6 text-sm text-muted-foreground shadow-sm">
                        Nuk ka aktivitete në vijim për momentin.
                      </div>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2">
                        {upcoming.map((a) => (
                          <ActivityCard
                            key={a.id}
                            slug={a.slug}
                            title={a.title}
                            summary={a.summary}
                            startsAt={a.startsAt}
                            endsAt={a.endsAt}
                            status={a.status}
                          />
                        ))}
                      </div>
                    )}
                  </section>

                  <section>
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h2 className="text-base font-semibold">Të kaluara</h2>
                      <span className="text-xs text-muted-foreground">
                        {past.length} aktivitete
                      </span>
                    </div>
                    {past.length === 0 ? (
                      <div className="rounded-3xl border border-border/70 bg-background p-6 text-sm text-muted-foreground shadow-sm">
                        Ende nuk ka aktivitete të kaluara.
                      </div>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2">
                        {past.slice(0, 12).map((a) => (
                          <ActivityCard
                            key={a.id}
                            slug={a.slug}
                            title={a.title}
                            summary={a.summary}
                            startsAt={a.startsAt}
                            endsAt={a.endsAt}
                            status={a.status}
                          />
                        ))}
                      </div>
                    )}
                  </section>
                </div>
              )}
            </div>

            <MotionCard className="overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
              <div className="relative h-60 w-full">
                <Image
                  src="/activities.jpg"
                  alt="Aktivitete në xhami"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-sm font-medium text-zinc-100">
                  Aksione humanitare, takime rinore dhe programe të ndryshme gjatë
                  vitit.
                </div>
              </div>
              <div className="space-y-3 p-5">
                <div className="text-sm font-semibold">Merr pjesë</div>
                <p className="text-sm leading-6 text-muted-foreground">
                  Për t&apos;u informuar për aktivitetet e reja, kontrollo rregullisht
                  këtë faqe ose na kontakto për pyetje.
                </p>
                <Link
                  href="/kontakt"
                  className="inline-flex h-10 w-full items-center justify-center rounded-full border border-border/70 bg-background px-4 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  Kontakto organizatorët
                </Link>
              </div>
            </MotionCard>
          </div>
        </Container>
      </MotionSection>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <MotionCard className="rounded-2xl border border-border/70 bg-background p-4 shadow-sm">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
    </MotionCard>
  );
}

function ActivityCard({
  slug,
  title,
  summary,
  startsAt,
  endsAt,
  status,
}: {
  slug: string;
  title: string;
  summary: string | null;
  startsAt: Date | null;
  endsAt: Date | null;
  status: "upcoming" | "ongoing" | "past";
}) {
  const from = formatDate(startsAt);
  const to = formatDate(endsAt);

  return (
    <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm transition hover:bg-muted">
      <Link href={`/aktivitete/${slug}`} className="block">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex rounded-full border border-border/70 bg-muted px-3 py-1 text-[11px] font-semibold text-muted-foreground">
            {statusLabel(status)}
          </span>
          {from ? (
            <span className="text-xs text-muted-foreground">
              {to ? `${from} - ${to}` : from}
            </span>
          ) : null}
        </div>
        <div className="mt-3 text-sm font-semibold tracking-tight">{title}</div>
        {summary ? (
          <div className="mt-2 line-clamp-3 text-sm text-muted-foreground">
            {summary}
          </div>
        ) : (
          <div className="mt-2 text-sm text-muted-foreground">
            Hap aktivitetin për më shumë detaje.
          </div>
        )}
      </Link>
    </MotionCard>
  );
}

