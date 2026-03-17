import { z } from "zod";

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

export async function getPrayerTimesForPrishtina(): Promise<PrayerTimes> {
  try {
    const url = new URL("https://api.aladhan.com/v1/timings");
    url.searchParams.set("latitude", PRISHTINA.latitude);
    url.searchParams.set("longitude", PRISHTINA.longitude);
    url.searchParams.set("method", PRISHTINA.method);
    url.searchParams.set("timezonestring", PRISHTINA.timezone);

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 * 60 }, // cache for 1h
    });

    if (!res.ok) {
      console.warn("Prayer times fetch failed; using fallback timings", {
        status: res.status,
        statusText: res.statusText,
      });
      return fallbackPrayerTimes();
    }

    const json = AladhanResponseSchema.parse(await res.json());
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
    console.warn("Prayer times request failed; using fallback timings", error);
    return fallbackPrayerTimes();
  }
}

