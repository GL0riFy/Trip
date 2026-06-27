import mongoose, { Schema, Document, Model } from "mongoose";

// ── Sub-schema: Locale Content (รวมข้อมูลภาษาทั้งหมดไว้ที่นี่) ─────────────────
const LocaleContentSchema = new Schema(
  {
    name:        { type: String, required: true },
    description: { type: String, required: true },
    address:     { type: String, required: true },
    district:    { type: String, default: "" },
    shopName:    { type: String, required: true }, // ย้ายเข้ามาอยู่ที่นี่แล้ว
  },
  { _id: false }
);

// ── Main Schema ────────────────────────────────────────────────────────────
const ProductSchema = new Schema(
  {
    id:        { type: String, required: true, unique: true },
    slug:      { type: String, required: true, unique: true },
    price:     { type: Number, required: true, min: 0 },
    image:     { type: String, required: true },
    tag:       { type: String, default: "" },
    icon:      { type: String, default: "" },
    mapsQuery: { type: String, required: true },
    phone:     { type: String, default: "" },
    
    // ฟิลด์ shopName ระดับนอกสุดถูกลบออกแล้ว เหลือเฉพาะใน locales
    locales: {
      th: { type: LocaleContentSchema, required: true },
      en: { type: LocaleContentSchema, required: true },
      zh: { type: LocaleContentSchema, required: true },
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

// ── TypeScript interfaces ───────────────────────────────────────────────────
export interface ILocaleContent {
  name:        string;
  description: string;
  address:     string;
  district:    string;
  shopName:    string; // อัปเดต Interface ของภาษา
}

export interface IProduct extends Document {
  id:         string;
  slug:       string;
  price:      number;
  image:      string;
  tag:        string;
  icon:       string;
  mapsQuery:  string;
  phone:      string;
  locales: {
    th: ILocaleContent;
    en: ILocaleContent;
    zh: ILocaleContent;
  };
}

// ── Model (Singleton-safe สำหรับ Next.js) ──────────────────────────────────
const ProductModel: Model<IProduct> =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;