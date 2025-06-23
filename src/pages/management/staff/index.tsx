import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { DropdownMenu } from 'radix-ui';
import { IconDots, IconFileSpreadsheet } from '@tabler/icons-react';
import { IconChevronLeft } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import Heading from '@ui/Heading';
import Button from '@ui/Button';
import Tag from '@ui/Tag';
import Show from '@ui/Show';
import AlertDialog, { AlertDialogCancel } from '@ui/AlertDialog';
import { Table, TableHeader, TableHeaderCell, TableBody, TableCell, TableRow } from '@ui/Table';
import Empty from '@/components/business/Empty';
import MiniUser from '@/components/business/MiniUser';
import SearchInput from '@/components/business/SearchInput';
import { usePagination } from '@/hooks';
import { getStaffList } from '@/_mock/member';
import type { StaffItem } from '@/types/member';

export default function StaffPage() {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffItem>();
  const [query, setQuery] = useState('');
  const { t } = useTranslation();
  const { data: response, isPending } = useQuery({ queryKey: ['staff'], queryFn: getStaffList });
  const { currentPage, isFirstPage, isLastPage, totalPage, nextPage, prevPage } = usePagination({ pageSize: 10, total: response?.data.length });

  // mock paginating staff data
  const currentData = useMemo(() => {
    return response?.data.slice((currentPage - 1) * 10, 10 * currentPage);
  }, [currentPage, response?.data]);

  const formatServiceTime = (time: number) => {
    if (time >= 12) {
      return `${(time / 12).toFixed(1)} years`;
    }
    return `${time} months`;
  };

  const handleDeleteStaff = (staff: StaffItem) => {
    setSelectedStaff(staff);
    setShowAlertDialog(true);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // mock search
    console.log('staff search query:', query);
  };

  return (
    <div>
      <Heading as="h3" className="mb-3">
        {t('menus.management.staffManagement')}
      </Heading>
      <Show when={!isPending} fallback={<Empty className="mt-40" />}>
        <div className="mb-4 flex items-center justify-end gap-2">
          <form onSubmit={handleSearch}>
            <SearchInput value={query} placeholder="search staff..." className="flex-1 md:min-w-60 md:flex-none" onChange={(e) => setQuery(e.target.value)} />
          </form>
          <Button className="gap-1">
            <IconFileSpreadsheet size={20} />
            Export Excel
          </Button>
        </div>
        <Table className="bg-background max-h-[unset]">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>{t('account.profile.name')}</TableHeaderCell>
              <TableHeaderCell>{t('account.profile.position')}</TableHeaderCell>
              <TableHeaderCell>{t('account.profile.startTime')}</TableHeaderCell>
              <TableHeaderCell>{t('account.profile.serviceTime')}</TableHeaderCell>
              <TableHeaderCell>{t('account.profile.salary')}</TableHeaderCell>
              <TableHeaderCell>{t('account.profile.employeeStatus')}</TableHeaderCell>
              <TableHeaderCell>{t('common.action')}</TableHeaderCell>
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
                  <Tag colors={item.status === 'employed' ? 'secondary' : 'warning'} pill bordered>
                    {item.status}
                  </Tag>
                </TableCell>
                <TableCell>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button colors="neutral" asIcon size="sm" variant="light">
                        <IconDots size={20} />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content align="start" className="dropdown-menu--content">
                        <DropdownMenu.Item className="dropdown-menu--item">{t('common.edit')}</DropdownMenu.Item>
                        <DropdownMenu.Item className="dropdown-menu--item hover:bg-danger/80 dark:text-white" onSelect={() => handleDeleteStaff(item)}>
                          {t('common.delete')}
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex items-center justify-end gap-2">
          <Button asIcon size="sm" colors="neutral" variant="bordered" onClick={prevPage} disabled={isFirstPage}>
            <IconChevronLeft size={20} />
          </Button>
          <p className="mx-3 text-sm">
            {currentPage}/{totalPage}
          </p>
          <Button asIcon size="sm" colors="neutral" variant="bordered" onClick={nextPage} disabled={isLastPage}>
            <IconChevronLeft className="rotate-180" size={20} />
          </Button>
        </div>
      </Show>
      <AlertDialog
        open={showAlertDialog}
        onOpenChange={setShowAlertDialog}
        title="Warning"
        description={
          <div>
            Are you sure to delete <strong>{selectedStaff?.username}</strong>?<p>this action can not be undone</p>
          </div>
        }
        footer={
          <div className="flex items-center justify-end gap-2 px-3.5">
            <AlertDialogCancel>
              <Button colors="neutral">{t('common.cancel')}</Button>
            </AlertDialogCancel>
            <AlertDialogCancel>
              <Button colors="danger" onClick={() => toast.success('action success', { position: 'top-center' })}>
                {t('common.delete')}
              </Button>
            </AlertDialogCancel>
          </div>
        }
      />
    </div>
  );
}
