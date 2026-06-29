import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import ReviewModel from "@/models/Review";
import RestaurantModel from "@/models/Restaurant";
import HotelModel from "@/models/Hotels"; // 🔥 เพิ่ม import Hotel

// 🔥 GET: ดึงรีวิวทั้งหมดตาม targetId + targetType
// ใช้งาน: GET /api/reviews?targetId=h20&targetType=hotel
export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const targetId = searchParams.get("targetId");
    const targetType = searchParams.get("targetType") as "restaurant" | "hotel" | null;

    if (!targetId || !targetType) {
      return NextResponse.json({ error: "Missing targetId or targetType" }, { status: 400 });
    }

    const reviews = await ReviewModel.find({ targetId, targetType })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: reviews }, { status: 200 });

  } catch (error: any) {
    console.error("Review GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { targetId, targetType, username, rating, comment } = body;

    if (!targetId || !targetType || !username || !rating || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const reviewRating = Number(rating);

    // 1. บันทึกรีวิวใหม่ลงตาราง reviews (ทำเหมือนกันทั้งร้านอาหารและโรงแรม)
    const newReview = await ReviewModel.create({
      targetId,
      targetType,
      userId: "guest_" + Date.now(),
      username,
      rating: reviewRating,
      comment,
    });

    // 2. ถ้าเป็น "ร้านอาหาร" -> ทำการปั๊มฟิลด์คำนวณอัปเดตดาวตามโค้ดเดิมของพี่
    if (targetType === "restaurant") {
      const restaurant = await RestaurantModel.findOne({ id: targetId });
      
      if (restaurant) {
        const currentCount = Number(restaurant.reviewCount) || 0;
        const currentAvg = Number(restaurant.averageRating) || 0;

        const newReviewCount = currentCount + 1;
        const newAverageRating = ((currentAvg * currentCount) + reviewRating) / newReviewCount;

        restaurant.reviewCount = newReviewCount;
        restaurant.averageRating = Math.round(newAverageRating * 10) / 10; 

        await restaurant.save();
        console.log("👉 อัปเดตดาวเฉลี่ยลงตารางร้านค้าสำเร็จแล้ว:", restaurant.averageRating);
      } else {
        console.log(`❌ ไม่พบร้านอาหารที่ตรงกับ id: ${targetId}`);
      }
    } 
    // 3. ถ้าเป็น "โรงแรม" -> คำนวณ averageRating + reviewCount เหมือน restaurant
    else if (targetType === "hotel") {
      const hotel = await HotelModel.findOne({ id: targetId }).select("reviewCount averageRating").lean();

      if (hotel) {
        const currentCount = Number(hotel.reviewCount) || 0;
        const currentAvg = Number(hotel.averageRating) || 0;

        const newReviewCount = currentCount + 1;
        const newAverageRating = Math.round(((currentAvg * currentCount) + reviewRating) / newReviewCount * 10) / 10;

        // 🔥 ใช้ findOneAndUpdate แทน save() เพื่อหลีกเลี่ยง Mongoose validation ของ field อื่น
        await HotelModel.findOneAndUpdate(
          { id: targetId },
          { $set: { reviewCount: newReviewCount, averageRating: newAverageRating } }
        );

        console.log(`👉 อัปเดตดาวโรงแรม ID: ${targetId} → ${newAverageRating} (${newReviewCount} รีวิว)`);
      } else {
        console.log(`❌ ไม่พบโรงแรมที่ตรงกับ id: ${targetId}`);
      }
    }

    // สั่ง return ตอบกลับหน้าบ้านอย่างถูกต้องตรงนี้ (อยู่นอกเงื่อนไข if-else)
    return NextResponse.json({ success: true, data: newReview }, { status: 201 });

  } catch (error: any) {
    console.error("Review API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}