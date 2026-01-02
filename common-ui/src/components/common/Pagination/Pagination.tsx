import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  showInfo = true,
  className = ''
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();

  return (
    <div className={`${styles.pagination} ${className}`}>
      {showInfo && totalItems && itemsPerPage && (
        <div className={styles.paginationInfo}>
          {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-
          {Math.min(currentPage * itemsPerPage, totalItems)} / {totalItems}
        </div>
      )}

      <div className={styles.paginationControls}>
        <button
          className={`${styles.paginationButton} ${styles.paginationButtonPrev}`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="이전 페이지"
        >
          ‹
        </button>

        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className={styles.paginationDots}>...</span>
            ) : (
              <button
                className={`${styles.paginationButton} ${
                  currentPage === page ? styles.paginationButtonActive : ''
                }`}
                onClick={() => handlePageClick(page as number)}
                aria-label={`페이지 ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          className={`${styles.paginationButton} ${styles.paginationButtonNext}`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="다음 페이지"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Pagination;