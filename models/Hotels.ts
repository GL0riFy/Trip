import mongoose, { Schema, Document, Model } from "mongoose";

// ── Sub-schema: Locale Content (ข้อมูลเฉพาะภาษา) ───────────────────────────
const HotelLocaleContentSchema = new Schema(
  {
    name:      { type: String, required: true },
    location:  { type: String, required: true },
    address:   { type: String, required: true }, // ที่อยู่เต็ม
    desc:      { type: String, required: true },
    roomStyle: { type: String, required: true },
    service:   { type: String, required: true },
    amenities: { type: [String], default: [] },
    policies:  { type: [String], default: [] }, // นโยบายของโรงแรม
    tags:      { type: [String], default: [] }, // สำหรับ Search
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
    platform: { type: String, required: true }, // เช่น "Agoda", "Booking.com"
    link:     { type: String, required: true },
  },
  { _id: false }
);

// ── Main Schema: Hotel ─────────────────────────────────────────────────────
const HotelSchema = new Schema(
  {
    id:          { type: String, required: true, unique: true }, // "h1", "h2", ...
    slug:        { type: String, required: true, unique: true }, // URL-friendly
    type:        { type: String, required: true, enum: ['city', 'hotel', 'nature', 'riverside'] },
    starRating:  { type: Number, required: true, min: 1, max: 5 },
    image:       { type: String, required: true },
    gallery:     { type: [String], default: [] },
    coords:      { type: CoordsSchema, required: true },
    mapLink:     { type: String, required: true },
    priceRange:  { type: String, required: true }, // เช่น "฿1,500 - ฿3,000"
    minPrice:    { type: Number, required: true }, // สำหรับการ Sort ราคาขั้นต่ำ
    isFeatured:  { type: Boolean, default: false },
    contact:     { type: ContactSchema, required: true },
    booking:     { type: [BookingSchema], default: [] },
    checkIn:     { type: String, required: true }, // เช่น "14:00"
    checkOut:    { type: String, required: true }, // เช่น "12:00"
    locales: {
      th: { type: HotelLocaleContentSchema, required: true },
      en: { type: HotelLocaleContentSchema, required: true },
      zh: { type: HotelLocaleContentSchema, required: true }, // ล็อกภาษา th, en, zh เหมือนร้านอาหาร
    },
  },
  {
    collection: "hotels",
    timestamps: true, // เก็บ createdAt และ updatedAt อัตโนมัติ
  }
);

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
  locales: {
    th: IHotelLocaleContent;
    en: IHotelLocaleContent;
    zh: IHotelLocaleContent;
  };
}

// ── Model (Singleton-safe สำหรับ Next.js Hot-Reload) ───────────────────────
const HotelModel: Model<IHotel> =
  mongoose.models.Hotel ||
  mongoose.model<IHotel>("Hotel", HotelSchema);

export default HotelModel;