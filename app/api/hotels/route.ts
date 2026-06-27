// app/api/hotels/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from "@/src/lib/mongodb";
import HotelModel from '@/models/Hotels'; // ปรับ path ไปหาไฟล์โมเดลของคุณ

export async function GET() {
  try {
    await connectDB();
    // ดึงข้อมูลโรงแรมทั้งหมด และเรียงลำดับตามความนิยมหรือการสร้างใหม่ได้ตามต้องการ
    const hotels = await HotelModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(hotels);
  } catch (error) {
    console.error("Fetch hotels api error:", error);
    return NextResponse.json({ error: "Failed to fetch hotels data" }, { status: 500 });
  }
}