import Image from "next/image";
import { Container } from "@/components/site/Container";
import { ContactForm } from "@/components/site/ContactForm";
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

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <MotionCard className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm">
              <div className="text-base font-semibold tracking-tight">
                Na dërgo mesazh
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Plotëso formularin dhe do të të kontaktojmë sa më shpejt.
              </p>
              <div className="mt-5">
                <ContactForm recipientText="Mesazhi dërgohet te info@xhamia.com." />
              </div>
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
            </div>
          </div>

          <MotionCard className="mt-10 overflow-hidden rounded-3xl border border-border/70 bg-background shadow-sm">
            <div className="border-b border-border/70 p-6">
              <div className="text-sm font-semibold">Harta</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Lokacioni i xhamisë në Google Maps.
              </div>
            </div>
            <iframe
              title="Harta"
              className="block h-[420px] w-full lg:h-[520px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Xhamia%20Hoxh%C3%AB%20Shuajb%20Arnauti%20Mati%201%20Prishtin%C3%AB&t=&z=16&ie=UTF8&iwloc=&output=embed"
            />
          </MotionCard>
        </Container>
      </MotionSection>
    </main>
  );
}

