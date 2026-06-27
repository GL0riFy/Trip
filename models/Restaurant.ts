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
    rating:    { type: Number, required: true, min: 0, max: 5 },
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

// ── TypeScript interface ───────────────────────────────────────────────────
export interface ILocaleContent {
  name:        string;
  desc:        string;
  location:    string;
  tags:        string[];
  recommended: string[];
}

export interface IRestaurant extends Document {
  id:        string;
  slug:      string;
  image:     string;
  gallery:   string[];
  mapLink:   string;
  coords:    { lat: number; lng: number };
  rating:    number;
  openHours: string;
  tel:       string;
  locales: {
    th: ILocaleContent;
    en: ILocaleContent;
    zh: ILocaleContent;
  };
}

// ── Model (singleton-safe for Next.js hot-reload) ─────────────────────────
const RestaurantModel: Model<IRestaurant> =
  mongoose.models.Restaurant ||
  mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);

export default RestaurantModel;
