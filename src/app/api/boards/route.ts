import { liveblocksClient } from "@/lib/liveblocksClient";
import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const { id, update } = await request.json();
  const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
  });
  await liveblocks.updateRoom(id, update);
  return Response.json(true);
}
