import { BarChart, BarSeries, Gradient, Bar, RangeLines, GuideBar } from 'reaviz';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { getSalesMonthly, type SalesRes } from '@/mock/goods';
import { useEffect, useState } from 'react';
import { statusCode } from '@/utils/constants';

export default function SaleBartChart({ className }: { className?: string }) {
  const [sales, setSales] = useState<SalesRes[]>([]);

  const fetchSales = async () => {
    try {
      const res = await getSalesMonthly();
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
        <CardTitle>Sales</CardTitle>
      </CardHeader>
      <CardBody className="h-50">
        <BarChart
          data={sales}
          series={<BarSeries type="grouped" bar={<Bar gradient={<Gradient />} rangeLines={<RangeLines position="top" />} guide={<GuideBar />} />} colorScheme="unifyviz" padding={0.8} />}
        />
      </CardBody>
    </Card>
  );
}
