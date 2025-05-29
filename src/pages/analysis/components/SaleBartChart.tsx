import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, BarSeries, Gradient, Bar, RangeLines, GuideBar } from 'reaviz';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { DiscreteLegends } from '@/components/business/ChartLegend';
import { getSalesSummary, type GoodsRes } from '@/_mock/goods';
import { statusCode } from '@/utils/constants';

export default function SaleBartChart({ className }: { className?: string }) {
  const [sales, setSales] = useState<GoodsRes[]>([]);
  const { t } = useTranslation();

  const fetchSales = async () => {
    try {
      const res = await getSalesSummary();
      if (res.code === statusCode.success) {
        setSales(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

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
          data={sales}
          series={<BarSeries type="grouped" bar={<Bar gradient={<Gradient />} rangeLines={<RangeLines position="top" />} guide={<GuideBar />} />} colorScheme="unifyviz" padding={0.8} />}
        />
      </CardBody>
    </Card>
  );
}
