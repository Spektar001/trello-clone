"use client";

import { RoomInfo } from "@liveblocks/node";
import { redirect } from "next/navigation";
import { createBoard } from "../actions/boardActions";

const NewBoardPage = () => {
  const handleNewBoardSubmit = async (formData: FormData) => {
    const boardName = formData.get("name")?.toString() || "";
    const response = await createBoard(boardName);

    if (typeof response === "boolean") {
      console.error("Error creating a new board");
      return;
    }

    const { id } = response as RoomInfo;
    redirect(`/boards/${id}`);
  };

  return (
    <div>
      <form action={handleNewBoardSubmit} className="max-w-xs block">
        <h1 className="text-2xl mb-4">Create new board</h1>
        <input type="text" name="name" placeholder="board name" />
        <button type="submit" className="mt-2 w-full">
          Create board
        </button>
      </form>
    </div>
  );
};

export default NewBoardPage;
