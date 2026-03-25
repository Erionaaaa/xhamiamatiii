import { Container } from "@/components/site/Container";
import { MotionSection } from "@/components/site/motion";
import { NamaziInteractive } from "@/components/site/NamaziInteractive";

export const metadata = {
  title: "Namazi shqip — Xhamia Mati 1",
  description:
    "Udhëzim interaktiv (vakti → Farz/Sunnet → si falet hap pas hapi) për t’i kuptuar 5 vaktet në mënyrë të thjeshtë.",
  alternates: {
    canonical: "/namazi",
  },
};

export default function NamaziPage() {
  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-background px-6 py-8 shadow-sm sm:px-8 lg:px-10">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.02))]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-foreground/60" />
                Namazi shqip (interaktiv)
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Kliko vakatin dhe ndiq hapat me “dove”
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Zgjidh një vakt, hape Farzin ose Sunnetin dhe ndiq
                “si falet” hap pas hapi me progres vizual.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.5rem] border border-border/70 bg-background/70 p-5 shadow-sm">
                  <div className="text-sm font-semibold">1) Zgjidh vakatin</div>
                  <div className="mt-2 text-sm leading-7 text-muted-foreground">
                    Kliko te fotoja (Sabahu, Dreka, Ikindia, Akshami, Jacia).
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-border/70 bg-background/70 p-5 shadow-sm">
                  <div className="text-sm font-semibold">2) Hap Farz ose Sunnet</div>
                  <div className="mt-2 text-sm leading-7 text-muted-foreground">
                    Te Farzi/Sunneti shfaqet numri i rekateve dhe "si falet".
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-border/70 bg-background/70 p-5 shadow-sm">
                  <div className="text-sm font-semibold">3) Ndiq hapin me “dove”</div>
                  <div className="mt-2 text-sm leading-7 text-muted-foreground">
                    Shigjeta/dove lëviz në progres dhe tregon çka bën çdo
                    lëvizje.
                  </div>
                </div>
              </div>

              <NamaziInteractive />
            </div>
          </div>
        </Container>
      </MotionSection>
    </main>
  );
}

