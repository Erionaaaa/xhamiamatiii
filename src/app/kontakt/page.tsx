import Image from "next/image";
import { Container } from "@/components/site/Container";
import { prisma } from "@/lib/prisma";
import { MotionSection, MotionCard } from "@/components/site/motion";

export const metadata = {
  title: "Kontakti — Xhamia Mati 1",
};

export default async function ContactPage() {
  const info = await prisma.mosqueInfo.findFirst();

  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
            <div className="absolute inset-0">
              <Image src="/contact.jpg" alt="Kontakti" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
            </div>
            <div className="relative p-8 text-zinc-50">
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-200">
                Kontakti
              </div>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight">
                Na kontaktoni
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-200">
                Për pyetje, sugjerime ose bashkëpunim, na shkruani mesazh ose na
                gjeni në adresë.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start">
            <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
              <div className="text-base font-semibold tracking-tight">
                Na dërgo mesazh
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Plotëso formularin dhe do të të kontaktojmë sa më shpejt.
              </p>
              <form className="mt-5 grid gap-3" method="POST" action="/api/contact">
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className="h-11 rounded-2xl border border-border/70 bg-background px-4 text-sm outline-none ring-0 transition focus:border-foreground/40"
                    placeholder="Emri"
                    name="name"
                    required
                  />
                  <input
                    className="h-11 rounded-2xl border border-border/70 bg-background px-4 text-sm outline-none ring-0 transition focus:border-foreground/40"
                    placeholder="Email"
                    name="email"
                    type="email"
                    required
                  />
                </div>
                <textarea
                  className="min-h-[140px] rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none ring-0 transition focus:border-foreground/40"
                  placeholder="Mesazhi"
                  name="message"
                  required
                />
                <input type="hidden" name="context" value="kontakt" />
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-90"
                >
                  Dërgo mesazhin
                </button>
                <div className="text-xs text-muted-foreground">
                  Mesazhi dërgohet në emailin e kontaktit (konfiguro `CONTACT_EMAIL`
                  dhe SMTP kur të jeni gati).
                </div>
              </form>
            </MotionCard>

            <div className="grid gap-4">
              <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
                <div className="text-sm font-semibold">Të dhënat e kontaktit</div>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Adresa</dt>
                    <dd className="font-medium">{info?.address ?? "Prishtinë, Kosovë"}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Telefoni</dt>
                    <dd className="font-medium">{info?.phone ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Email</dt>
                    <dd className="font-medium">{info?.email ?? "—"}</dd>
                  </div>
                </dl>
              </MotionCard>

              <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
                <div className="text-sm font-semibold">Rrjetet sociale</div>
                <div className="mt-3 grid gap-2 text-sm">
                  {info?.facebookUrl ? (
                    <a className="underline underline-offset-2" href={info.facebookUrl} target="_blank" rel="noreferrer">
                      Facebook
                    </a>
                  ) : null}
                  {info?.youtubeUrl ? (
                    <a className="underline underline-offset-2" href={info.youtubeUrl} target="_blank" rel="noreferrer">
                      YouTube
                    </a>
                  ) : null}
                  {info?.instagramUrl ? (
                    <a className="underline underline-offset-2" href={info.instagramUrl} target="_blank" rel="noreferrer">
                      Instagram
                    </a>
                  ) : null}
                  {!info?.facebookUrl && !info?.youtubeUrl && !info?.instagramUrl ? (
                    <div className="text-muted-foreground">—</div>
                  ) : null}
                </div>
              </MotionCard>

              <MotionCard className="overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
                <div className="p-6">
                  <div className="text-sm font-semibold">Harta</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Lokacioni i xhamisë në Google Maps.
                  </div>
                </div>
                <div className="aspect-[16/10] w-full border-t border-border/70 bg-muted">
                  <iframe
                    title="Harta"
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.3198032154885!2d21.1876407!3d42.656702699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ed4bdf761f7%3A0x8ab5c87464643f47!2sXhamia%20Hoxh%C3%AB%20Shuajb%20Arnauti%20-%20Mati%201!5e0!3m2!1sen!2s!4v1710172800000"
                  />
                </div>
              </MotionCard>
            </div>
          </div>
        </Container>
      </MotionSection>
    </main>
  );
}

