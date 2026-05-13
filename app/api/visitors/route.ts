import { NextResponse } from 'next/server';
import { getRedisClient } from '@/src/lib/redis';

const REDIS_KEY = 'total-visitor-count';

// 🔹 เพิ่มฟังก์ชัน GET สำหรับ Footer (ห้ามลืม!)
export async function GET() {
  try {
    const redis = await getRedisClient();
    const count = await redis.get(REDIS_KEY);
    
    // คืนค่ากลับไปเป็น JSON เสมอ
    return NextResponse.json({ count: Number(count) || 0 });
  } catch (error) {
    console.error('Redis GET Error:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

// 🔹 ฟังก์ชัน POST เดิมสำหรับหน้านับ (หน้า Home)
export async function POST() {
  try {
    const redis = await getRedisClient();
    const newCount = await redis.incr(REDIS_KEY);
    return NextResponse.json({ success: true, count: newCount });
  } catch (error) {
    console.error('Redis POST Error:', error);
    return NextResponse.json({ error: 'Write error' }, { status: 500 });
  }
}