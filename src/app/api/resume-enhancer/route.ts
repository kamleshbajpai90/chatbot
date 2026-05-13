import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import mammoth from "mammoth";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("resume") as File;

  if (!file) {
    return NextResponse.json({ error: "No resume uploaded" }, { status: 400 });
  }

  // Read DOCX file as ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Extract text using mammoth
  const { value: text } = await mammoth.extractRawText({ buffer });

  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.7,
  });

  const response = await model.invoke([
    new HumanMessage(
      `You are a professional resume enhancer. 
      Improve the following resume text to maximize shortlisting chances:
      - Rewrite bullet points to highlight achievements
      - Use strong action verbs
      - Suggest missing sections if relevant (Projects, Certifications, Skills)
      - Format output in Markdown with clear headings and bullet points

      Resume text:
      ${text}`
    ),
  ]);

  return NextResponse.json({ enhancedResume: response.content });
}
