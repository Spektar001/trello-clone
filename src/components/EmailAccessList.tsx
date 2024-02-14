"use client";

import {
  deleteBoard,
  removeEmailFromBoard,
  updateBoard,
} from "@/app/actions/boardActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoomAccesses } from "@liveblocks/node";
import { useRouter } from "next/navigation";

const EmailAccessList = ({
  boardId,
  usersAccesses,
}: {
  boardId: string;
  usersAccesses: RoomAccesses;
}) => {
  const router = useRouter();

  const handleDelete = async (emailToDelete: string) => {
    await removeEmailFromBoard(emailToDelete, boardId);
    router.refresh();
  };

  return (
    <div className="max-w-xs">
      {Object.keys(usersAccesses).map((email) => (
        <div
          key={email}
          className="max-w-xs flex justify-between items-center gap-2 my-4 border rounded-lg pl-4"
        >
          {email}
          <button className="btn" onClick={() => handleDelete(email)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default EmailAccessList;
