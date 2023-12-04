//next react
import React from "react";
import Link from "next/link";
// costum Fn to handle paginations
import { paginationHandler } from "@/utils/paginationFn";

const Pagination = ({
  page,
  limit,
  articlesCount,
}: {
  page: number;
  limit: number;
  articlesCount: number;
}) => {
  const paginationData = paginationHandler({
    articlesCount,
    limit,
    page,
    buttonsCount: 4,
  });

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${page === 1 && "disabled"}`}>
          <Link
            className="page-link"
            href={
              page > 1 ? `/articles/page/${paginationData.left}` : `/articles`
            }
            aria-label="Previous"
          >
            <span aria-hidden="true">&lt;</span>
          </Link>
        </li>
        {paginationData.middleButtonsNumbers.map((pageNumber) => (
          <li className="page-item" key={pageNumber}>
            <Link
              className="page-link"
              href={
                pageNumber === 1 ? "/articles" : `/articles/page/${pageNumber}`
              }
            >
              {pageNumber}
            </Link>
          </li>
        ))}

        <li className="page-item">
          <Link
            className="page-link"
            href={`/articles/page/${paginationData.right}`}
            aria-label="Next"
          >
            <span aria-hidden="true">&gt;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
