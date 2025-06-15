import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { BarChart, BarSeries, Gradient, Bar, RangeLines, GuideBar } from 'reaviz';
import { Card, CardBody, CardHeader, CardTitle } from '@ui/Card';
import { DiscreteLegends } from '@/components/business/ChartLegend';
import { getSalesSummary } from '@/_mock/goods';

export default function SaleBartChart({ className }: { className?: string }) {
  const { data: response } = useQuery({ queryKey: ['sales'], queryFn: getSalesSummary });
  const { t } = useTranslation();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t('dashboard.analysis.sales')}</CardTitle>
      </CardHeader>
      <CardBody>
        <DiscreteLegends
          className="mb-3"
          legends={[
            { label: 'expense', color: '#4C86FF' },
            { label: 'revenue', color: '#40D3F4' }
          ]}
        />
        <BarChart
          height={260}
          data={response?.data}
          series={<BarSeries type="grouped" bar={<Bar gradient={<Gradient />} rangeLines={<RangeLines position="top" />} guide={<GuideBar />} />} colorScheme="unifyviz" padding={0.8} />}
        />
      </CardBody>
    </Card>
  );
}
