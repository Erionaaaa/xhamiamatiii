import Image from "next/image";
import { Container } from "@/components/site/Container";
import { MotionSection, MotionCard } from "@/components/site/motion";
import { FaqItem } from "@/components/site/FaqItem";

export const metadata = {
  title: "Pyetje të shpeshta (FAQ) — Xhamia Mati 1",
  description:
    "Pyetje dhe përgjigje të shkurtra rreth Xhamisë Mati 1 në Prishtinë dhe tema bazë të islamit: vizita në xhami, orari i namazit, rregullat e xhumasë, ramazani, abdesi, namazi dhe më shumë.",
  alternates: {
    canonical: "/faqs",
  },
};

type Faq = {
  q: string;
  a: string;
  tags: Array<"Xhamia" | "Vizita" | "Namazi" | "Ramazani" | "Bazat e Islamit" | "Kontakt" | "Donacione">;
};

const FAQS: Faq[] = [
  {
    q: "Ku gjendet Xhamia “Mati 1” në Prishtinë dhe si mund të vij deri te ajo?",
    a: "Faqja “Xhamia” ka informacionin kryesor (adresa/kontakti). Nëse e keni të aktivizuar adresën, përdorni atë si pikënisje në Google Maps. Nëse jo, na shkruani te “Kontakt” dhe ju udhëzojmë menjëherë.",
    tags: ["Xhamia", "Vizita", "Kontakt"],
  },
  {
    q: "A mund të vij në xhami në çdo kohë?",
    a: "Zakonisht xhamitë janë të hapura rreth vakteve të namazit. Për vizita jashtë vakteve (p.sh. grupet), është më mirë të na kontaktoni paraprakisht që të sigurohet pritja dhe qetësia në ambient.",
    tags: ["Vizita", "Kontakt"],
  },
  {
    q: "Çfarë duhet të vesh kur hyj në xhami?",
    a: "Veshje e rregullt dhe modeste. Këpucët hiqen para hyrjes në sallën e faljes. Për motra/gratë zakonisht kërkohet mbulim i flokëve dhe veshje që mbulon trupin; nëse s’keni shami me vete, shpesh gjendet në xhami.",
    tags: ["Vizita", "Bazat e Islamit"],
  },
  {
    q: "A ka hapësirë të veçantë për motrat/gratë?",
    a: "Në shumë xhami ka sektor të dedikuar për motrat. Nëse është hera e parë, pyesni dikë te hyrja — do t’ju udhëzojnë ku është hyrja/sektori përkatës.",
    tags: ["Xhamia", "Vizita"],
  },
  {
    q: "Si ta shoh orarin e namazit për Prishtinë?",
    a: "Te faqja “Orari i namazit” shfaqen kohët ditore për Prishtinë dhe numërimi për namazin e radhës. Mund ta ruani faqen në telefon si “shortcut” për përdorim të shpejtë.",
    tags: ["Namazi"],
  },
  {
    q: "Pse oraret e namazit ndonjëherë dallojnë pak mes faqeve/aplikacioneve?",
    a: "Dallimet e vogla vijnë nga metoda e llogaritjes, parametra lokalë dhe burimi. Në këtë web, orari merret nga BIK (bislame.com) me rezervë alternative, prandaj mund të ketë devijime minimale.",
    tags: ["Namazi"],
  },
  {
    q: "Kur është xhumaja dhe çfarë duhet të di si fillestar?",
    a: "Xhumaja falet të premten në kohën e drekës (Dhuhr), me hutbe para namazit. E këshillueshme: të vini më herët, të uleni qetë, të mos flitet gjatë hutbes dhe të keni telefonin në heshtje.",
    tags: ["Namazi", "Vizita"],
  },
  {
    q: "A mund të falem në xhami nëse nuk i di të gjitha suret?",
    a: "Po. Mund të faleni duke mësuar gradualisht. Nëse nuk dini leximet, mund të faleni pas imam-it në xhemat (p.sh. në xhami), ose të mësoni pjesët bazë hap pas hapi. Te “Orari i namazit” ka edhe udhëzues të shkurtër për fillestarë.",
    tags: ["Namazi", "Bazat e Islamit"],
  },
  {
    q: "Çfarë është abdesi (wudu) dhe pse është i rëndësishëm?",
    a: "Abdesi është pastrim ritual para namazit. Ai përfshin larje të pjesëve të caktuara të trupit me rregull. Në xhami zakonisht ka hapësirë të veçantë për abdes; nëse jeni i ri, kërkoni udhëzim — gjithmonë gjendet dikush që ndihmon.",
    tags: ["Bazat e Islamit", "Namazi"],
  },
  {
    q: "Çfarë duhet të bëj kur hyj në sallën e faljes?",
    a: "Hyni qetë, hiqni këpucët, vendosni në raftet përkatëse, dhe nëse është koha e namazit farz/sunet, faluni me qetësi. Respektoni rreshtat dhe mos kaloni para atij që falet.",
    tags: ["Vizita", "Namazi"],
  },
  {
    q: "A ka ligjërata/vaaze dhe ku i gjej online?",
    a: "Po. Te seksioni “Video” gjeni ligjërata të organizuara sipas kategorive. Mund t’i ndani me familjen ose t’i ruani për t’i dëgjuar më vonë.",
    tags: ["Xhamia"],
  },
  {
    q: "Çfarë është Ramazani dhe si përgatitem si fillestar?",
    a: "Ramazani është muaji i agjërimit. Filloni me nijetin, mësoni rregullat bazë (çfarë e prish agjërimin), organizoni syfyrin/iftarin dhe përpiquni të shtoni lexim Kur’ani dhe namaz nate. Për pyetje specifike, kontaktoni imamin.",
    tags: ["Ramazani", "Bazat e Islamit", "Kontakt"],
  },
  {
    q: "A organizohen iftare, sadaka ose aksione humanitare?",
    a: "Në varësi të periudhës (sidomos në Ramazan), organizohen iniciativa komunitare. Ndiqni “Aktivitete” për njoftime dhe “Donacione” nëse webi e ofron mundësinë e kontributit.",
    tags: ["Ramazani", "Donacione", "Xhamia"],
  },
  {
    q: "Si mund të jap donacion për xhaminë?",
    a: "Nëse është e aktivizuar, faqja “Donacione” ofron mënyrat e kontributit. Për alternativa (p.sh. në vend), na kontaktoni dhe ju udhëzojmë sipas mundësive.",
    tags: ["Donacione", "Kontakt"],
  },
  {
    q: "A mund të bëj pyetje fetare personalisht ose online?",
    a: "Po. Pyetjet specifike (p.sh. rreth rregullave të adhurimeve ose situatave personale) i trajtojmë më së miri përmes “Kontakt”. Në web kemi edhe “Akademia” me materiale edukative për lexim.",
    tags: ["Kontakt", "Bazat e Islamit"],
  },
  {
    q: "Çfarë është shahadeti dhe pse është themeli i islamit?",
    a: "Shahadeti është dëshmia: “Nuk ka të adhuruar me të drejtë përveç Allahut dhe Muhamedi është i dërguari i Tij.” Ajo është hyrja në islam dhe baza e besimit.",
    tags: ["Bazat e Islamit"],
  },
  {
    q: "Cilat janë 5 shtyllat e islamit (shkurt)?",
    a: "Shahadeti, namazi, zekati, agjërimi i Ramazanit dhe haxhi (për ata që kanë mundësi). Këto janë shtyllat praktike që e strukturojnë jetën e muslimanit.",
    tags: ["Bazat e Islamit"],
  },
  {
    q: "Si të jem i sigurt për informacionin fetar që lexoj online?",
    a: "Kërko burime të besueshme, shmang përmbajtjen sensacionale dhe, kur ka paqartësi, pyet një imam/mësues të njohur. Ky web synon udhëzim praktik, por nuk zëvendëson këshillimin fetar për raste të veçanta.",
    tags: ["Bazat e Islamit", "Kontakt"],
  },
];

