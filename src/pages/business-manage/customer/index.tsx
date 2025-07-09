import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { DropdownMenu } from 'radix-ui';
import { IconUsers, IconMoodSpark, IconRefreshDot, IconCreditCardRefund, IconDots, IconMessageCircle, IconFileText } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useMockStore } from '@/store/mock';
import { Card } from '@ui/Card';
import Heading from '@ui/Heading';
import Show from '@ui/Show';
import Tag from '@ui/Tag';
import Button from '@ui/Button';
import { AlertDialog, AlertDialogCancel } from '@/components/ui/AlertDialog';
import { Table, TableHeader, TableHeaderCell, TableBody, TableCell, TableRow } from '@ui/Table';
import Pagination from '@/components/business/Pagination';
import Empty from '@/components/business/Empty';
import DynamicTrans from '@/components/business/DynamicTrans';
import RealTimeMetric from './components/RealTimeMetric';
import MemberTag from './components/MemberTag';
import CustomerDrawer from './components/CustomerDrawer';
import { formatNumber, formatPercent } from '@/utils/number';
import { getCustomerMetrics, getCustomerList } from '@/_mock/customer';
import { getStatusColors } from './utils';
import { CustomerInfo } from '@/types/user';

export default function CustomerManagementPage() {
  const { t } = useTranslation();
  const { setCustomerList } = useMockStore();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showPreviewEditDrawer, setShowPreviewEditDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerInfo>();

  const { data: customerMetrics } = useQuery({ queryKey: ['customerMetrics'], queryFn: getCustomerMetrics });
  const { data: customerList, isPending: customerIsPending } = useQuery({ queryKey: ['customerList'], queryFn: getCustomerList });

  const handleDeleteCustomer = (customer: CustomerInfo) => {
    setSelectedCustomer(customer);
    setShowAlertDialog(true);
  };

  const openCustomerDrawer = (customer: CustomerInfo) => {
    setSelectedCustomer(customer);
    setShowPreviewEditDrawer(true);
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
      <Card className="bg-background grid grid-cols-2 grid-rows-2 gap-3 p-2 lg:grid-cols-3 xl:grid-cols-4 xl:grid-rows-subgrid">
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
                      <Button size="sm" variant="light" className="gap-1">
                        <IconMessageCircle size={18} />
                        {t('actions.chat')}
                      </Button>
                      <Button size="sm" variant="light" className="gap-1" onClick={() => openCustomerDrawer(item)}>
                        <IconFileText size={18} />
                        {t('actions.view')}
                      </Button>
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
                          <DropdownMenu.Item className="dropdown-menu--item hover:bg-danger transition-colors hover:text-white" onSelect={() => handleDeleteCustomer(item)}>
                            {t('actions.delete')}
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
      <AlertDialog
        open={showAlertDialog}
        onOpenChange={setShowAlertDialog}
        title="Warning"
        description={
          <div>
            {t('longText.notice.deleteWarning')} <strong>{selectedCustomer?.name}</strong>?<p>{t('longText.notice.unDoneWaring')}</p>
          </div>
        }
        footer={
          <div className="flex items-center justify-end gap-2 px-3.5">
            <AlertDialogCancel>
              <Button colors="neutral">{t('actions.cancel')}</Button>
            </AlertDialogCancel>
            <AlertDialogCancel>
              <Button colors="danger" onClick={() => toast.success(t('toast.actionSucceed'), { position: 'top-center' })}>
                {t('actions.delete')}
              </Button>
            </AlertDialogCancel>
          </div>
        }
      />
      <CustomerDrawer customer={selectedCustomer} open={showPreviewEditDrawer} onClose={() => setShowPreviewEditDrawer(false)} />
    </div>
  );
}
