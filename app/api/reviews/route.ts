import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import ReviewModel from "@/models/Review";
import RestaurantModel from "@/models/Restaurant";

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
    // 3. ถ้าเป็น "โรงแรม" (hotel) -> ไม่ต้องคิดดาว ไม่ต้องมี reviewCount ปล่อยผ่านและจบงานตรงนี้เลย
    else if (targetType === "hotel") {
      console.log(`✅ บันทึกรีวิวโรงแรม ID: ${targetId} ลงตาราง reviews สำเร็จ (ไม่มีการอัปเดตดาวตัวโรงแรม)`);
    }

    // สั่ง return ตอบกลับหน้าบ้านอย่างถูกต้องตรงนี้ (อยู่นอกเงื่อนไข if-else)
    return NextResponse.json({ success: true, data: newReview }, { status: 201 });

  } catch (error: any) {
    console.error("Review API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}