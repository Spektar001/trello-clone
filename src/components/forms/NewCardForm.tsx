"use client";

import { Card, useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/core";
import uniqid from "uniqid";

const NewCardForm = ({ columnId }: { columnId: string }) => {
  const addCard = useMutation(
    ({ storage }, cardName) => {
      return storage.get("cards").push(
        new LiveObject<Card>({
          name: cardName,
          id: uniqid.time(),
          columnId: columnId,
          index: 9999,
        })
      );
    },
    [columnId]
  );

  const handleNewCardFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");
    if (input) {
      const cardName = input?.value;
      addCard(cardName);
      input.value = "";
    }
  };

  return (
    <form onSubmit={handleNewCardFormSubmit}>
      <input type="text" placeholder="Card name" />
    </form>
  );
};

export default NewCardForm;
