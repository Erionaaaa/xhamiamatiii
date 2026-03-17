import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/site/Container";
import { MotionSection, MotionCard } from "@/components/site/motion";
import { prisma } from "@/lib/prisma";
import { isAdminLoggedInAsync } from "@/lib/admin-auth";

export default async function AdminDashboardPage() {
  if (!(await isAdminLoggedInAsync())) {
    redirect("/admin/login");
  }

  const [mosque, videoCount, academyCount, activityCount] =
    await Promise.all([
      prisma.mosqueInfo.findFirst(),
      prisma.video.count(),
      prisma.academyPost.count(),
      prisma.activity.count(),
    ]);

  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Paneli i administrimit
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Menaxho informacionin kryesor të faqes: për xhaminë, video, Akademinë,
                aktivitetet dhe donacionet.
              </p>
            </div>
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="inline-flex h-9 items-center justify-center rounded-full border border-border/70 bg-background px-4 text-xs font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                Dil nga paneli
              </button>
            </form>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-5">
            <StatCard label="Video" value={videoCount} href="/admin/video" />
            <StatCard label="Akademia" value={academyCount} href="/akademia" />
            <StatCard
              label="Aktivitete"
              value={activityCount}
              href="/admin/aktivitete"
            />
            <StatCard label="Info xhamie" value={1} href="/admin/mosque" />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
            <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold">Info për xhaminë</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Këto të dhëna shfaqen në ballinë, faqen “Xhamia” dhe në footer.
                  </div>
                </div>
                <Link
                  href="/admin/mosque"
                  className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Redakto →
                </Link>
              </div>
              <dl className="mt-4 grid gap-2 text-sm">
                <div>
                  <dt className="text-muted-foreground">Emri</dt>
                  <dd className="font-medium">
                    {mosque?.name ?? "Xhamia Mati 1"}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Qyteti</dt>
                  <dd className="font-medium">
                    {mosque?.city ?? "Prishtinë"}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Adresa</dt>
                  <dd className="font-medium">
                    {mosque?.address ?? "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Kontakt</dt>
                  <dd className="font-medium">
                    {mosque?.phone ?? "—"}{" "}
                    {mosque?.email ? ` • ${mosque.email}` : ""}
                  </dd>
                </div>
              </dl>
            </MotionCard>

            <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 text-sm text-muted-foreground shadow-sm">
              <div className="text-sm font-semibold text-foreground">
                Çka mund të bësh nga ky panel?
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-4">
                <li>Ndrysho informacionin bazë të xhamisë.</li>
                <li>Menaxho videot dhe aktivitetet nga paneli admin.</li>
                <li>Ndrysho fotot e aktiviteteve pa ndërhyrje në kod.</li>
              </ul>
            </MotionCard>
          </div>
        </Container>
      </MotionSection>
    </main>
  );
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <MotionCard className="rounded-3xl border border-border/70 bg-background p-4 text-sm shadow-sm">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      <Link
        href={href}
        className="mt-2 inline-flex text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        Hap faqen →
      </Link>
    </MotionCard>
  );
}

