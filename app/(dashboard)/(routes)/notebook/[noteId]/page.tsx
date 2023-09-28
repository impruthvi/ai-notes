import { Button } from "@/components/ui/button";
import { clerk } from "@/lib/clerk-server";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { use } from "react";

type Props = {
  params: {
    noteId: string;
  };
};

const NoteBookPage = async ({ params: { noteId } }: Props) => {
  const { userId } = await auth();
  if (!userId) return redirect("/");
  if (!noteId) throw new Error("No note ID found");

  const user = await clerk.users.getUser(userId);

  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)));

  if (!notes.length) return redirect("/dashboard");

  const note = notes[0];
  return (
    <div className="min-h-screen grainy p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center ">
          <Link href="/dashboard">
            <Button variant="premium">
              <ArrowLeft className="mr-1 w-4 h-4" size="sm" />
              Back
            </Button>
          </Link>
          <div className="w-4"></div>

          <span className="font-semibold">
            {user.firstName} {user.lastName}
          </span>

          <span className="inline-block mx-1">/</span>
          <span className="text-stone-500 font-semibold">{note.name}</span>
          <div className="ml-auto">DELETE BUTTON</div>
        </div>
      </div>

      <div className="h-4"></div>
      <div className="border-stone-200 shadow-xl border-lg px-16 py-8 w-full">
        {/* Editor */}
      </div>
    </div>
  );
};

export default NoteBookPage;
