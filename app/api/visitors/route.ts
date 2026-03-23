import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

interface VisitorData {
  count: number;
  byCountry: Record<string, number>;
  daily: Record<string, number>;
  bySource: Record<string, number>;
  byDevice: Record<string, number>;
}

function getFilePath() {
  const dir = path.join(process.cwd(), 'src', 'visitor-data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, 'visitor-data.json');
}

function readData(): VisitorData {
  const filePath = getFilePath();
  if (!fs.existsSync(filePath)) return { count: 0, byCountry: {}, daily: {}, bySource: {}, byDevice: {} };
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return {
      count: parsed.count ?? 0,
      byCountry: parsed.byCountry ?? {},
      daily: parsed.daily ?? {},
      bySource: parsed.bySource ?? {},
      byDevice: parsed.byDevice ?? {},
    };
  } catch {
    return { count: 0, byCountry: {}, daily: {}, bySource: {}, byDevice: {} };
  }
}

function writeData(data: VisitorData) {
  fs.writeFileSync(getFilePath(), JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    return NextResponse.json(readData());
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ count: 0, byCountry: {}, daily: {}, bySource: {}, byDevice: {}, error: msg }, { status: 500 });
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

    const data = readData();

    // byCountry
    data.byCountry[body.country] = (data.byCountry[body.country] ?? 0) + 1;

    // daily — key เป็น YYYY-MM-DD (UTC)
    const today = new Date().toISOString().slice(0, 10);
    data.daily[today] = (data.daily[today] ?? 0) + 1;

    // bySource
    const source = body.source ?? 'direct';
    data.bySource[source] = (data.bySource[source] ?? 0) + 1;

    // byDevice
    const device = body.device ?? 'desktop';
    data.byDevice[device] = (data.byDevice[device] ?? 0) + 1;

    // count = ผลรวมจาก byCountry
    data.count = Object.values(data.byCountry).reduce((s, v) => s + v, 0);

    writeData(data);
    return NextResponse.json(data);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ count: 0, byCountry: {}, daily: {}, bySource: {}, byDevice: {}, error: msg }, { status: 500 });
  }
}