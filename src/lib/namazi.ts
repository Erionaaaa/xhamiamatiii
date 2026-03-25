export type PrayerKey = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
export type GuideKind = "farz" | "sunnet";

export type PrayerDefinition = {
  key: PrayerKey;
  label: string;
  subtitle: string;
  imageSrc: string;
  farzRakats: number;
  sunnetRakats: number;
  accentClassName: string;
};

export type GuideStep = {
  id: string;
  title: string;
  instruction: string;
};

export const PRAYERS: PrayerDefinition[] = [
  {
    key: "fajr",
    label: "Sabahu",
    subtitle: "2 Farz + 2 Sunnet",
    imageSrc: "/filliminamazit1.jpg",
    farzRakats: 2,
    sunnetRakats: 2,
    accentClassName: "from-sky-400 to-emerald-400",
  },
  {
    key: "dhuhr",
    label: "Dreka",
    subtitle: "4 Farz + 4 Sunnet",
    imageSrc: "/xhamiaa.png",
    farzRakats: 4,
    sunnetRakats: 4,
    accentClassName: "from-amber-300 to-orange-400",
  },
  {
    key: "asr",
    label: "Ikindia",
    subtitle: "4 Farz + 4 Sunnet",
    imageSrc: "/rukje1.jpg",
    farzRakats: 4,
    sunnetRakats: 4,
    accentClassName: "from-orange-400 to-rose-400",
  },
  {
    key: "maghrib",
    label: "Akshami",
    subtitle: "3 Farz + 2 Sunnet",
    imageSrc: "/sexhde.jpg",
    farzRakats: 3,
    sunnetRakats: 2,
    accentClassName: "from-rose-400 to-fuchsia-400",
  },
  {
    key: "isha",
    label: "Jacia",
    subtitle: "4 Farz + 2 Sunnet",
    imageSrc: "/perfundimi1.jpg",
    farzRakats: 4,
    sunnetRakats: 2,
    accentClassName: "from-indigo-400 to-sky-500",
  },
];

export function getPrayerByKey(key: PrayerKey) {
  return PRAYERS.find((p) => p.key === key) ?? PRAYERS[0];
}

export function buildGuideSteps({
  prayerLabel,
  kind,
  rakats,
}: {
  prayerLabel: string;
  kind: GuideKind;
  rakats: number;
}): GuideStep[] {
  const steps: GuideStep[] = [];

  const modeLabel = kind === "farz" ? "Farz" : "Sunnet";

  steps.push({
    id: `${kind}-intro`,
    title: `${prayerLabel} • ${modeLabel} — Nijeti & hyrja në namaz`,
    instruction:
      "Drejtohu nga kibla, bëje nijetin në zemër për këtë namaz. Ngriji duart deri te veshët/supet dhe thuaj: Allahu Ekber. Pastaj vendosi duart mbi gjoks dhe fillo leximin.",
  });

  for (let r = 1; r <= rakats; r++) {
    const isLastRakat = r === rakats;
    const isSecondRakat = r === 2;

    steps.push({
      id: `${kind}-${r}-qiyam`,
      title: `${prayerLabel} • ${modeLabel} • Rekati ${r}/${rakats} — Kijam & leximi`,
      instruction:
        "Qëndro drejt në këmbë (kijam). Lexo El-Fatihën; në rekatin 1 dhe 2 lexo edhe një sure të shkurtër. Pas leximit, thuaj Allahu Ekber dhe kalo në ruku.",
    });

    steps.push({
      id: `${kind}-${r}-ruku`,
      title: `${prayerLabel} • ${modeLabel} • Rekati ${r}/${rakats} — Ruku`,
      instruction:
        "Përkulu në ruku me shpinë sa më të drejtë, duart mbi gjunjë. Thuaj: Subhana rabbijel adhim (3 herë ose më shumë).",
    });

    steps.push({
      id: `${kind}-${r}-qawmah`,
      title: `${prayerLabel} • ${modeLabel} • Rekati ${r}/${rakats} — Ngrihu nga ruku`,
      instruction:
        "Ngrihu plotësisht nga ruku dhe thuaj: SemiAllahu limen hamideh, Rabbena ue lekel hamd. Qëndro pak drejt, pastaj kalo në sexhde.",
    });

    steps.push({
      id: `${kind}-${r}-sujud-1`,
      title: `${prayerLabel} • ${modeLabel} • Rekati ${r}/${rakats} — Sexhdeja e parë`,
      instruction:
        "Thuaj Allahu Ekber, zbrit në sexhde me ballë dhe hundë në tokë. Thuaj: Subhana rabbijel a'la (3 herë ose më shumë).",
    });

    steps.push({
      id: `${kind}-${r}-jalsa`,
      title: `${prayerLabel} • ${modeLabel} • Rekati ${r}/${rakats} — Uljë mes dy sexhdeve`,
      instruction:
        "Ulu mes dy sexhdeve (jalsa), thuaj Rabbigfir li dhe qëndro pak me qetësi.",
    });

    steps.push({
      id: `${kind}-${r}-sujud-2`,
      title: `${prayerLabel} • ${modeLabel} • Rekati ${r}/${rakats} — Sexhdeja e dytë`,
      instruction:
        "Bëj sexhden e dytë si të parën. Pastaj ngrihu për rekatin tjetër ose qëndro ulur për ettehijat sipas rendit.",
    });

    if (isSecondRakat && rakats > 2) {
      steps.push({
        id: `${kind}-${r}-tashahhud-first`,
        title: `${prayerLabel} • ${modeLabel} • Rekati ${r}/${rakats} — Ettehijati i parë`,
        instruction:
          "Pas rekatit të dytë ulu dhe lexo Ettehijatin. Pastaj ngrihu me Allahu Ekber për rekatin tjetër.",
      });
    }

    if (!isLastRakat) {
      steps.push({
        id: `${kind}-${r}-next`,
        title: `${prayerLabel} • ${modeLabel} • Rekati ${r}/${rakats} — Rekati tjetër`,
        instruction: "Ngrihu për rekatin tjetër. Përsërite të njëjtat hapa me radhë.",
      });
    }
  }

  steps.push({
    id: `${kind}-tashahhud`,
    title: `${prayerLabel} • ${modeLabel} — Ettehijati i fundit`,
    instruction:
      "Në uljen e fundit lexo Ettehijatin, salavatet (Allahumme salli...) dhe duatë përmbyllëse. Ruaj qetësinë para selamit.",
  });

  steps.push({
    id: `${kind}-salaam`,
    title: `${prayerLabel} • ${modeLabel} — Selami`,
    instruction: "Jep selam djathtas dhe majtas: “Es-selamu alejkum…”",
  });

  return steps;
}

