import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;
    const targetLang = formData.get("targetLang") as string;

    if (!audioFile || !targetLang) {
      return NextResponse.json(
        { error: "Missing audio file or target language" },
        { status: 400 }
      );
    }

    // Save audio temporarily
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    const tempFilePath = path.join("/tmp", `${uuidv4()}.mp3`);
    fs.writeFileSync(tempFilePath, buffer);

    // Step 1: Transcribe audio
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: "whisper-1",
    });

    const text = transcription.text;

    // Step 2: Translate text
    const translation = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Translate the following text into ${targetLang}.`,
        },
        { role: "user", content: text },
      ],
    });

    const translatedText = translation.choices[0].message?.content ?? "";

    // Step 3: Convert translated text back to audio
    const speech = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: translatedText,
    });

    const audioBuffer = Buffer.from(await speech.arrayBuffer());
    const outputFilePath = path.join("/tmp", `${uuidv4()}-translated.mp3`);
    fs.writeFileSync(outputFilePath, audioBuffer);

    // In production, upload to S3/Cloud Storage and return public URL
    // For demo, return a base64 string
    const base64Audio = audioBuffer.toString("base64");
    const audioUrl = `data:audio/mp3;base64,${base64Audio}`;

    return NextResponse.json({ translatedAudioUrl: audioUrl });
  } catch (error: any) {
    console.error("Error in translate-audio API:", error);
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}
