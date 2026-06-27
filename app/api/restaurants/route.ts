import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import RestaurantModel from "@/models/Restaurant";

export async function GET() {
  try {
    await connectDB();
    // ดึงข้อมูลร้านอาหารทั้งหมด และเรียงลำดับตาม id (ตัวอย่าง: r1, r2, ...)
    const restaurants = await RestaurantModel.find({}).sort({ id: 1 }).lean();
    return NextResponse.json(restaurants, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch restaurants:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}