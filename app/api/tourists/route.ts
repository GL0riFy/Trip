import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import TouristModel from "@/models/Tourist";

export async function GET(request: Request) {
  try {
    await connectDB();

    // แกะ Query Parameters เผื่อนำไปใช้กรองข้อมูล (เช่น ?district=mueang-chiang-mai)
    const { searchParams } = new URL(request.url);
    const district = searchParams.get("district");

    const query: any = {};
    if (district) {
      query.district = district;
    }

    // คิวรีข้อมูลออกมาทั้งหมด เรียงลำดับจากใหม่ไปเก่า และใช้ .lean() เพื่อรีดประสิทธิภาพสูงสุด
    const tourists = await TouristModel.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: tourists }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}