const TAGS: Array<Faq["tags"][number]> = [
  "Xhamia",
  "Vizita",
  "Namazi",
  "Ramazani",
  "Bazat e Islamit",
  "Donacione",
  "Kontakt",
];

function buildFaqSchema(faqs: Faq[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
    url: `${baseUrl}/faqs`,
    inLanguage: "sq-XK",
  };
}

export default function FaqsPage() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");
  const schema = buildFaqSchema(FAQS, baseUrl);

  const grouped = TAGS.map((tag) => ({
    tag,
    items: FAQS.filter((f) => f.tags.includes(tag)),
  })).filter((g) => g.items.length > 0);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <MotionSection>
        <Container className="py-10 md:py-14">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-border/70 bg-background shadow-sm shadow-black/5">
            <div className="absolute inset-0">
              <Image
                src="/inside.jpg"
                alt="Pyetje të shpeshta"
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(4,12,28,0.86),rgba(4,12,28,0.58)_42%,rgba(4,12,28,0.24)_72%,rgba(4,12,28,0.12))]" />
            </div>
            <div className="relative grid gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-end">
              <div className="text-zinc-50">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-100 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Qartësi • orientim • komunitet
                </div>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                  Pyetje të shpeshta (FAQ)
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-200 sm:text-base">
                  Këtu gjeni përgjigje të shkurtra e praktike rreth Xhamisë “Mati 1”
                  dhe bazave të islamit. Për çështje specifike personale, na shkruani
                  te kontaktet.
                </p>
                <div className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-zinc-200/90">
                  Hap kategorinë që të intereson dhe zgjero pyetjet një nga një.
                </div>
              </div>

              <div className="grid gap-4 rounded-3xl border border-white/20 bg-[linear-gradient(160deg,rgba(255,255,255,0.18),rgba(255,255,255,0.07))] p-5 text-sm text-zinc-100 backdrop-blur-md">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  Kategori
                </div>
                <div className="flex flex-wrap gap-2">
                  {grouped.map((g) => (
                    <a
                      key={g.tag}
                      href={`#${encodeURIComponent(g.tag)}`}
                      className="rounded-full border border-white/30 bg-white/12 px-3 py-1.5 text-xs font-semibold text-white/95 transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      {g.tag} <span className="text-white/65">({g.items.length})</span>
                    </a>
                  ))}
                </div>
                <div className="rounded-2xl border border-white/15 bg-black/25 px-3 py-2 text-xs text-white/80">
                  Këshillë: hap një pyetje dhe ruaje këtë faqe për përdorim të shpejtë.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-5 sm:space-y-6">
            {grouped.map((group) => (
              <MotionCard
                key={group.tag}
                className="relative overflow-hidden rounded-[1.7rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.78))] p-5 shadow-sm shadow-black/5 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.78),rgba(2,6,23,0.72))] sm:p-6"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.10),transparent_42%)]" />
                <div
                  id={encodeURIComponent(group.tag)}
                  className="relative scroll-mt-24 text-sm font-semibold uppercase tracking-[0.1em] text-foreground/90"
                >
                  {group.tag}
                </div>
                <div className="relative mt-3 divide-y divide-border/70 rounded-2xl border border-border/50 bg-background/65 px-3 sm:px-4">
                  {group.items.map((item) => (
                    <FaqItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </MotionCard>
            ))}
          </div>
        </Container>
      </MotionSection>
    </main>
  );
}

