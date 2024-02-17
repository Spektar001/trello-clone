"use server";

import BoardDeleteButton from "@/components/BoardDeleteButton";
import EmailAccessList from "@/components/EmailAccessList";
import NewBoardAccess from "@/components/forms/NewBoardAccessForm";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type BoardSettingsProps = {
  params: {
    boardId: string;
  };
};

const BoardSettings = async ({ params }: BoardSettingsProps) => {
  const { boardId } = params;
  const boardInfo = await liveblocksClient.getRoom(boardId);
  const userEmail = await getUserEmail();

  if (!boardInfo.usersAccesses[userEmail]) {
    return "Access denied!";
  }

  return (
    <div>
      <div className="flex justify-between">
        <Link
          className="inline-flex items-center gap-1 btn mb-4 group"
          href={`/boards/${boardId}`}
        >
          <FontAwesomeIcon className="transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transform-none" icon={faArrowLeft} />
          Go back to board
        </Link>
        <BoardDeleteButton boardId={boardId} />
      </div>
      <h1 className="text-2xl">
        Access to board {boardInfo.metadata.boardName}:
      </h1>
      <div className="mb-4">
        <EmailAccessList
          boardId={boardId}
          usersAccesses={boardInfo.usersAccesses}
        />
      </div>
      <NewBoardAccess boardId={boardId} />
    </div>
  );
};

export default BoardSettings;
