import { NextResponse } from 'next/server';
import { connectDB } from "@/src/lib/mongodb";
import ProductsModel from '@/models/Products';

// GET: ดึงข้อมูลสินค้าทั้งหมด
export async function GET() {
  try {
    await connectDB();
    const products = await ProductsModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Fetch products api error:", error);
    return NextResponse.json({ error: "Failed to fetch products data" }, { status: 500 });
  }
}

// POST: อัปเดตยอดวิว (ใช้สำหรับเรียกเมื่อมีการคลิกสินค้า)
export async function POST(req: Request) {
  try {
    const { slug } = await req.json();
    if (!slug) return NextResponse.json({ error: "Slug is required" }, { status: 400 });

    await connectDB();
    
    // ใช้ $inc เพื่อเพิ่มค่า viewCount ทีละ 1 อย่างมีประสิทธิภาพ
    const updatedProduct = await ProductsModel.findOneAndUpdate(
      { slug },
      { $inc: { viewCount: 1 } },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update view count error:", error);
    return NextResponse.json({ error: "Failed to update view count" }, { status: 500 });
  }
}