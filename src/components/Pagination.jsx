import React from "react";

function Pagination({
  postsPerPage,
  totalMoves,
  paginate,
  nextPage,
  previousPage,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMoves / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="d-flex justify-content-start align-items-center">
      <button
        className="btn btn-white font-weight-bold me-2"
        onClick={() => previousPage(pageNumbers)}
      >
        <i className="fa fa-chevron-left" />
      </button>
      {pageNumbers.map((number) => (
        <li key={number} className="page-item me-2">
          <button
            onClick={() => paginate(number)}
            className={`${
              currentPage === number ? "btn-secondary" : "btn-outline-primary"
            } btn font-weight-bold`}
            style={{ width: "40px" }}
          >
            {number}
          </button>
        </li>
      ))}
      <button
        className="btn btn-white font-weight-bold me-2"
        onClick={() => nextPage(pageNumbers)}
      >
        <i className="fa fa-chevron-right" />
      </button>
    </ul>
  );
}

export default Pagination;
