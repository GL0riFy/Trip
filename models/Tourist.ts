// models/Tourist.ts
import mongoose, { Schema, Document, Model } from "mongoose";

// Sub-schema สำหรับข้อความที่แปลภาษาแล้ว (อิงตาม LocalizedText เดิมของคุณ)
const TouristLocaleContentSchema = new Schema(
  {
    name:     { type: String, required: true }, // เดิมคือ title
    desc:     { type: String, required: true }, // เดิมคือ detail
    location: { type: String, required: true }, // ดึงมาจาก detail_more.location
    tag:      { type: String, required: true }, // เดิมคือ tag
    price:    { type: String, default: "-" },   // เดิมคือ price
    hours:    { type: String, default: "-" },   // เดิมคือ hours
  },
  { _id: false }
);

const CoordsSchema = new Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false }
);

const TouristSchema = new Schema(
  {
    id:        { type: String, required: true, unique: true }, // เช่น "t1", "t2" หรือ slug
    slug:      { type: String, required: true, unique: true }, // URL slug สำหรับระบุหน้า
    image:     { type: String, required: true },               // จาก detail_more.img
    gallery:   { type: [String], default: [] },                // จาก detail_more.gallery
    video:     { type: String, default: "" },                  // จาก detail_more.video
    credit:    { type: String, default: "" },                  // จาก detail_more.credit
    mapLink:   { type: String, required: true },               // จาก detail_more.mapLink
    coords:    { type: CoordsSchema, required: true },         // lat, lng
    district:  { type: String, required: true },               // เพิ่มฟิลด์ไว้กรองตามอำเภอ เช่น "mueang-chiang-mai"
    
    // โครงสร้างรวมภาษาเข้าด้วยกัน
    locales: {
      th: { type: TouristLocaleContentSchema, required: true },
      en: { type: TouristLocaleContentSchema, required: true },
      zh: { type: TouristLocaleContentSchema, required: true },
    },
  },
  {
    collection: "tourists",
    timestamps: true,
  }
);

const TouristModel: Model<any> =
  mongoose.models.Tourist || mongoose.model("Tourist", TouristSchema);

export default TouristModel;