import { useState } from "react";

export const usePagination = (itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const itemsPerPage = 10;
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    startIndex,
    endIndex,
    onPageChange,
  };
};
