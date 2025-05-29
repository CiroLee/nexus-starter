import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Line, LineChart, LineSeries } from 'reaviz';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import { getRevenueContrast, GoodsRes } from '@/_mock/goods';

import { statusCode } from '@/utils/constants';
import { DiscreteLegends } from '@/components/business/ChartLegend';
export default function RevenueLineChart({ className }: { className?: string }) {
  const [revenues, setRevenues] = useState<GoodsRes[]>([]);
  const { t } = useTranslation();
  const fetchData = async () => {
    try {
      const res = await getRevenueContrast();
      if (res.code === statusCode.success) {
        setRevenues(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Card className={className}>
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
        <LineChart height={260} data={revenues} series={<LineSeries type="grouped" line={<Line strokeWidth={2} />} colorScheme="unifyvizwarm" />} />
      </CardBody>
    </Card>
  );
}
