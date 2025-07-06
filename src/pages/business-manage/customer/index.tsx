import { useEffect, useMemo, useState } from 'react';
import { DropdownMenu } from 'radix-ui';
import { IconUsers, IconMoodSpark, IconRefreshDot, IconCreditCardRefund, IconDots } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useMockStore } from '@/store/mock';
import { Card } from '@ui/Card';
import Heading from '@ui/Heading';
import Show from '@ui/Show';
import Button from '@ui/Button';
import { Table, TableHeader, TableHeaderCell, TableBody, TableCell, TableRow } from '@ui/Table';
import Pagination from '@/components/business/Pagination';
import Empty from '@/components/business/Empty';
import DynamicTrans from '@/components/business/DynamicTrans';
import RealTimeMetric from './components/RealTimeMetric';
import MemberTag from './components/MemberTag';
import { formatNumber, formatPercent } from '@/utils/number';
import { getCustomerMetrics, getCustomerList } from '@/_mock/customer';
import Tag from '@/components/ui/Tag';
import { CustomerInfo } from '@/types/user';

export default function CustomerManagementPage() {
  const { t } = useTranslation();
  const { setCustomerList } = useMockStore();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: customerMetrics } = useQuery({ queryKey: ['customerMetrics'], queryFn: getCustomerMetrics });
  const { data: customerList, isPending: customerIsPending } = useQuery({ queryKey: ['customerList'], queryFn: getCustomerList });

  console.log('customerList', customerList);

  const getStatusColors = (status: CustomerInfo['status']) => {
    switch (status) {
      case 'active':
        return 'secondary';
      case 'forbidden':
        return 'neutral';
      case 'reviewing':
        return 'primary';
      case 'churned':
        return 'danger';
    }
  };

  const handleEdit = (item: CustomerInfo) => {
    console.log('edit', item);
  };

  const handleView = (item: CustomerInfo) => {
    console.log('view', item);
  };

  // mock paginating staff data
  const currentData = useMemo(() => {
    return customerList?.data.slice((currentPage - 1) * 10, 10 * currentPage);
  }, [currentPage, customerList?.data]);

  // stash customer data for mocking edit customer
  useEffect(() => {
    setCustomerList(customerList?.data || []);
  }, [customerList?.data, setCustomerList]);

  return (
    <div>
      <Heading as="h3" className="mb-3">
        {t('menus.businessManagement.customer')}
      </Heading>
      <Card className="bg-background grid grid-cols-4 p-2">
        <RealTimeMetric
          icon={<IconUsers size={18} />}
          title={t('customers.totalCustomers')}
          trend="up"
          value={formatNumber(customerMetrics?.data.total.total || 0)}
          briefData={customerMetrics?.data?.total.list || []}
        />
        <RealTimeMetric
          icon={<IconMoodSpark size={18} />}
          title={t('customers.newCustomers')}
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
      <div className="panel mt-4">
        <Show when={!customerIsPending} fallback={<Empty className="h-60" />}>
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
              {currentData?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>#{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <DynamicTrans prefix="common.">{item.sex || ''}</DynamicTrans>
                  </TableCell>
                  <TableCell className="min-w-28">
                    <Show when={item.memberType} fallback="--">
                      <MemberTag tag={item.memberType!} text={<DynamicTrans prefix="customers.tags.">{item.memberType || ''}</DynamicTrans>} />
                    </Show>
                  </TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell className="min-w-20">
                    <Tag size="sm" pill bordered colors={getStatusColors(item.status)}>
                      <DynamicTrans prefix="customers.status.">{item.status || ''}</DynamicTrans>
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
                          <DropdownMenu.Item asChild className="dropdown-menu--item w-full" onSelect={() => handleEdit(item)}>
                            <button disabled={!item.email} className="disabled:cursor-not-allowed disabled:opacity-80">
                              {t('actions.sendEmail')}
                            </button>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="dropdown-menu--item" onSelect={() => handleView(item)}>
                            {t('actions.view')}
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="dropdown-menu--item" onSelect={() => handleEdit(item)}>
                            {t('actions.edit')}
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination className="mt-4" total={customerList?.data.length} pageSize={10} onChange={setCurrentPage} />
        </Show>
      </div>
    </div>
  );
}
