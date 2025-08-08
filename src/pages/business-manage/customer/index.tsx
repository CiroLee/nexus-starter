import { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DropdownMenu } from 'radix-ui';
import { IconUsers, IconMoodSpark, IconRefreshDot, IconCreditCardRefund, IconDots, IconFileText, IconPlus, IconRestore, IconSearch, IconPencil } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useMockStore } from '@/store/mock';
import { Card } from '@ui/Card';
import Heading from '@ui/Heading';
import Show from '@ui/Show';
import Tag from '@ui/Tag';
import { Button } from '@ui/Button';
import Select from '@ui/Select';
import { Table, TableHeader, TableHeaderCell, TableBody, TableCell, TableRow } from '@ui/Table';
import LabelField from '@/components/business/LabelField';
import Pagination from '@/components/business/Pagination';
import Empty from '@ui/Empty';
import DeleteAlert from '@/components/business/DeleteAlert';
import DynamicTrans from '@/components/business/DynamicTrans';
import RealTimeMetric from './components/RealTimeMetric';
import MemberTag from './components/MemberTag';
import CustomerDrawer from './components/CustomerDrawer';
import CreateDialog from './components/CreateDialog';
import { formatNumber, formatPercent } from '@/utils/number';
import { getCustomerMetrics, getCustomerList } from '@/_mock/customer';
import { getStatusColors } from './utils';
import SearchInput from '@/components/business/SearchInput';
import EditDialog from './components/EditDialog';
import { CustomerInfo } from '@/types/user';

