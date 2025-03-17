import { IPaginationResponse } from "../../common/interfaces/pagination.interface";
import { getPagination } from "../../js/pagination";

export function renderPagination(
    containerId: string,
    pagination: IPaginationResponse,
    onPageChange: (page: number) => void
  ) {
    const container = document.getElementById(containerId);
    if (!container) return;
  
    const { totalPages, currentPage, startPage, endPage, hasPrev, hasNext } =
      getPagination(pagination);
  
    let paginationHtml = `<div class="pagination">`;
  
    if (hasPrev) {
      paginationHtml += `<button class="page-btn" data-page="${currentPage - 1}">Previous</button>`;
    }
  
    for (let i = startPage; i <= endPage; i++) {
      paginationHtml += `<button class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
    }
  
    if (hasNext) {
      paginationHtml += `<button class="page-btn" data-page="${currentPage + 1}">Next</button>`;
    }
  
    paginationHtml += `</div>`;
    container.innerHTML = paginationHtml;
  
    document.querySelectorAll(".page-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const page = parseInt((e.target as HTMLElement).getAttribute("data-page") || "1");
        onPageChange(page);
      });
    });
  }
  