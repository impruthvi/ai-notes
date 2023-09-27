"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {};

const CreateNoteDialog = (props: Props) => {
  const [name, setName] = React.useState<string>("");

  return (
    <Dialog>
      <DialogTrigger>
        <div className="border-dashed border-2 flex border-purple-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
          <Plus className="w-10 h-10 text-purple-600" strokeWidth={3} />
          <h2 className="font-semibold text-purple-600 sm:mt-2">
            New Note Book
          </h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Note Book</DialogTitle>
          <DialogDescription>
            You can create a new note book by clicking the button below.
          </DialogDescription>
        </DialogHeader>

        <form>
          <Input
            placeholder="Name..."
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <div className="h-4"></div>
          <div className="flex item-center gap-2">
            <Button variant="secondary" type="reset">
              Cancle
            </Button>
            <Button variant="premium" type="submit">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteDialog;
