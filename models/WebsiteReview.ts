import mongoose, { Schema, models, model } from "mongoose";

const WebsiteReviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "WebsiteReview",
  }
);

export default models.WebsiteReview ||
  model("WebsiteReview", WebsiteReviewSchema);