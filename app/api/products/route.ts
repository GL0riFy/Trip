import { NextResponse } from 'next/server';
import { connectDB } from "@/src/lib/mongodb";
import ProductsModel from '@/models/Products';

export async function GET() {
  try {
    await connectDB();
    // ดึงข้อมูลสินค้าทั้งหมด และเรียงลำดับตามความนิยมหรือการสร้างใหม่ได้ตามต้องการ
    const products = await ProductsModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Fetch products api error:", error);
    return NextResponse.json({ error: "Failed to fetch products data" }, { status: 500 });
  }
}