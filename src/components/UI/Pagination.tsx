type props = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageWindow?: number;
};

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  pageWindow = 10,
}: props) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the range of pages to display
  const currentWindowStart =
    Math.floor((currentPage - 1) / pageWindow) * pageWindow + 1;
  const currentWindowEnd = Math.min(
    currentWindowStart + pageWindow - 1,
    totalPages,
  );

  const handlePageChange = (page: number) => {
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
