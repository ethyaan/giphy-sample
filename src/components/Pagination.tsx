import { Pagination } from "react-bootstrap";
interface loaderProps {
  offset: number;
  count: number;
  total: number;
  onChange: (callback: number) => void;
}

// put the selected page number in the middle of navigator list
const paginationFeed = (currentPage: number, totalPages: number) => {
  const baseNumber = 5;
  const cutNumber = (baseNumber - 1) / 2;
  if (totalPages <= baseNumber || currentPage <= 3) {
    return Array.from({ length: baseNumber }, (_, i) => i + 1);
  }
  const pages = [currentPage];
  let index = 0;
  do {
    for (let i = 1; i <= cutNumber; i++) {
      const prevPage = currentPage - (i + index * cutNumber);
      const NextPage = currentPage + (i + index * cutNumber);
      if (NextPage <= totalPages && pages.length < baseNumber) {
        pages.push(NextPage);
      }
      if (prevPage > 0 && prevPage <= totalPages && pages.length < baseNumber) {
        pages.unshift(prevPage);
      }
    }
    index++;
  } while (pages.length < baseNumber);
  return pages;
};

const GifsPagination = ({ offset, count, total, onChange }: loaderProps) => {
  if (!total) {
    return <></>;
  }

  const limit = 25;
  const currentPage = offset / limit + 1;
  const totalPages = Math.ceil(total / count);
  const feed = paginationFeed(currentPage, total);

  const goToPage = (pageNumber: number) => {
    if (pageNumber === currentPage) return;
    onChange(pageNumber * limit - limit);
  };

  return (
    <>
      <Pagination>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => {
            goToPage(currentPage - 1);
          }}
        />
        {feed &&
          feed.map((page: number, index: number) => {
            return (
              <Pagination.Item
                active={page === currentPage}
                key={`page-item-${index}`}
                onClick={() => {
                  goToPage(page);
                }}
              >
                {page}
              </Pagination.Item>
            );
          })}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => {
            goToPage(currentPage + 1);
          }}
        />
      </Pagination>
    </>
  );
};

export default GifsPagination;
