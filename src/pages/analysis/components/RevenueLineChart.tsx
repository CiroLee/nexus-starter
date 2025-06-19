import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Line, LineChart, LineSeries } from 'reaviz';
import { Card, CardHeader, CardTitle, CardBody } from '@ui/Card';
import { getRevenueContrast } from '@/_mock/goods';
import { DiscreteLegends } from '@/components/business/ChartLegend';
import { cn } from '@/lib/utils';
export default function RevenueLineChart({ className }: { className?: string }) {
  const { data: response } = useQuery({ queryKey: ['revenues'], queryFn: getRevenueContrast });
  const { t } = useTranslation();

  return (
    <Card className={cn('bg-background', className)}>
      <CardHeader>
        <CardTitle>{t('common.revenue')}</CardTitle>
      </CardHeader>
      <CardBody>
        <DiscreteLegends
          className="mb-3"
          legends={[
            { label: 'last month', color: '#FFD440' },
            { label: 'this month', color: '#F8A340' }
          ]}
        />
        <LineChart height={260} data={response?.data} series={<LineSeries type="grouped" line={<Line strokeWidth={2} />} colorScheme="unifyvizwarm" />} />
      </CardBody>
    </Card>
  );
}
