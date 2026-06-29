/**
 * backfill-ratings.ts
 * รัน 1 ครั้งเพื่อ set averageRating=0, reviewCount=0
 * ให้กับร้านที่ seed มาก่อนแต่ไม่มี field เหล่านี้ใน DB
 *
 * วิธีรัน:
 *   npx tsx scripts/backfill-ratings.ts
 *   (หรือใส่ไว้ใน scripts/ แล้ว npx ts-node scripts/backfill-ratings.ts)
 */

import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL || process.env.MONGODB_URI || "mongodb+srv://discordth007_db_user:etdVqifYPMd4AQe5@trip.sbvclxh.mongodb.net/TripChiangMai";

async function main() {
  if (!DATABASE_URL) {
    throw new Error("❌ DATABASE_URL not set in environment");
  }

  await mongoose.connect(DATABASE_URL);
  console.log("✅ Connected to MongoDB");

  const db = mongoose.connection.db!;
  const col = db.collection("restaurants");

  // 1. backfill ร้านที่ไม่มี averageRating
  const missingRating = await col.countDocuments({
    averageRating: { $exists: false },
  });
  console.log(`🔍 ร้านที่ไม่มี averageRating: ${missingRating} ร้าน`);

  if (missingRating > 0) {
    const res1 = await col.updateMany(
      { averageRating: { $exists: false } },
      { $set: { averageRating: 0 } }
    );
    console.log(`✅ set averageRating=0 ให้ ${res1.modifiedCount} ร้าน`);
  }

  // 2. backfill ร้านที่ไม่มี reviewCount
  const missingCount = await col.countDocuments({
    reviewCount: { $exists: false },
  });
  console.log(`🔍 ร้านที่ไม่มี reviewCount: ${missingCount} ร้าน`);

  if (missingCount > 0) {
    const res2 = await col.updateMany(
      { reviewCount: { $exists: false } },
      { $set: { reviewCount: 0 } }
    );
    console.log(`✅ set reviewCount=0 ให้ ${res2.modifiedCount} ร้าน`);
  }

  // 3. แสดงผลลัพธ์หลัง backfill
  const total = await col.countDocuments();
  const withRating = await col.countDocuments({ averageRating: { $gt: 0 } });
  console.log(`\n📊 สรุป: ร้านทั้งหมด ${total} ร้าน, มีดาวจริง ${withRating} ร้าน`);

  await mongoose.disconnect();
  console.log("🔌 Disconnected. Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
