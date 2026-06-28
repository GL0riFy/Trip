import mongoose, { Schema, Document, Model } from "mongoose";

// ── Sub-schema: Locale Content (ข้อมูลเฉพาะภาษา) ───────────────────────────
const HotelLocaleContentSchema = new Schema(
  {
    name:      { type: String, required: true },
    location:  { type: String, required: true },
    address:   { type: String, required: true }, 
    desc:      { type: String, required: true },
    roomStyle: { type: String, required: true },
    service:   { type: String, required: true },
    amenities: { type: [String], default: [] },
    policies:  { type: [String], default: [] }, 
    tags:      { type: [String], default: [] }, 
  },
  { _id: false }
);

// ── Sub-schema: Coordinates (พิกัดแผนที่) ──────────────────────────────────
const CoordsSchema = new Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false }
);

// ── Sub-schema: Contact (ข้อมูลติดต่อ) ──────────────────────────────────────
const ContactSchema = new Schema(
  {
    phone:  { type: String, required: true },
    email:  { type: String, required: true },
    lineId: { type: String, default: "" },
  },
  { _id: false }
);

// ── Sub-schema: Booking Platforms (ลิงก์จองห้องพัก) ────────────────────────
const BookingSchema = new Schema(
  {
    platform: { type: String, required: true }, 
    link:     { type: String, required: true },
  },
  { _id: false }
);

// ── Main Schema: Hotel ─────────────────────────────────────────────────────
const HotelSchema = new Schema(
  {
    id:          { type: String, required: true, unique: true }, 
    slug:        { type: String, required: true, unique: true }, 
    type:        { type: String, required: true, enum: ['city', 'hotel', 'nature', 'riverside'] },
    starRating:  { type: Number, required: true, min: 1, max: 5 }, // ดาวพื้นฐานโรงแรม (เช่น โรงแรม 5 ดาว)
    image:       { type: String, required: true },
    gallery:     { type: [String], default: [] },
    coords:      { type: CoordsSchema, required: true },
    mapLink:     { type: String, required: true },
    priceRange:  { type: String, required: true }, 
    minPrice:    { type: Number, required: true }, 
    isFeatured:  { type: Boolean, default: false },
    contact:     { type: ContactSchema, required: true },
    booking:     { type: [BookingSchema], default: [] },
    checkIn:     { type: String, required: true }, 
    checkOut:    { type: String, required: true }, 
    
    // 🔥 เพิ่ม 2 ฟิลด์นี้สำหรับระบบ Review / User Rating
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount:   { type: Number, default: 0 },
    
    locales: {
      th: { type: HotelLocaleContentSchema, required: true },
      en: { type: HotelLocaleContentSchema, required: true },
      zh: { type: HotelLocaleContentSchema, required: true }, 
    },
  },
  {
    collection: "hotels",
    timestamps: true, 
  }
);

// สร้าง Index ให้เรียงลำดับตามคะแนนรีวิวเฉลี่ยได้รวดเร็วขึ้นเมื่อข้อมูลเยอะขึ้น
HotelSchema.index({ averageRating: -1 });

// ── TypeScript Interfaces ──────────────────────────────────────────────────
export interface IHotelLocaleContent {
  name:      string;
  location:  string;
  address:   string;
  desc:      string;
  roomStyle: string;
  service:   string;
  amenities: string[];
  policies?: string[];
  tags?:     string[];
}

export interface IHotel extends Document {
  id:          string;
  slug:        string;
  type:        'city' | 'hotel' | 'nature' | 'riverside';
  starRating:  number;
  image:       string;
  gallery:     string[];
  coords: {
    lat: number;
    lng: number;
  };
  mapLink:     string;
  priceRange:  string;
  minPrice:    number;
  isFeatured:  boolean;
  contact: {
    phone:   string;
    email:   string;
    lineId?: string;
  };
  booking?: {
    platform: string;
    link:     string;
  }[];
  checkIn:     string;
  checkOut:    string;
  
  // 🔥 เพิ่มตัวแปร Type ให้ฝั่งหน้าบ้านเรียกใช้ได้อย่างปลอดภัย
  averageRating: number;
  reviewCount:   number;
  
  locales: {
    th: IHotelLocaleContent;
    en: IHotelLocaleContent;
    zh: IHotelLocaleContent;
  };
}

const HotelModel: Model<IHotel> =
  mongoose.models.Hotel ||
  mongoose.model<IHotel>("Hotel", HotelSchema);

export default HotelModel;