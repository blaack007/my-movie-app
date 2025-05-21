import React from 'react';
import '../styles/components/Pagination.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="app-pagination-container">
      <ul className="app-pagination">
        <li className={`app-pagination__item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="app-pagination__link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </button>
        </li>
        
        {[...Array(Math.min(5, totalPages))].map((_, index) => {
          let pageNumber;
          if (totalPages <= 5) {
            pageNumber = index + 1;
          } else if (currentPage <= 3) {
            pageNumber = index + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + index;
          } else {
            pageNumber = currentPage - 2 + index;
          }

          if (pageNumber < 1 || pageNumber > totalPages) return null;

          return (
            <li 
              key={pageNumber} 
              className={`app-pagination__item ${currentPage === pageNumber ? 'active' : ''}`}
            >
              <button
                className="app-pagination__link"
                onClick={() => onPageChange(pageNumber)}
                aria-current={currentPage === pageNumber ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        <li className={`app-pagination__item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="app-pagination__link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}
