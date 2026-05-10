import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Feedback } from "@/models/Feedback";


export async function POST(req: Request) {
  try {
    const { rating, feedback } = await req.json();
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
    }

    await connectDB();
    const newFeedback = await Feedback.create({ rating, feedback });

    return NextResponse.json({ success: true, feedback: newFeedback });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    return NextResponse.json({ feedbacks });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
  }
}
