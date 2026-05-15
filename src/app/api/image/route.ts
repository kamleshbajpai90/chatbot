import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || prompt.trim() === "") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "512x512",
    });

    return NextResponse.json({ imageUrl: result?.data?.[0].url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
