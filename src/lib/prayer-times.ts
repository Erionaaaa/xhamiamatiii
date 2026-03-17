import { z } from "zod";

const BislameResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    data: z.object({
      Date: z.string().optional(),
      data_e_formatuar: z.string().optional(),
      Sabahu: z.string(),
      Lindja: z.string(),
      Dreka: z.string(),
      Ikindia: z.string(),
      Akshami: z.string(),
      Jacia: z.string(),
    }),
  }),
});

const AladhanResponseSchema = z.object({
  data: z.object({
    timings: z.record(z.string(), z.string()),
    date: z
      .object({
        readable: z.string().optional(),
        gregorian: z.object({ date: z.string().optional() }).optional(),
      })
      .optional(),
    meta: z
      .object({
        timezone: z.string().optional(),
      })
      .optional(),
  }),
});

export type PrayerTimes = {
  dateLabel: string;
  locationLabel: string;
  timezone?: string;
  timings: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
};

const PRISHTINA = {
  locationLabel: "Prishtinë",
  latitude: "42.6629",
  longitude: "21.1655",
  timezone: "Europe/Belgrade",
  method: "13",
};

const FALLBACK_TIMINGS: PrayerTimes["timings"] = {
  fajr: "05:00",
  sunrise: "06:30",
  dhuhr: "12:00",
  asr: "15:30",
  maghrib: "18:00",
  isha: "19:30",
};

const PROVIDER_TIMEOUT_MS = 4500;

function pickTime(timings: Record<string, string>, key: string) {
  const v = timings[key] ?? timings[key.toLowerCase()] ?? "";
  return v.split(" ")[0] ?? v;
}

function fallbackPrayerTimes(): PrayerTimes {
  return {
    dateLabel: "Sot",
    locationLabel: PRISHTINA.locationLabel,
    timezone: PRISHTINA.timezone,
    timings: FALLBACK_TIMINGS,
  };
}

function normalizeTimeZone(tz?: string) {
  if (!tz) return PRISHTINA.timezone;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return tz;
  } catch {
    return PRISHTINA.timezone;
  }
}

function normalizeHm(raw: string) {
  const [hRaw, mRaw] = raw.trim().split(":");
  const h = parseInt(hRaw ?? "", 10);
  const m = parseInt(mRaw ?? "", 10);
  if (Number.isNaN(h) || Number.isNaN(m)) {
    return raw.trim();
  }
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

async function fetchJsonWithTimeout(
  input: string,
  init: RequestInit,
  timeoutMs = PROVIDER_TIMEOUT_MS,
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(input, {
      ...init,
      signal: controller.signal,
    });

    if (!res.ok) {
      return null;
    }

    return (await res.json()) as unknown;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchPrayerTimesFromBislame(): Promise<PrayerTimes | null> {
  try {
    const raw = await fetchJsonWithTimeout(
      "https://bislame.com/wp-admin/admin-ajax.php?action=prayer_times",
      {
        next: { revalidate: 30 * 60 }, // cache for 30 min
      },
      3500,
    );

    if (!raw) {
      return null;
    }

    const parsed = BislameResponseSchema.safeParse(raw);
    if (!parsed.success) {
      return null;
    }

    const json = parsed.data;
    if (!json.success) {
      return null;
    }

    const t = json.data.data;
    return {
      dateLabel: t.data_e_formatuar ?? t.Date ?? "Sot",
      locationLabel: PRISHTINA.locationLabel,
      timezone: PRISHTINA.timezone,
      timings: {
        fajr: normalizeHm(t.Sabahu),
        sunrise: normalizeHm(t.Lindja),
        dhuhr: normalizeHm(t.Dreka),
        asr: normalizeHm(t.Ikindia),
        maghrib: normalizeHm(t.Akshami),
        isha: normalizeHm(t.Jacia),
      },
    };
  } catch (error) {
    console.warn("BIK prayer times request failed", error);
    return null;
  }
}

async function fetchPrayerTimesFromAladhan(): Promise<PrayerTimes | null> {
  try {
    const url = new URL("https://api.aladhan.com/v1/timings");
    url.searchParams.set("latitude", PRISHTINA.latitude);
    url.searchParams.set("longitude", PRISHTINA.longitude);
    url.searchParams.set("method", PRISHTINA.method);
    url.searchParams.set("timezonestring", PRISHTINA.timezone);

    const raw = await fetchJsonWithTimeout(
      url.toString(),
      {
        next: { revalidate: 60 * 60 }, // cache for 1h
      },
      4500,
    );

    if (!raw) {
      return null;
    }

    const parsed = AladhanResponseSchema.safeParse(raw);
    if (!parsed.success) {
      return null;
    }

    const json = parsed.data;
    const t = json.data.timings;

    return {
      dateLabel:
        json.data.date?.readable ??
        json.data.date?.gregorian?.date ??
        "Sot",
      locationLabel: PRISHTINA.locationLabel,
      timezone: normalizeTimeZone(json.data.meta?.timezone),
      timings: {
        fajr: pickTime(t, "Fajr"),
        sunrise: pickTime(t, "Sunrise"),
        dhuhr: pickTime(t, "Dhuhr"),
        asr: pickTime(t, "Asr"),
        maghrib: pickTime(t, "Maghrib"),
        isha: pickTime(t, "Isha"),
      },
    };
  } catch (error) {
    console.warn("Aladhan prayer times request failed", error);
    return null;
  }
}

export async function getPrayerTimesForPrishtina(): Promise<PrayerTimes> {
  const bikPromise = fetchPrayerTimesFromBislame();
  const aladhanPromise = fetchPrayerTimesFromAladhan();

  const bik = await bikPromise;
  if (bik) {
    return bik;
  }

  const aladhan = await aladhanPromise;
  if (aladhan) {
    return aladhan;
  }

  console.warn("Prayer times providers failed; using static fallback timings");
  return fallbackPrayerTimes();
}

