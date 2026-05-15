import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

export async function POST(req: Request) {
  const { message } = await req.json();

  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini", // or another model
    temperature: 0.7,
  });

  function normalizeContent(content: any): string {
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      return content.map((block: any) => block.text ?? "").join("\n");
    }
    return "";
  }

  function sanitizeContent(text: string): string {
    return text
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
      .replace(/<link[\s\S]*?>/gi, "")
      .replace(/<[^>]+on\w+="[^"]*"/gi, ""); // remove inline event handlers
  }

  function cleanWhitespace(text: string): string {
    return text.trim().replace(/\n{3,}/g, "\n\n");
  }

  const response = await model.invoke([
    new HumanMessage(
      `${message}\n Please format your response in Markdown (use lists, headings, bold, but do not include raw HTML tags or scripts, and remove extra new lines).`
    ),
  ]);

  let reply = normalizeContent(response.content);
  reply = sanitizeContent(reply);
  reply = cleanWhitespace(reply);

  return NextResponse.json({ reply });
}
