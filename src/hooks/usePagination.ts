import { useEffect, useState } from 'react';

interface UsePagination {
  total?: number;
  pageSize?: number;
}

export function usePagination({ pageSize = 10, total = 0 }: UsePagination) {
  const [pagination, setPagination] = useState({
    current: 1,
    size: pageSize,
    total
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, total, size: pageSize }));
  }, [total, pageSize]);

  const isFirstPage = pagination.current === 1;
  const isLastPage = pagination.current === Math.ceil(pagination.total / pagination.size);

  const prevPage = () => {
    if (pagination.current > 1) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current - 1
      }));
    }
  };

  const nextPage = () => {
    if (pagination.current < Math.ceil(pagination.total / pagination.size)) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current + 1
      }));
    }
  };

  return { currentPage: pagination.current, isFirstPage, isLastPage, prevPage, nextPage };
}
