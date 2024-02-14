"use client";

import { Column, useMutation, useStorage } from "@/app/liveblocks.config";
import { LiveList, LiveObject, shallow } from "@liveblocks/core";
import { ReactSortable } from "react-sortablejs";
import { default as BoardColumn } from "./Column";
import NewColumnForm from "./forms/NewColumnForm";

const Columns = () => {
  const columns = useStorage(
    (root) => root.columns.map((c) => ({ ...c })),
    shallow
  );

  const updateColumns = useMutation(
    ({ storage }, columns: LiveObject<Column>[]) => {
      storage.set("columns", new LiveList(columns));
    },
    []
  );

  const setColumnsOrder = (sortedColumns: Column[]) => {
    const newColumns: LiveObject<Column>[] = [];
    sortedColumns.forEach((sortedColumn, newIndex) => {
      const newSortedColumn = { ...sortedColumn };
      newSortedColumn.index = newIndex;
      newColumns.push(new LiveObject(newSortedColumn));
    });
    updateColumns(newColumns);
  };

  if (!columns) {
    return false;
  }

  return (
    <div className="flex gap-4">
      <ReactSortable
        list={columns}
        setList={setColumnsOrder}
        group={"board-column"}
        className="flex gap-4"
        ghostClass="opacity-40"
      >
        {columns?.length > 0 &&
          columns.map((column) => <BoardColumn key={column.id} {...column} />)}
      </ReactSortable>
      <NewColumnForm />
    </div>
  );
};

export default Columns;
