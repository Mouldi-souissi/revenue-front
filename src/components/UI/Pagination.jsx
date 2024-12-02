import React from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  pageWindow = 10, // Default window size is 10
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the range of pages to display
  const currentWindowStart =
    Math.floor((currentPage - 1) / pageWindow) * pageWindow + 1;
  const currentWindowEnd = Math.min(
    currentWindowStart + pageWindow - 1,
    totalPages,
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = currentWindowStart; i <= currentWindowEnd; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-btn ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>,
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="page-btn"
      >
        Précédent
      </button>
      {currentWindowStart > 1 && (
        <button
          className="page-btn"
          onClick={() => handlePageChange(currentWindowStart - 1)}
        >
          ...
        </button>
      )}
      {renderPageNumbers()}
      {currentWindowEnd < totalPages && (
        <button
          className="page-btn"
          onClick={() => handlePageChange(currentWindowEnd + 1)}
        >
          ...
        </button>
      )}
      <button
        className="page-btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
