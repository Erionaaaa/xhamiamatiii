export function getYouTubeId(url: string): string | null {
  const input = url.trim();
  if (!input) return null;

  // Accept both raw IDs and URL formats users commonly paste from YouTube.
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }

  const normalized = /^https?:\/\//i.test(input) ? input : `https://${input}`;

  try {
    const u = new URL(normalized);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/").filter(Boolean);
    const embedIdx = parts.indexOf("embed");
    if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
    const shortsIdx = parts.indexOf("shorts");
    if (shortsIdx >= 0 && parts[shortsIdx + 1]) return parts[shortsIdx + 1];
    const liveIdx = parts.indexOf("live");
    if (liveIdx >= 0 && parts[liveIdx + 1]) return parts[liveIdx + 1];
  } catch {

  }
  return null;
}

