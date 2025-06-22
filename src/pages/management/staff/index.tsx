import { useMemo } from 'react';
import { IconChevronLeft } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import Heading from '@ui/Heading';
import Button from '@ui/Button';
import Tag from '@ui/Tag';
import Show from '@ui/Show';
import { Table, TableHeader, TableHeaderCell, TableBody, TableCell, TableRow } from '@ui/Table';
import Empty from '@/components/business/Empty';
import MiniUser from '@/components/business/MiniUser';
import { usePagination } from '@/hooks';
import { getStaffList } from '@/_mock/member';

export default function StaffPage() {
  const { t } = useTranslation();
  const { data: response, isPending } = useQuery({ queryKey: ['staff'], queryFn: getStaffList });
  const { currentPage, isFirstPage, isLastPage, nextPage, prevPage } = usePagination({ pageSize: 10, total: response?.data.length });

  const currentData = useMemo(() => {
    return response?.data.slice((currentPage - 1) * 10, 10 * currentPage);
  }, [currentPage, response?.data]);

  const formatServiceTime = (time: number) => {
    if (time >= 12) {
      return `${(time / 12).toFixed(1)} years`;
    }
    return `${time} months`;
  };

  return (
    <div>
      <Heading as="h3" className="mb-3">
        {t('menus.management.staffManagement')}
      </Heading>
      <Show when={!isPending} fallback={<Empty className="mt-40" />}>
        <Table fixedHeader className="max-h-[unset]">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Position</TableHeaderCell>
              <TableHeaderCell>Start Time</TableHeaderCell>
              <TableHeaderCell>Service Time</TableHeaderCell>
              <TableHeaderCell>Salary</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="w-25">S_{item.id}</TableCell>
                <TableCell className="w-25">
                  <MiniUser username={item.username} avatarUrl={item.avatarUrl} />
                </TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell>{item.startDate.toLocaleString('en', { month: 'short', year: 'numeric' })}</TableCell>
                <TableCell>{formatServiceTime(item.serviceTime)}</TableCell>
                <TableCell>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.salary)}</TableCell>
                <TableCell>
                  <Tag colors={item.status === 'employed' ? 'secondary' : 'warning'} pill bordered className="capitalize">
                    {item.status}
                  </Tag>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex items-center justify-end gap-2">
          <Button asIcon size="sm" colors="neutral" variant="bordered" onClick={prevPage} disabled={isFirstPage}>
            <IconChevronLeft size={20} />
          </Button>
          <p className="mx-3">
            {currentPage}/{(response?.data.length || 0) / 10}
          </p>
          <Button asIcon size="sm" colors="neutral" variant="bordered" onClick={nextPage} disabled={isLastPage}>
            <IconChevronLeft className="rotate-180" size={20} />
          </Button>
        </div>
      </Show>
    </div>
  );
}
