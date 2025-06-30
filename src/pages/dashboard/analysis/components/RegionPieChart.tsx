import { PieArcSeries, PieChart } from 'reaviz';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Card, CardBody, CardHeader, CardTitle } from '@ui/Card';
import { getCustomerRegions } from '@/_mock/member';

interface RegionPieChartProps {
  className?: string;
}
export default function RegionPieChart({ className }: RegionPieChartProps) {
  const { t } = useTranslation();
  const { data: response } = useQuery({ queryKey: ['customer-region'], queryFn: getCustomerRegions });
  return (
    <Card className={cn('bg-background', className)}>
      <CardHeader>
        <CardTitle>{t('dashboard.analysis.customerRegion')}</CardTitle>
      </CardHeader>
      <CardBody className="flex">
        <PieChart height={300} center data={response?.data || []} series={<PieArcSeries colorScheme="cybertron" />} />
      </CardBody>
    </Card>
  );
}
