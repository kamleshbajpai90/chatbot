import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("resume") as File;

  if (!file) {
    return NextResponse.json({ error: "No resume uploaded" }, { status: 400 });
  }

  const text = await file.text();

  const model = new ChatOpenAI({
    modelName: "gpt-5.5-mini",
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
