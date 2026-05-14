import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

export async function POST(req: Request) {
  const { message } = await req.json();

  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini", // or another model
    temperature: 0.7,
  });

  const response = await model.invoke([
    new HumanMessage(
      `${message}\n\nPlease format your response in Markdown (use lists, headings, bold, long html tags etc. but remove markdown related text from the response).`
    ),
  ]);

  return NextResponse.json({ reply: response.content });
}
