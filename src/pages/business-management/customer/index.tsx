import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { IconUsers, IconMoodSpark, IconRefreshDot, IconCreditCardRefund } from '@tabler/icons-react';
import RealTimeMetric from './components/RealTimeMetric';
import { formatNumber, formatPercent } from '@/utils/number';
import { getCustomerMetrics } from '@/_mock/customer';
import Heading from '@ui/Heading';

export default function CustomerManagementPage() {
  const { t } = useTranslation();
  const { data: customerMetrics } = useQuery({ queryKey: ['customerMetrics'], queryFn: getCustomerMetrics });
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
    </div>
  );
}
