import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!name) return new NextResponse("Bad request", { status: 400 });

    const image_description = await generateImagePrompt(name);
    if (!image_description)
      return new NextResponse("Faild to genrate image description", {
        status: 500,
      });

    const image_url = await generateImage(image_description);

    if (!image_url)
      return new NextResponse("Faild to genrate image", { status: 500 });

    const note_ids = await db
      .insert($notes)
      .values({
        name,
        userId,
        imageUrl: image_url,
      })
      .returning({
        insertedId: $notes.id,
      });

      console.log(note_ids);
      
    return NextResponse.json({
      note_id: note_ids[0].insertedId,
    });

  } catch (e) {
    console.log(`[CREATE_NOTE_ERROR] ${e}`);
    return new NextResponse("Internal error", { status: 500 });
  }
}
