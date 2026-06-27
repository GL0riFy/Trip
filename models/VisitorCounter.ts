import mongoose, { Schema, models, model } from "mongoose";

const VisitorCounterSchema = new Schema(
  {
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "VisitorCounter",
  }
);

export default models.VisitorCounter ||
  model("VisitorCounter", VisitorCounterSchema);