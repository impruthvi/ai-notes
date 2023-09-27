import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!name) return new NextResponse("Bad request", { status: 400 });
  } catch (e) {
    console.log(`[CREATE_NOTE_ERROR] ${e}`);
    return new NextResponse("Internal error", { status: 500 });
  }
}
