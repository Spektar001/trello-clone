"use server";

import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
import { RoomInfo } from "@liveblocks/node";
import uniqid from "uniqid";

export const createBoard = async (name: string): Promise<false | RoomInfo> => {
  const email = await getUserEmail();
  if (email) {
    const roomId = uniqid.time();
    return await liveblocksClient.createRoom(roomId, {
      defaultAccesses: [],
      usersAccesses: {
        [email]: ["room:write"],
      },
      metadata: {
        boardName: name,
      },
    });
  }
  return false;
};

export const addEmailToBoard = async (email: string, boardId: string) => {
  const room = await liveblocksClient.getRoom(boardId);
  const usersAccesses = room.usersAccesses;
  usersAccesses[email] = ["room:write"];
  await liveblocksClient.updateRoom(boardId, { usersAccesses });
  return true;
};

export const updateBoard = async (boardId: string, updateData: {}) => {
  await liveblocksClient.updateRoom(boardId, updateData);
  return true;
};

export const removeEmailFromBoard = async (email: string, boardId: string) => {
  const room = await liveblocksClient.getRoom(boardId);
  const usersAccesses: any = room.usersAccesses;
  usersAccesses[email] = null;
  await liveblocksClient.updateRoom(boardId, { usersAccesses });
  return true;
};

export const deleteBoard = async (boardId: string) => {
  await liveblocksClient.deleteRoom(boardId);
  return true;
};
