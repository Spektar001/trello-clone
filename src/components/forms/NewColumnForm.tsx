"use client";

import { useMutation } from "@/app/liveblocks.config";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LiveObject } from "@liveblocks/core";
import uniqid from "uniqid";

const NewColumnForm = ({ onClick }: { onClick: () => void }) => {
  const addColumn = useMutation(({ storage }, columnName) => {
    return storage
      .get("columns")
      .push(
        new LiveObject({ name: columnName, id: uniqid.time(), index: 9999 })
      );
  }, []);

  const handleNewColumn = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");
    if (input?.value) {
      const columnName = input?.value;
      addColumn(columnName);
      input.value = "";
      onClick();
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleNewColumn} className="max-w-xs">
        <label className="block relative">
          <span className="text-gray-600 block">Column name:</span>
          <input required type="text" placeholder="New column name" />
        </label>
        <button type="submit" className="mt-2 w-full">
          Create column
        </button>
      </form>
      <button
        onClick={onClick}
        className="absolute top-8 right-2 text-gray-300 hover:text-gray-600 transition ease-in duration-200"
      >
        <FontAwesomeIcon className="fa-lg" icon={faClose} />
      </button>
    </div>
  );
};

export default NewColumnForm;
