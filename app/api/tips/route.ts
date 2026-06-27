import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb"; // อย่าลืมเปลี่ยน path ให้ตรงกับฟังก์ชันเชื่อมต่อ DB ของคุณ
import TipModel from "@/models/Tip";

export async function GET() {
  try {
    await connectDB();
    // ดึงข้อมูลเคล็ดลับทั้งหมด เรียงตาม id (1, 2, 3)
    const tips = await TipModel.find({}).sort({ id: 1 }).lean();
    return NextResponse.json(tips, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch tips:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}