import { useState } from "react";
import type { TasksType } from "../types/TasksType";

const usePagination = (tasks: TasksType[]) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const buttons: number[] = [];
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    buttons.push(i);
  }

  return {
    firstIndex,
    lastIndex,
    currentPage,
    setCurrentPage,
    buttons,
    setItemsPerPage,
    itemsPerPage,
  };
};

export default usePagination;
