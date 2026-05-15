import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Feedback } from "@/models/Feedback";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await the params

    await connectDB();
    const deleted = await Feedback.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete feedback" }, { status: 500 });
  }
}
