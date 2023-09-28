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
import { Loader2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";


type Props = {};

const CreateNoteDialog = (props: Props) => {
  const [name, setName] = React.useState<string>("");
  const router = useRouter();

  const createNotebook = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/createNoteBook", {
        name,
      });

      return response.data;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check if the name is empty then alert the message
    if (!name) {
      alert("Please enter the name of the notebook");
      return;
    }

    // call the mutation
    createNotebook.mutate(undefined, {
      onSuccess: ({ note_id }) => {
        console.log("You are successfuly created a new notebook", { note_id });
        router.push(`/notebook/${note_id}`);
      },
      onError: (error) => {
        console.log(`There is an error while creating a new notebook ${error}`);
      },
    });
  };

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

        <form onSubmit={handleSubmit}>
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
            <Button variant="premium" type="submit" disabled={createNotebook.isLoading}>
              {createNotebook.isLoading && (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              )}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteDialog;
