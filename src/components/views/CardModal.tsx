"use client";

import { useUpdateMyPresence } from "@/app/liveblocks.config";
import "@liveblocks/react-comments/styles.css";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import CardModalBody from "../CardModalBody";

const CardModal = () => {
  const router = useRouter();
  const params = useParams();
  const updateMyPresence = useUpdateMyPresence();

  const handleBackDropClick = () => {
    router.back();
  };

  useEffect(() => {
    if (params.cardId) {
      updateMyPresence({ cardId: params.cardId.toString() });
    }
  }, [params]);

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-10"></div>
      <div
        className="absolute inset-0 z-20 w-full"
        onClick={handleBackDropClick}
      >
        <div className="max-w-md mx-auto bg-white my-8 px-4 p-1 rounded-md">
          <div onClick={(ev) => ev.stopPropagation()}>
            <CardModalBody />
          </div>
        </div>
        <div>&nbsp;</div>
      </div>
    </>
  );
};

export default CardModal;
