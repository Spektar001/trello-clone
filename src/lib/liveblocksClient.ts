import { Liveblocks } from "@liveblocks/node";

export const liveblocksClient = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export const getLiveblocksClient = () => {
  return new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
  });
};
