import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IconPlus, IconRestore, IconPencil, IconTrash, IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import Heading from '@ui/Heading';
import { Button } from '@ui/Button';
import Tag from '@ui/Tag';
import Show from '@ui/Show';
import Select from '@ui/Select';
import Divider from '@/components/ui/Divider';
import { Table, TableHeader, TableHeaderCell, TableBody, TableCell, TableRow } from '@ui/Table';
import Empty from '@ui/Empty';
import MiniUser from '@/components/business/MiniUser';
import SearchInput from '@/components/business/SearchInput';
import LabelField from '@/components/business/LabelField';
import DynamicTrans from '@/components/business/DynamicTrans';
import Pagination from '@/components/business/Pagination';
import { useLanguage } from '@/hooks';
import { useMockStore } from '@/store/mock';
import { getStaffList } from '@/_mock/member';
import type { StaffItem } from '@/types/user';
import { languageMap, positionOptions } from '@/utils/constants';
import DeleteAlert from '@/components/business/DeleteAlert';

export default function StaffPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    position: 'all',
    status: 'all'
  });
  const lng = useLanguage();
  const { setStaffList } = useMockStore();
  const { data: response } = useQuery({ queryKey: ['staff'], queryFn: getStaffList });
  const { register, handleSubmit } = useForm<{ query: string }>();

  // stash staff data for mocking edit staff
  useEffect(() => {
    setStaffList(response?.data || []);
  }, [response?.data, setStaffList]);

  const filterData = useCallback(
    (data: StaffItem[]) => {
      return data.filter((item) => filters.status === 'all' || item.status === filters.status).filter((item) => filters.position === 'all' || item.position === filters.position);
    },
    [filters.position, filters.status]
  );

  const filteredTotal = useMemo(() => {
    return filterData(response?.data || []).length;
  }, [response?.data, filterData]);

  // mock paginating staff data
  const currentData = useMemo(() => {
    const filteredData = filterData(response?.data || []);
    return filteredData.slice((currentPage - 1) * 10, 10 * currentPage);
  }, [currentPage, response?.data, filterData]);

  const formatServiceTime = (time: number) => {
    if (time >= 12) {
      return `${(time / 12).toFixed(1)} years`;
    }
    return `${time} months`;
  };

  const handleSearch: SubmitHandler<{ query: string }> = (data) => {
    // mock search
    console.log('staff search query:', data);
  };

  const handleReset = () => {
    setFilters({ status: 'all', position: 'all' });
  };

  const handleEdit = (item: StaffItem) => {
    navigate('/user-management/staff-edit/' + item.id);
  };

  const handleCreate = () => {
    navigate('/user-management/staff-create');
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Heading as="h3">{t('menus.userManagement.staff')}</Heading>
        <Button className="gap-1" onClick={handleCreate}>
          <IconPlus size={18} />
          <span>{t('account.create')}</span>
        </Button>
      </div>
      <div className="panel">
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
          <form className="flex gap-2 md:min-w-60 md:flex-none" onSubmit={handleSubmit(handleSearch)}>
            <SearchInput placeholder="search staff..." {...register('query')} />
            <Button className="gap-1" type="submit">
              <IconSearch size={18} />
              <span className="hidden sm:block">{t('actions.search')}</span>
            </Button>
            <Button colors="neutral" className="gap-1" disabled={filters.position === 'all' && filters.status === 'all'} onClick={handleReset}>
              <IconRestore size={18} />
              <span className="hidden sm:block">{t('actions.reset')}</span>
            </Button>
          </form>
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
            <Show when={currentData.length} fallback={<Empty inTable className="h-50" />}>
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
                  <TableCell className="whitespace-nowrap">
                    <Button variant="light" size="sm" className="gap-1" onClick={() => handleEdit(item)}>
                      <IconPencil size={18} />
                      {t('actions.edit')}
                    </Button>
                    <Divider className="top-1/2 mx-2 h-4 -translate-y-1/2" orientation="vertical" />
                    <DeleteAlert
                      text={<span className="capitalize">{item.username}</span>}
                      trigger={
                        <Button variant="light" colors="danger" className="gap-1" size="sm">
                          <IconTrash size={18} />
                          {t('actions.delete')}
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </Show>
          </TableBody>
        </Table>
        <Pagination className="mt-4" pageSize={10} total={filteredTotal} onChange={setCurrentPage} />
      </div>
    </div>
  );
}
