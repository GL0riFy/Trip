import mongoose, { Schema, Document, Model } from "mongoose";

// ── Sub-schema: locale content ─────────────────────────────────────────────
const TipLocaleContentSchema = new Schema(
  {
    title: { type: String, required: true },
    desc:  { type: String, required: true },
  },
  { _id: false }
);

// ── Main schema ────────────────────────────────────────────────────────────
const TipSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true }, // 1, 2, 3, …
    locales: {
      th: { type: TipLocaleContentSchema, required: true },
      en: { type: TipLocaleContentSchema, required: true },
      zh: { type: TipLocaleContentSchema, required: true },
    },
  },
  {
    collection: "tips",
    timestamps: true,
  }
);

// ── TypeScript interface ───────────────────────────────────────────────────
export interface ITipLocale {
  title: string;
  desc:  string;
}

export interface ITip extends Document {
  id: number;
  locales: {
    th: ITipLocale;
    en: ITipLocale;
    zh: ITipLocale;
  };
}

// ── Model (singleton-safe for Next.js hot-reload) ─────────────────────────
const TipModel: Model<ITip> =
  mongoose.models.Tip ||
  mongoose.model<ITip>("Tip", TipSchema);

export default TipModel;
