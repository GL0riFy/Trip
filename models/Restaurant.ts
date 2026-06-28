import mongoose, { Schema, Document, Model } from "mongoose";

// ── Sub-schema: locale content ─────────────────────────────────────────────
const LocaleContentSchema = new Schema(
  {
    name:        { type: String, required: true },
    desc:        { type: String, required: true },
    location:    { type: String, required: true },
    tags:        { type: [String], default: [] },
    recommended: { type: [String], default: [] },
  },
  { _id: false }
);

// ── Sub-schema: coordinates ────────────────────────────────────────────────
const CoordsSchema = new Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false }
);

// ── Main schema ────────────────────────────────────────────────────────────
const RestaurantSchema = new Schema(
  {
    id:        { type: String, required: true, unique: true }, // "r1", "r2", …
    slug:      { type: String, required: true, unique: true }, // URL-friendly
    image:     { type: String, required: true },
    gallery:   { type: [String], default: [] },
    mapLink:   { type: String, required: true },
    coords:    { type: CoordsSchema, required: true },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount:   { type: Number, default: 0 },
    // ────────────────────────────────────────────────────────────────────────────

    openHours: { type: String, required: true },
    tel:       { type: String, required: true },
    locales: {
      th: { type: LocaleContentSchema, required: true },
      en: { type: LocaleContentSchema, required: true },
      zh: { type: LocaleContentSchema, required: true },
    },
  },
  {
    collection: "restaurants",
    timestamps: true, // createdAt / updatedAt
  }
);

// สร้าง Index สำหรับตอนที่เราต้องการดึงร้านอาหารมาจัดเรียงตามคะแนนดาวเยอะที่สุด (เรียงลำดับเร็วขึ้นมาก)
RestaurantSchema.index({ averageRating: -1 });

// ── TypeScript interface ───────────────────────────────────────────────────
export interface ILocaleContent {
  name:        string;
  desc:        string;
  location:    string;
  tags:        string[];
  recommended: string[];
}

export interface IRestaurant extends Document {
  id:            string;
  slug:          string;
  image:         string;
  gallery:       string[];
  mapLink:       string;
  coords:        { lat: number; lng: number };
  averageRating: number; 
  reviewCount:   number;
  openHours:     string;
  tel:           string;
  locales: {
    th: ILocaleContent;
    en: ILocaleContent;
    zh: ILocaleContent;
  };
}

// ── Model (singleton-safe for Next.js hot-reload) ─────────────────────────
if (mongoose.models.Restaurant) {
  delete mongoose.models.Restaurant;
}

const RestaurantModel: Model<IRestaurant> = 
  mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);

export default RestaurantModel;