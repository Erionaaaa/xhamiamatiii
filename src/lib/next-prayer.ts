import type { PrayerTimes } from "@/lib/prayer-times";

function parseGmtOffsetToMinutes(tzName: string) {

  const m = /(GMT|UTC)([+-])(\d{1,2})(?::?(\d{2}))?/.exec(tzName);
  if (!m) return 0;
  const sign = m[2] === "-" ? -1 : 1;
  const hours = parseInt(m[3] ?? "0", 10);
  const minutes = parseInt(m[4] ?? "0", 10);
  return sign * (hours * 60 + minutes);
}

function getTimeZoneOffsetMinutes(timeZone: string, date: Date) {
  
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
    hour: "2-digit",
  }).formatToParts(date);
  const tzName = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+0";
  return parseGmtOffsetToMinutes(tzName);
}

function getNowPartsInZone(timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";

  return {
    year: parseInt(get("year"), 10),
    month: parseInt(get("month"), 10),
    day: parseInt(get("day"), 10),
    hour: parseInt(get("hour"), 10),
    minute: parseInt(get("minute"), 10),
    second: parseInt(get("second"), 10),
  };
}

function isoForTodayInZoneAt(timeZone: string, hour: number, minute: number) {
  const nowParts = getNowPartsInZone(timeZone);
  const approxUtc = new Date(
    Date.UTC(nowParts.year, nowParts.month - 1, nowParts.day, hour, minute, 0, 0),
  );
  const offsetMin = getTimeZoneOffsetMinutes(timeZone, approxUtc);
  const utcMillis =
    Date.UTC(nowParts.year, nowParts.month - 1, nowParts.day, hour, minute, 0, 0) -
    offsetMin * 60_000;
  return new Date(utcMillis).toISOString();
}

export function getNextPrayer(
  timings: PrayerTimes["timings"],
  timeZone: string,
) {
  const order: { key: keyof PrayerTimes["timings"]; label: string }[] = [
    { key: "fajr", label: "Sabahu" },
    { key: "dhuhr", label: "Dreka" },
    { key: "asr", label: "Ikindia" },
    { key: "maghrib", label: "Akshami" },
    { key: "isha", label: "Jacia" },
  ];

  
  const nowZ = getNowPartsInZone(timeZone);
  const nowMinutes = nowZ.hour * 60 + nowZ.minute + nowZ.second / 60;

  for (const item of order) {
    const [h, m] = timings[item.key].split(":").map((x) => parseInt(x, 10));
    if (Number.isNaN(h) || Number.isNaN(m)) continue;
    const targetMinutes = h * 60 + m;
    if (targetMinutes > nowMinutes) {
      return {
        label: item.label,
        iso: isoForTodayInZoneAt(timeZone, h, m),
      };
    }
  }

  return null;
}

