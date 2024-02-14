"use client";

import { deleteBoard } from "@/app/actions/boardActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const BoardDeleteButton = ({ boardId }: { boardId: string }) => {
  const router = useRouter();

  const handleDeleteBoard = async () => {
    await deleteBoard(boardId);
    router.push("/");
    router.refresh();
  };

  return (
    <div>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md flex gap-2 items-center hover:bg-red-600 transition ease-in duration-200"
        onClick={() => handleDeleteBoard()}
      >
        <FontAwesomeIcon icon={faTrash} />
        Delete board
      </button>
    </div>
  );
};

export default BoardDeleteButton;
