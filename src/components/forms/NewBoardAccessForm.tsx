"use client";

import { addEmailToBoard } from "@/app/actions/boardActions";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const NewBoardAccess = ({ boardId }: { boardId: string }) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const addEmail = async (formData: FormData) => {
    const email = formData.get("email")?.toString() || "";
    await addEmailToBoard(email, boardId);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    router.refresh();
  };

  return (
    <form action={addEmail} className="max-w-xs">
      <h2 className="text-lg mb-2">Add email</h2>
      <input
        ref={inputRef}
        type="text"
        name="email"
        placeholder="john@example.com"
      />
      <button className="w-full mt-2" type="submit">
        Save
      </button>
    </form>
  );
};

export default NewBoardAccess;
