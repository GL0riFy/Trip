import { NextRequest, NextResponse } from 'next/server';
import { getRedisClient } from '@/src/lib/redis';

const REDIS_KEY = 'website-reviews';

// 🔹 GET รีวิวทั้งหมด
export async function GET() {
  try {
    const redis = await getRedisClient();

    const reviews = (await redis.lRange(
    REDIS_KEY,
    0,
    -1
    )) as string[];

const parsedReviews = reviews
  .map((item: string) => {
    try {
      return JSON.parse(item);
    } catch (error) {
      // ดักจับตัวที่พัง พ่น Log ออกคอนโซลของ Server เพื่อดูว่าตัวไหนมีปัญหา
      console.error("พบข้อมูล JSON ผิดฟอร์แมตใน Redis:", item);
      return null;
    }
  })
  // กรองข้อมูลตัวที่เป็น null (ตัวที่ parse พัง) ออกจาก Array ทั้งหมด
  .filter((item) => item !== null);

return NextResponse.json(parsedReviews);
  } catch (error) {
    console.error('Redis GET Error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// 🔹 POST เพิ่มรีวิว
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, rating, comment, tags } = body;

    // ตรวจสอบข้อมูล
    if (!name || !rating || !comment || !tags) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const redis = await getRedisClient();

    const review = {
      name,
      rating: Number(rating), // 1-5 ดาว
      comment,
      tags,
      createdAt: new Date().toISOString(),
    };

    // เก็บเข้า Redis List
    await redis.lPush(REDIS_KEY, JSON.stringify(review));

    return NextResponse.json({
      success: true,
      review,
    });
  } catch (error) {
    console.error('Redis POST Error:', error);

    return NextResponse.json(
      { error: 'Failed to save review' },
      { status: 500 }
    );
  }
}