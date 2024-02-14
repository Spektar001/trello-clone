"use client";

import { useMutation } from "@/app/liveblocks.config";
import {LiveObject} from "@liveblocks/core";
import uniqid from "uniqid";

const NewColumnForm = () => {
  const addColumn = useMutation(({ storage }, columnName) => {
    return storage
      .get("columns")
      .push(new LiveObject({ name: columnName, id: uniqid.time(), index: 9999 }));
  }, []);

  const handleNewColumn = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");
    if (input) {
      const columnName = input?.value;
      addColumn(columnName);
      input.value = "";
    }
  };

  return (
    <form onSubmit={handleNewColumn} className="max-w-xs">
      <label className="block">
        <span className="text-gray-600 block">Column name:</span>
        <input type="text" placeholder="New column name" />
      </label>
      <button type="submit" className="mt-2 w-full">
        Create column
      </button>
    </form>
  );
};

export default NewColumnForm;
