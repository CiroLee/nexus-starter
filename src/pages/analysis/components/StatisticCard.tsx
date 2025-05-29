'use client';
import { useValue } from '@cirolee/tiny-motion';
import { Card, CardBody } from '@ui/Card';
import Statistic from '@ui/Statistic';
import { cn } from '@/lib/utils';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';

interface StatisticCardProps extends React.ComponentProps<typeof Statistic> {
  className?: string;
  title?: React.ReactNode;
  value: number;
  precision?: number;
  radio?: number | string;
}
export default function StatisticCard({ className, title, value, precision = 0, radio, trend, ...props }: StatisticCardProps) {
  const [val] = useValue(0, value, {
    duration: 3000,
    precision,
    easing: 'easeOutCubic'
  });
  return (
    <Card className={className}>
      <CardBody>
        <Statistic title={title} value={Intl.NumberFormat().format(val)} {...props} suffix={trend ? <StatisticSuffix value={radio} trend={trend} /> : null} />
      </CardBody>
    </Card>
  );
}

interface StatisticSuffixProps {
  trend: React.ComponentProps<typeof Statistic>['trend'];
  value?: number | string;
}
function StatisticSuffix({ trend, value }: StatisticSuffixProps) {
  return (
    <div className={cn('inline-flex items-center gap-1 self-end text-sm leading-[1em] text-red-400', { 'text-green-400': trend === 'increase' })}>
      {trend === 'increase' ? <IconTrendingUp size={18} /> : <IconTrendingDown size={18} />}
      <span>{value}</span>
    </div>
  );
}
