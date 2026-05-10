import mongoose, { Schema, model, models } from "mongoose";

const FeedbackSchema = new Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Feedback = models.Feedback || model("Feedback", FeedbackSchema);
