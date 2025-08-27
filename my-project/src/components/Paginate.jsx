import React from 'react';
import { Link } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Paginate = ({ pages, page, keyword = '' }) => {
  if (pages <= 1) {
    return null;
  }

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious asChild>
            <Link to={page > 1 ? (keyword ? `/search/${keyword}/page/${page - 1}` : `/page/${page - 1}`) : '#'}>
              Previous
            </Link>
          </PaginationPrevious>
        </PaginationItem>

        {/* Page Numbers */}
        {[...Array(pages).keys()].map((x) => (
          <PaginationItem key={x + 1}>
            <PaginationLink asChild isActive={x + 1 === page}>
              <Link to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}>
                {x + 1}
              </Link>
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext asChild>
            <Link to={page < pages ? (keyword ? `/search/${keyword}/page/${page + 1}` : `/page/${page + 1}`) : '#'}>
              Next
            </Link>
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginate;