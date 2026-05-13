import { NextResponse } from 'next/server';
import { getRedisClient } from '@/src/lib/redis';

export const dynamic = 'force-dynamic';
const REDIS_KEY = 'visitor-count';

export async function GET() {
  try {
    const redis = await getRedisClient();
    const count = await redis.get(REDIS_KEY);
    
    return NextResponse.json({ 
      count: Number(count) || 0 
    });
  } catch (error) {
    console.error('Read Error:', error);
    return NextResponse.json({ error: 'Read error' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const redis = await getRedisClient();
    // ใช้ INCR เพื่อบวกเลข 1 ทันที (Atomic)
    const newCount = await redis.incr(REDIS_KEY);
    
    return NextResponse.json({ 
      success: true, 
      count: newCount 
    });
  } catch (error) {
    console.error('Write Error:', error);
    return NextResponse.json({ error: 'Write error' }, { status: 500 });
  }
}