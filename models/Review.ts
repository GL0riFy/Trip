import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  targetId: string;       // ID ของร้านอาหาร หรือ โรงแรม (เช่น "r1", "h1")
  targetType: "restaurant" | "hotel"; // ตัวแบ่งประเภท 👈 เพิ่มตรงนี้
  userId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema(
  {
    targetId:   { type: String, required: true },
    targetType: { type: String, required: true, enum: ["restaurant", "hotel"] },
    userId:     { type: String, required: true },
    username:   { type: String, required: true },
    rating:     { type: Number, required: true, min: 1, max: 5 },
    comment:    { type: String, required: true },
  },
  {
    collection: "reviews",
    timestamps: true,
  }
);

ReviewSchema.index({ targetId: 1, targetType: 1 });

const ReviewModel: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default ReviewModel;