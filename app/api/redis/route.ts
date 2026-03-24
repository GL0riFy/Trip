import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/src/lib/redis';

export const dynamic = 'force-dynamic';

const REDIS_KEY = 'visitor-data';

interface VisitorData {
  count: number;
  byCountry: Record<string, number>;
  daily: Record<string, number>;
  bySource: Record<string, number>;
  byDevice: Record<string, number>;
}

const DEFAULT_DATA: VisitorData = {
  count: 0,
  byCountry: {},
  daily: {},
  bySource: {},
  byDevice: {},
};

async function readData(): Promise<VisitorData> {
  try {
    const raw = await redis.get(REDIS_KEY);          // string | null
    if (!raw) return { ...DEFAULT_DATA };
    const data = JSON.parse(raw);                    // แปลง string → object
    return {
      count: data.count ?? 0,
      byCountry: data.byCountry ?? {},
      daily: data.daily ?? {},
      bySource: data.bySource ?? {},
      byDevice: data.byDevice ?? {},
    };
  } catch {
    return { ...DEFAULT_DATA };
  }
}

async function writeData(data: VisitorData) {
  await redis.set(REDIS_KEY, JSON.stringify(data));  // แปลง object → string
}

export async function GET() {
  try {
    return NextResponse.json(await readData());
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ ...DEFAULT_DATA, error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      country: string;
      source?: string;
      device?: string;
    };

    if (!body.country) return NextResponse.json({ error: 'country required' }, { status: 400 });

    const data = await readData();

    data.byCountry[body.country] = (data.byCountry[body.country] ?? 0) + 1;

    const today = new Date().toISOString().slice(0, 10);
    data.daily[today] = (data.daily[today] ?? 0) + 1;

    const source = body.source ?? 'direct';
    data.bySource[source] = (data.bySource[source] ?? 0) + 1;

    const device = body.device ?? 'desktop';
    data.byDevice[device] = (data.byDevice[device] ?? 0) + 1;

    data.count = Object.values(data.byCountry).reduce((s, v) => s + v, 0);

    await writeData(data);
    return NextResponse.json(data);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ ...DEFAULT_DATA, error: msg }, { status: 500 });
  }
}