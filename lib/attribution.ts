/**
 * First-touch campaign attribution for paid-search traffic.
 *
 * Reads UTM / click-id params from the landing URL, persists them for the
 * session (so they survive in-page navigation and a reload) and returns them
 * for the lead payload. Never throws: storage can be blocked (private mode,
 * strict cookie settings) and attribution must never break the form.
 */

const PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

export type AttributionKey = (typeof PARAM_KEYS)[number];

export type Attribution = Partial<Record<AttributionKey, string>> & {
  landing_path?: string;
  referrer?: string;
};

const STORAGE_KEY = "firmity_attribution_v1";
const MAX_VALUE_LENGTH = 200;

function clean(value: string | null): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, MAX_VALUE_LENGTH) : undefined;
}

function readStored(): Attribution {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Attribution) : {};
  } catch {
    return {};
  }
}

function writeStored(value: Attribution): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // [ATTRIBUTION_SKIPPED] storage unavailable; attribution is best-effort.
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const stored = readStored();
  const params = new URLSearchParams(window.location.search);

  const fromUrl: Attribution = {};
  for (const key of PARAM_KEYS) {
    const value = clean(params.get(key));
    if (value) fromUrl[key] = value;
  }

  // First touch wins: URL params only fill what the session has not seen.
  const merged: Attribution = { ...fromUrl, ...stored };
  if (!merged.landing_path) merged.landing_path = window.location.pathname;
  if (!merged.referrer) {
    const ref = clean(document.referrer);
    if (ref) merged.referrer = ref;
  }

  writeStored(merged);
  return merged;
}
