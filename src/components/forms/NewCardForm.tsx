"use client";

import { Card, useMutation } from "@/app/liveblocks.config";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LiveObject } from "@liveblocks/core";
import uniqid from "uniqid";

const NewCardForm = ({
  columnId,
  onClick,
}: {
  columnId: string;
  onClick: () => void;
}) => {
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
      onClick();
    }
  };

  return (
    <div className="relative flex items-center">
      <form onSubmit={handleNewCardFormSubmit}>
        <input required type="text" placeholder="Card name" />
      </form>
      <button
        onClick={onClick}
        className="absolute right-2 text-gray-300 hover:text-gray-600 transition ease-in duration-200"
      >
        <FontAwesomeIcon className="fa-lg" icon={faClose} />
      </button>
    </div>
  );
};

export default NewCardForm;
