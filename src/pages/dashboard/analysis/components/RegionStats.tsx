import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardBody } from '@ui/Card';
import Progress from '@ui/Progress';
import { cn } from '@/lib/utils';

interface RegionStatsProps {
  className?: string;
  total: number;
  data: RegionData[];
}

interface RegionData {
  region: string;
  amount: number;
}
export default function RegionStats({ className, total, data }: RegionStatsProps) {
  const { t } = useTranslation();
  return (
    <Card className={cn('bg-background', className)}>
      <CardHeader>
        <CardTitle>{t('dashboard.analysis.customerRegion')}</CardTitle>
      </CardHeader>
      <CardBody>
        {data.map((item) => (
          <RegionItem key={item.region} {...item} total={total} />
        ))}
      </CardBody>
    </Card>
  );
}

interface RegionItemProps extends RegionData {
  total: number;
}
function RegionItem({ region, amount, total }: RegionItemProps) {
  const formatPercent = (amount: number, total: number) => {
    const percent = (amount / total) * 100;
    // if the last is zero,then remove it
    return percent.toFixed(2).replace(/\.?0+$/, '');
  };
  return (
    <div className="grid grid-rows-2 gap-1">
      <div className="text-description flex justify-between text-sm">
        <span>{region}</span>
        <span>{formatPercent(amount, total)}%</span>
      </div>
      <Progress striped value={(amount / total) * 100} max={total} />
    </div>
  );
}
