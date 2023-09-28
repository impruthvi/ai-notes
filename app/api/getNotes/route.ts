import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = auth();
    const notes = await db
      .select()
      .from($notes)
      .where(eq($notes.userId, userId!));

    return NextResponse.json(notes);
  } catch (err) {
    console.log("[NOTEBOOK_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
