import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb"; // 👈 ปรับให้ย้อนโฟลเดอร์ออกมาหา src/lib โดยตรง
import TipModel from "@/models/Tip";

export async function GET() {
  try {
    await connectDB();
    const tips = await TipModel.find({}).sort({ id: 1 }).lean();
    return NextResponse.json(tips, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch tips:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}