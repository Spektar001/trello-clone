'use server';

import Board from "@/components/Board";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";

type BoardPageProps = {
  params: {
    boardId: string;
  };
};

const BoardPage = async ({ params }: BoardPageProps) => {
  const boardId = params.boardId;
  const userEmail = await getUserEmail();
  const boardInfo = await liveblocksClient.getRoom(boardId);
  const userAccess = boardInfo.usersAccesses?.[userEmail];
  const hasAccess = userAccess && [...userAccess].includes('room:write');

  if (!hasAccess) {
    return (
      <div>Access denied!</div>
    );
  }

  return (
    <div>
      <Board name={boardInfo.metadata.boardName.toString()} id={boardId} />
    </div>
  );
};

export default BoardPage;
