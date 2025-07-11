import { IconChevronLeft } from '@tabler/icons-react';
import { usePagination } from '@/hooks';
import Button from '@ui/Button';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface PaginationProps {
  pageSize?: number;
  total?: number;
  className?: string;
  onChange?: (page: number) => void;
}
export default function Pagination({ pageSize = 10, total = 0, onChange, className }: PaginationProps) {
  const { currentPage, isFirstPage, isLastPage, totalPage, nextPage, prevPage } = usePagination({ pageSize, total });
  const handleOnPageChange = (action: 'prev' | 'next') => {
    if (action === 'prev') {
      prevPage();
    } else {
      nextPage();
    }
  };

  useEffect(() => {
    onChange?.(currentPage);
  }, [currentPage, onChange]);
  return (
    <div className={cn('flex items-center justify-end gap-2', className)}>
      <Button asIcon size="sm" colors="neutral" variant="bordered" onClick={() => handleOnPageChange('prev')} disabled={isFirstPage}>
        <IconChevronLeft size={20} />
      </Button>
      <p className="mx-3 text-sm">
        {currentPage}/{totalPage}
      </p>
      <Button asIcon size="sm" colors="neutral" variant="bordered" onClick={() => handleOnPageChange('next')} disabled={isLastPage}>
        <IconChevronLeft className="rotate-180" size={20} />
      </Button>
    </div>
  );
}
