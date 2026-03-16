import { Container } from "@/components/site/Container";
import { MotionSection, MotionCard } from "@/components/site/motion";
import { QUOTES } from "@/lib/quotes";

export const metadata = {
  title: "Ajete & Duate — Xhamia Mati 1",
};

export default function AjetePage() {
  return (
    <main>
      <MotionSection>
        <Container className="py-12">
          <h1 className="text-3xl font-semibold tracking-tight">
            Ajete & Duate
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Përmbledhje e ajeteve, lutjeve (duave) dhe thënieve të shkurtra, për
            t’u lexuar e përkujtuar çdo ditë.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {QUOTES.map((q, idx) => (
              <MotionCard
                key={`${q.ref}-${idx}`}
                className="rounded-3xl border border-border/70 bg-background p-6 shadow-sm"
              >
                <div className="inline-flex rounded-full border border-border/70 bg-muted px-3 py-1 text-xs font-semibold">
                  {q.kind}
                </div>
                <div className="mt-4 text-lg leading-8 tracking-tight">
                  {q.ar}
                </div>
                <div className="mt-3 text-sm leading-6 text-muted-foreground">
                  {q.sq}
                </div>
                <div className="mt-4 text-xs font-medium text-muted-foreground">
                  {q.ref}
                </div>
              </MotionCard>
            ))}
          </div>
        </Container>
      </MotionSection>
    </main>
  );
}