export default function CustomerManagementPage() {
  const { t } = useTranslation();
  const { setCustomerList } = useMockStore();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerInfo>();
  const [filters, setFilters] = useState({
    memberType: 'all',
    status: 'all',
    sex: 'all'
  });

  const { register, handleSubmit } = useForm<{ query: string }>();
  const { data: customerMetrics } = useQuery({ queryKey: ['customerMetrics'], queryFn: getCustomerMetrics });
  const { data: customerList } = useQuery({ queryKey: ['customerList'], queryFn: getCustomerList });

  const handleSearch: SubmitHandler<{ query: string }> = (data) => {
    // mock search
    console.log('customer search query:', data);
  };

  const handleReset = () => {
    setFilters({ status: 'all', sex: 'all', memberType: 'all' });
  };
  const handleDeleteCustomer = (customer: CustomerInfo) => {
    setSelectedCustomer(customer);
    setShowDeleteAlert(true);
  };

  const filterData = useCallback(
    (data: CustomerInfo[]) => {
      return data.filter(
        (item) =>
          (filters.status === 'all' || item.status === filters.status) &&
          (filters.memberType === 'all' || item.memberType === filters.memberType) &&
          (filters.sex === 'all' || item.sex === filters.sex)
      );
    },
    [filters.memberType, filters.status, filters.sex]
  );

  const filteredTotal = useMemo(() => {
    return filterData(customerList?.data || []).length;
  }, [customerList?.data, filterData]);

  // mock paginating staff data
  const currentData = useMemo(() => {
    const filteredData = filterData(customerList?.data || []);
    return filteredData.slice((currentPage - 1) * 10, 10 * currentPage);
  }, [currentPage, customerList?.data, filterData]);

  // stash customer data for mocking edit customer
  useEffect(() => {
    setCustomerList(customerList?.data || []);
  }, [customerList?.data, setCustomerList]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <Heading as="h3">{t('menus.businessManagement.customer')}</Heading>
        <CreateDialog
          trigger={
            <Button className="gap-1">
              <IconPlus size={18} />
              <span>{t('customers.create')}</span>
            </Button>
          }
        />
      </div>
      <Card className="bg-background grid grid-cols-2 grid-rows-2 p-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4 xl:grid-rows-subgrid">
        <RealTimeMetric
          icon={<IconUsers size={18} />}
          title={t('customers.totalCustomers')}
          trend="up"
          value={formatNumber(customerMetrics?.data.total.total || 0)}
          briefData={customerMetrics?.data?.total.list || []}
        />
        <RealTimeMetric
          icon={<IconMoodSpark size={18} />}
          title={t('customers.create')}
          trend="up"
          value={formatNumber(customerMetrics?.data.news.total || 0)}
          briefData={customerMetrics?.data?.news.list || []}
        />
        <RealTimeMetric
          icon={<IconRefreshDot size={18} />}
          title={t('customers.churnsRate')}
          trend="down"
          value={formatPercent(customerMetrics?.data.churns.total || 0, 'en-US', { minimumFractionDigits: 2 })}
          briefData={customerMetrics?.data?.churns.list || []}
        />
        <RealTimeMetric
          className="after:content-none"
          icon={<IconCreditCardRefund size={18} />}
          title={t('customers.refunds')}
          trend="down"
          value={formatNumber(customerMetrics?.data.refunds.total || 0)}
          briefData={customerMetrics?.data?.refunds.list || []}
        />
      </Card>
      <div className="panel mt-8">
        <div className="mb-4 flex flex-col flex-wrap gap-3 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-3 md:flex-row">
            <LabelField layout="horizontal" className="md:grid-cols-[1fr_auto]" label={t('customers.profile.memberType')}>
              <Select
                className="w-full md:w-36"
                value={filters.memberType}
                onValueChange={(value) => setFilters(() => ({ ...filters, memberType: value }))}
                items={[
                  { id: 'all', label: t('common.all'), value: 'all' },
                  { id: 'ordinary', label: t('customers.tags.ordinary'), value: 'ordinary' },
                  { id: 'vip', label: t('customers.tags.vip'), value: 'vip' },
                  { id: 'corporate', label: t('customers.tags.corporate'), value: 'corporate' }
                ]}
              />
            </LabelField>
            <LabelField layout="horizontal" className="md:grid-cols-[1fr_auto]" label={t('customers.profile.status')}>
              <Select
                className="w-full md:w-30"
                value={filters.status}
                onValueChange={(value) => setFilters(() => ({ ...filters, status: value }))}
                items={[
                  { id: 'all', label: t('common.all'), value: 'all' },
                  { id: 'active', label: t('customers.status.active'), value: 'active' },
                  { id: 'forbidden', label: t('customers.status.forbidden'), value: 'forbidden' },
                  { id: 'reviewing', label: t('customers.status.reviewing'), value: 'reviewing' },
                  { id: 'churned', label: t('customers.status.churned'), value: 'churned' }
                ]}
              />
            </LabelField>
            <LabelField layout="horizontal" className="md:grid-cols-[1fr_auto]" label={t('customers.profile.sex')}>
              <Select
                className="w-full md:w-30"
                value={filters.sex}
                onValueChange={(value) => setFilters(() => ({ ...filters, sex: value }))}
                items={[
                  { id: 'all', label: t('common.all'), value: 'all' },
                  { id: 'male', label: t('common.male'), value: 'male' },
                  { id: 'female', label: t('common.female'), value: 'female' }
                ]}
              />
            </LabelField>
          </div>
          <form className="flex gap-2 md:min-w-60 md:flex-none" onSubmit={handleSubmit(handleSearch)}>
            <SearchInput placeholder="search customer..." {...register('query')} />
            <Button className="gap-1" type="submit">
              <IconSearch size={18} />
              <span className="hidden sm:block">{t('actions.search')}</span>
            </Button>
            <Button colors="neutral" className="gap-1" disabled={filters.sex === 'all' && filters.status === 'all' && filters.memberType === 'all'} onClick={handleReset}>
              <IconRestore size={18} />
              <span className="hidden sm:block">{t('actions.reset')}</span>
            </Button>
          </form>
        </div>
        <Table className="bg-background max-h-[unset]">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>{t('customers.profile.name')}</TableHeaderCell>
              <TableHeaderCell>{t('customers.profile.sex')}</TableHeaderCell>
              <TableHeaderCell className="w-30">{t('customers.profile.memberType')}</TableHeaderCell>
              <TableHeaderCell>{t('customers.profile.address')}</TableHeaderCell>
              <TableHeaderCell>{t('customers.profile.email')}</TableHeaderCell>
              <TableHeaderCell>{t('customers.profile.status')}</TableHeaderCell>
              <TableHeaderCell>{t('common.action')}</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Show when={currentData.length} fallback={<Empty inTable className="h-50" />}>
              {currentData?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>#{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <DynamicTrans prefix="common.">{item.sex}</DynamicTrans>
                  </TableCell>
                  <TableCell className="min-w-28">
                    <MemberTag tag={item.memberType} text={<DynamicTrans prefix="customers.tags.">{item.memberType}</DynamicTrans>} />
                  </TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell className="min-w-20">
                    <Tag size="sm" pill bordered colors={getStatusColors(item.status)}>
                      <DynamicTrans prefix="customers.status.">{item.status}</DynamicTrans>
                    </Tag>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="after:bg-line relative inline-flex items-center after:mx-2 after:block after:h-4 after:w-px">
                      <EditDialog
                        data={item}
                        title={t('actions.edit')}
                        trigger={
                          <Button size="sm" variant="light" className="gap-1">
                            <IconPencil size={18} />
                            {t('actions.edit')}
                          </Button>
                        }
                      />
                      <CustomerDrawer
                        trigger={
                          <Button size="sm" variant="light" className="gap-1">
                            <IconFileText size={18} />
                            {t('actions.view')}
                          </Button>
                        }
                        customer={item}
                      />
                    </div>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <Button size="sm" colors="neutral" asIcon variant="light">
                          <IconDots size={16} />
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content align="end" className="dropdown-menu--content">
                          <DropdownMenu.Item className="dropdown-menu--item">{t('actions.sendEmail')}</DropdownMenu.Item>
                          <DropdownMenu.Separator className="bg-line my-1 h-px" />
                          <DropdownMenu.Item className="dropdown-menu--item" disabled={['active', 'reviewing'].includes(item.status)}>
                            {t('actions.activate')}
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="dropdown-menu--item" disabled={item.status === 'forbidden'}>
                            {t('actions.disable')}
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="dropdown-menu--item" disabled={item.status !== 'reviewing'}>
                            {t('actions.approved')}
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="dropdown-menu--item" disabled={item.status !== 'reviewing'}>
                            {t('actions.rejected')}
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator className="bg-line my-1 h-px" />
                          <DropdownMenu.Item className="dropdown-menu--item text-danger hover:bg-danger transition-colors hover:text-white" onSelect={() => handleDeleteCustomer(item)}>
                            {t('actions.delete')}
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </TableCell>
                </TableRow>
              ))}
            </Show>
          </TableBody>
        </Table>
        <Pagination className="mt-4" total={filteredTotal} pageSize={10} onChange={setCurrentPage} />
      </div>
      <DeleteAlert open={showDeleteAlert} onOpenChange={setShowDeleteAlert} text={selectedCustomer?.name} />
    </div>
  );
}
