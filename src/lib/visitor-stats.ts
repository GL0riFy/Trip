import fs from "fs";
import path from "path";

export type VisitorData = {
  count: number;
  byCountry: Record<string, number>;
};

const dirPath = () => path.join(process.cwd(), "src", "visitor-data");
const filePath = () => path.join(dirPath(), "visitor-data.json");

function ensureDir() {
  const d = dirPath();
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

export function readVisitorData(): VisitorData {
  ensureDir();
  const fp = filePath();
  if (!fs.existsSync(fp)) return { count: 0, byCountry: {} };
  try {
    const raw = JSON.parse(fs.readFileSync(fp, "utf-8")) as Record<string, unknown>;
    const count = typeof raw.count === "number" ? raw.count : 0;
    const byCountry =
      raw.byCountry && typeof raw.byCountry === "object" && !Array.isArray(raw.byCountry)
        ? (raw.byCountry as Record<string, number>)
        : {};
    return { count, byCountry };
  } catch {
    return { count: 0, byCountry: {} };
  }
}

export function writeVisitorData(data: VisitorData) {
  ensureDir();
  fs.writeFileSync(filePath(), JSON.stringify(data, null, 2), "utf-8");
}

/** ISO 3166-1 alpha-2 from common CDN / host headers */
export function resolveCountryCodeFromRequest(request: Request): string {
  const h = request.headers;
  const raw =
    h.get("x-vercel-ip-country") ||
    h.get("cf-ipcountry") ||
    h.get("cloudfront-viewer-country") ||
    h.get("x-nf-country") ||
    h.get("x-country-code") ||
    "";
  const t = raw.trim().toUpperCase();
  if (t.length === 2 && /^[A-Z]{2}$/.test(t)) return t;
  return "XX";
}

export function recordVisit(request: Request): VisitorData {
  const code = resolveCountryCodeFromRequest(request);
  const data = readVisitorData();
  data.count += 1;
  data.byCountry[code] = (data.byCountry[code] ?? 0) + 1;
  writeVisitorData(data);
  return data;
}

export function sortedCountryEntries(data: VisitorData): { code: string; count: number }[] {
  return Object.entries(data.byCountry)
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count);
}
