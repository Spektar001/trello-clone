"use client";

import { RoomProvider } from "@/app/liveblocks.config";
import { RoomInfo } from "@liveblocks/node";
import Link from "next/link";
import PresenceAvatars from "./PresenceAvatars";

const BoardsTiles = ({ boards }: { boards: RoomInfo[] }) => {
  return (
    <>
      <div className="my-4 grid md:grid-cols-4 gap-2">
        {boards.length > 0 &&
          boards.map((board) => (
            <Link
              key={board.id}
              href={`/boards/${board.id}`}
              className="relative block px-4 py-6 text-lg rounded-md bg-white shadow-md hover:shadow-sm transition ease-in duration-200"
            >
              {board.metadata.boardName}
              <RoomProvider id={board.id} initialPresence={{}}>
                <div className="absolute bottom-1 right-1">
                  <PresenceAvatars
                    presenceKey={"boardId"}
                    presenceValue={board.id}
                  />
                </div>
              </RoomProvider>
            </Link>
          ))}
      </div>
    </>
  );
};

export default BoardsTiles;
