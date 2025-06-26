import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { DropdownMenu } from 'radix-ui';
import { IconDots, IconPlus } from '@tabler/icons-react';
import { IconChevronLeft } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import Heading from '@ui/Heading';
import Button from '@ui/Button';
import Tag from '@ui/Tag';
import Show from '@ui/Show';
import Select from '@ui/Select';
import AlertDialog, { AlertDialogCancel } from '@ui/AlertDialog';
import { Table, TableHeader, TableHeaderCell, TableBody, TableCell, TableRow } from '@ui/Table';
import Empty from '@/components/business/Empty';
import MiniUser from '@/components/business/MiniUser';
import SearchInput from '@/components/business/SearchInput';
import LabelField from '@/components/business/LabelField';
import DynamicTrans from '@/components/business/DynamicTrans';
import { usePagination, useLanguage } from '@/hooks';
import { useMockStore } from '@/store/mock';
import { getStaffList } from '@/_mock/member';
import type { StaffItem } from '@/types/user';
import { languageMap, positionOptions } from '@/utils/constants';
import { cn } from '@/lib/utils';

export default function StaffPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffItem>();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    position: 'all',
    status: 'all'
  });
  const lng = useLanguage();
  const { setStaffList } = useMockStore();

  const { data: response, isPending } = useQuery({ queryKey: ['staff'], queryFn: getStaffList });
  const { currentPage, isFirstPage, isLastPage, totalPage, nextPage, prevPage } = usePagination({ pageSize: 10, total: response?.data.length });

  // stash staff data
  useEffect(() => {
    setStaffList(response?.data || []);
  }, [response?.data, setStaffList]);

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

  const handleReset = () => {
    setFilters({ status: 'all', position: 'all' });
    toast.success('Reset success', { position: 'top-center' });
  };

  const handleEdit = (item: StaffItem) => {
    navigate('/management/staff-edit/' + item.id);
  };

  const handleCreate = () => {
    navigate('/management/staff-create');
  };

  return (
    <div>
      <Heading as="h3" className="mb-3">
        {t('menus.management.staffManagement')}
      </Heading>
      <div className="panel">
        <Show when={!isPending} fallback={<Empty className="h-60" />}>
          <div className="mb-4 flex flex-col flex-wrap gap-3 lg:flex-row lg:justify-between">
            <div className="flex flex-col gap-3 md:flex-row">
              <LabelField layout="horizontal" className={cn('grid-cols-[1fr_4fr] md:w-50', { 'md:grid-cols-[1fr_2fr]': lng === languageMap.zh })} label={t('account.profile.employeeStatus')}>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters({ ...filters, status: value })}
                  className="w-full"
                  items={[
                    { id: 'all', label: t('common.all'), value: 'all' },
                    { id: 'employed', label: t('status.employed'), value: 'employed' },
                    { id: 'resigned', label: t('status.resigned'), value: 'resigned' }
                  ]}
                  placeholder={t('account.profile.employeeStatus')}
                />
              </LabelField>
              <LabelField layout="horizontal" className={cn('grid-cols-[1fr_4fr] md:w-65', { 'md:grid-cols-[1fr_5fr]': lng === languageMap.zh })} label={t('account.profile.position')}>
                <Select
                  value={filters.position}
                  onValueChange={(value) => setFilters({ ...filters, position: value })}
                  placeholder={t('account.profile.position')}
                  className="w-full"
                  items={[
                    { id: 'all', label: t('common.all'), value: 'all' },
                    ...positionOptions.map((p) => ({ id: p.value, label: <DynamicTrans>{`position.${p.label}`}</DynamicTrans>, value: p.value }))
                  ]}
                />
              </LabelField>
            </div>
            <div className="flex gap-2">
              <form className="flex-1 md:min-w-60 md:flex-none" onSubmit={handleSearch}>
                <SearchInput value={query} placeholder="search staff..." className="" onChange={(e) => setQuery(e.target.value)} />
              </form>
              <Button colors="neutral" onClick={handleReset}>
                {t('common.reset')}
              </Button>
              <Button className="gap-1" onClick={handleCreate}>
                {t('account.addStaff')}
                <IconPlus size={18} />
              </Button>
            </div>
          </div>
          <Table className="bg-background max-h-[unset]">
            <TableHeader>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>{t('account.profile.name')}</TableHeaderCell>
                <TableHeaderCell>{t('account.profile.position')}</TableHeaderCell>
                <TableHeaderCell>{t('account.profile.positionLevel')}</TableHeaderCell>
                <TableHeaderCell className="min-w-20">{t('account.profile.startDate')}</TableHeaderCell>
                <TableHeaderCell className="min-w-20">{t('account.profile.serviceTime')}</TableHeaderCell>
                <TableHeaderCell>{t('account.profile.email')}</TableHeaderCell>
                <TableHeaderCell>{t('account.profile.employeeStatus')}</TableHeaderCell>
                <TableHeaderCell>{t('common.action')}</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="w-25">id_{item.id}</TableCell>
                  <TableCell className="w-25">
                    <MiniUser username={item.username} avatarUrl={item.avatarUrl} className="capitalize" />
                  </TableCell>
                  <TableCell className="min-w-40">
                    <DynamicTrans>{`position.${positionOptions.find((p) => p.value === item.position)?.label}`}</DynamicTrans>
                  </TableCell>
                  <TableCell>TP{item.positionLevel}</TableCell>
                  <TableCell>{item.startDate.toLocaleString('en', { month: 'short', year: 'numeric' })}</TableCell>
                  <TableCell>{formatServiceTime(item.serviceTime)}</TableCell>
                  <TableCell className="text-primary">{item.corpEmail}</TableCell>
                  <TableCell className="min-w-20">
                    <Tag colors={item.status === 'employed' ? 'secondary' : 'warning'} pill bordered>
                      <DynamicTrans>{`status.${item.status}`}</DynamicTrans>
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
                          <DropdownMenu.Item className="dropdown-menu--item" onSelect={() => handleEdit(item)}>
                            {t('common.edit')}
                          </DropdownMenu.Item>
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
      </div>
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
