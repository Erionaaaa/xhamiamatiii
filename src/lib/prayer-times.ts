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
  latitude: "42.6629",
  longitude: "21.1655",
  timezone: "Europe/Belgrade",
  method: "13",
};

function pickTime(timings: Record<string, string>, key: string) {
  const v = timings[key] ?? timings[key.toLowerCase()] ?? "";
  return v.split(" ")[0] ?? v;
}

export async function getPrayerTimesForPrishtina(): Promise<PrayerTimes> {
  const url = new URL("https://api.aladhan.com/v1/timings");
  url.searchParams.set("latitude", PRISHTINA.latitude);
  url.searchParams.set("longitude", PRISHTINA.longitude);
  url.searchParams.set("method", PRISHTINA.method);
  url.searchParams.set("timezonestring", PRISHTINA.timezone);

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 * 60 }, // cache for 1h
  });
  if (!res.ok) throw new Error("Prayer times fetch failed");

  const json = AladhanResponseSchema.parse(await res.json());
  const t = json.data.timings;

  return {
    dateLabel:
      json.data.date?.readable ??
      json.data.date?.gregorian?.date ??
      "Sot",
    timezone: json.data.meta?.timezone ?? PRISHTINA.timezone,
    timings: {
      fajr: pickTime(t, "Fajr"),
      sunrise: pickTime(t, "Sunrise"),
      dhuhr: pickTime(t, "Dhuhr"),
      asr: pickTime(t, "Asr"),
      maghrib: pickTime(t, "Maghrib"),
      isha: pickTime(t, "Isha"),
    },
  };
}

