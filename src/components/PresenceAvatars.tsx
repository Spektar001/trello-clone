"use client";
import { Presence, useOthers } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/core";
import Image from "next/image";

type PresenceAvatarsProps = {
  presenceKey: keyof Presence;
  presenceValue: string;
};

const PresenceAvatars = ({
  presenceKey,
  presenceValue,
}: PresenceAvatarsProps) => {
  const others = useOthers((users) => {
    return users.filter((u) => u.presence?.[presenceKey] === presenceValue);
  }, shallow);

  return (
    <div className="flex gap-1">
      {others.map((user) => (
        <div key={user.id}>
          <Image
            className="rounded-full"
            width={28}
            height={28}
            src={user.info.image}
            alt="avatar"
          />
        </div>
      ))}
    </div>
  );
};

export default PresenceAvatars;
