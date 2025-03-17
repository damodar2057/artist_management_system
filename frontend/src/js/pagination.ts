import { IPaginationResponse } from "../common/interfaces/pagination.interface";

  
  export function getPagination(pagination: IPaginationResponse, maxPagesToShow = 5) {
    const { totalPages, currentPage } = pagination;
    
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
    return {
      ...pagination,
      startPage,
      endPage,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages,
    };
  }
  