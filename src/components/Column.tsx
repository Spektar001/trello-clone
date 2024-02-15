import { Card, useMutation, useStorage } from "@/app/liveblocks.config";
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shallow } from "@liveblocks/core";
import { FormEvent, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import CancelButton from "./CancelButton";
import { default as ColumnCard } from "./Card";
import NewCardForm from "./forms/NewCardForm";

type ColumnProps = {
  id: string;
  name: string;
};

const Column = ({ id, name }: ColumnProps) => {
  const [renameMode, setRenameMode] = useState(false);
  const [addCardMode, setAddCardMode] = useState(false);

  const columnCards = useStorage<Card[]>((root) => {
    return root.cards
      .filter((card) => card.columnId === id)
      .map((c) => ({ ...c }))
      .sort((a, b) => a.index - b.index);
  }, shallow);

  const updateCard = useMutation(({ storage }, index, updateData) => {
    const card = storage.get("cards").get(index);
    if (card) {
      for (let key in updateData) {
        card?.set(key as keyof Card, updateData[key]);
      }
    }
  }, []);

  const updateColumn = useMutation(({ storage }, id, newName) => {
    const columns = storage.get("columns");
    columns.find((c) => c.toObject().id === id)?.set("name", newName);
  }, []);

  const deleteColumn = useMutation(({ storage }, id) => {
    const columns = storage.get("columns");
    const columnIndex = columns.findIndex((c) => c.toObject().id === id);
    columns.delete(columnIndex);
  }, []);

  const setTasksOrderForColumn = useMutation(
    ({ storage }, sortedCards: Card[], newColumnId) => {
      const idsOfSortedCards = sortedCards.map((c) => c.id.toString());
      const allCards: Card[] = [
        ...storage.get("cards").map((c) => c.toObject()),
      ];
      idsOfSortedCards.forEach((sortedCardId, colIndex) => {
        const cardStorageIndex = allCards.findIndex(
          (c) => c.id.toString() === sortedCardId
        );
        updateCard(cardStorageIndex, {
          columnId: newColumnId,
          index: colIndex,
        });
      });
    },
    []
  );

  const handleRenameSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");
    if (input) {
      const newColumnName = input.value;
      updateColumn(id, newColumnName);
      setRenameMode(false);
    }
  };

  return (
    <div className="w-48 bg-white shadow-sm rounded-md p-2">
      {!renameMode && (
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">{name}</h3>
          <button
            onClick={() => setRenameMode(true)}
            className="text-gray-300 hover:text-gray-600 transition ease-in duration-200"
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
      )}
      {renameMode && (
        <div className="mb-8">
          Edit name:
          <form onSubmit={handleRenameSubmit} className="mb-2">
            <input type="text" defaultValue={name} />
            <button type="submit" className="w-full mt-2">
              Save
            </button>
          </form>
          <button
            onClick={() => deleteColumn(id)}
            className="w-full flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-md with-icon"
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete column
          </button>
          <CancelButton onClick={() => setRenameMode(false)} />
        </div>
      )}
      {!renameMode && columnCards && (
        <>
          <ReactSortable
            list={columnCards}
            setList={(items) => setTasksOrderForColumn(items, id)}
            group={"cards"}
            className="min-h-10"
            ghostClass="opacity-40"
          >
            {columnCards.map((card) => (
              <ColumnCard key={card.id} id={card.id} name={card.name} />
            ))}
          </ReactSortable>
        </>
      )}
      {!addCardMode && (
        <button
          onClick={() => setAddCardMode(true)}
          className="w-full flex justify-center text-gray-300 text-sm font-medium hover:text-gray-600 transition ease-in duration-200"
        >
          Add card
        </button>
      )}
      {addCardMode && (
        <NewCardForm columnId={id} onClick={() => setAddCardMode(false)} />
      )}
    </div>
  );
};

export default Column;
