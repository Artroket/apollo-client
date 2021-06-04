import { ApolloQueryResult } from '@apollo/client';
import { useState } from 'react';

interface IRefetchPage {
  (
    variables?:
      | Partial<{
          offset: number;
          limit: number;
        }>
      | undefined,
  ): Promise<ApolloQueryResult<any>>;
}

const usePagination = (
  pageSize: number,
  totalCount: number,
  refetch: IRefetchPage,
  currentPage: number = 0,
): JSX.Element => {
  const [page, setPage] = useState(currentPage);
  const nextPage = page + 1;
  const isOutOfRecords: boolean = nextPage * pageSize < totalCount;

  const loadNextPage = () => {
    if (isOutOfRecords) {
      refetch({ offset: nextPage * pageSize, limit: pageSize });
      setPage(nextPage);
    }
  };

  const loadMoreButton = (
    <div>
      <button disabled={!isOutOfRecords} onClick={loadNextPage}>
        Load more
      </button>
    </div>
  );
  return loadMoreButton;
};

export default usePagination;
