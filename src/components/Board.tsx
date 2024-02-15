"use client";

import { updateBoard } from "@/app/actions/boardActions";
import { RoomProvider, useUpdateMyPresence } from "@/app/liveblocks.config";
import {
  faClose,
  faCog,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { BoardContextProvider } from "./BoardContext";
import Columns from "./Columns";

const Board = ({ id, name }: { id: string; name: string | string[] }) => {
  const [renameMode, setRenameMode] = useState(false);
  const router = useRouter();
  const updateMyPresence = useUpdateMyPresence();

  useEffect(() => {
    updateMyPresence({ boardId: id });

    return () => {
      updateMyPresence({ boardId: null });
    };
  }, []);

  const handleNameSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");
    if (input) {
      const newName = input.value;
      await updateBoard(id, { metadata: { boardName: newName } });
      input.value = "";
      setRenameMode(false);
      router.refresh();
    }
  };

  return (
    <BoardContextProvider>
      <RoomProvider
        id={id}
        initialPresence={{ cardId: null, boardId: null }}
        initialStorage={{ columns: new LiveList(), cards: new LiveList() }}
      >
        <ClientSideSuspense fallback={<div>Loading...</div>}>
          {() => (
            <>
              <div className="flex gap-2 justify-between items-center mb-4">
                <div>
                  {!renameMode && (
                    <div className="flex gap-2 items-start">
                      <h1 className="text-3xl font-medium">{name}</h1>
                      <button
                        onClick={() => setRenameMode(true)}
                        className="text-gray-300 hover:text-gray-600 transition ease-in duration-200"
                      >
                        <FontAwesomeIcon
                          className="fa-sm"
                          icon={faPenToSquare}
                        />
                      </button>
                    </div>
                  )}
                  {renameMode && (
                    <div className="relative flex gap-2 items-center">
                      <form onSubmit={handleNameSubmit}>
                        <input
                          className="pr-7"
                          type="text"
                          defaultValue={name}
                        />
                      </form>
                      <button
                        onClick={() => setRenameMode(false)}
                        className="absolute right-2 text-gray-300 hover:text-gray-600"
                      >
                        <FontAwesomeIcon className="fa-lg" icon={faClose} />
                      </button>
                    </div>
                  )}
                </div>
                <Link
                  className="flex gap-2 items-center btn"
                  href={`${id}/settings`}
                >
                  <FontAwesomeIcon icon={faCog} />
                  Board settings
                </Link>
              </div>
              <Columns />
            </>
          )}
        </ClientSideSuspense>
      </RoomProvider>
    </BoardContextProvider>
  );
};

export default Board;
