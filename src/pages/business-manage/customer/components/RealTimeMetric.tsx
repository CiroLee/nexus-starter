import { AreaSparklineChart, type ChartDataTypes } from 'reaviz';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';
import { SkeletonText } from '@/components/ui/Skeleton';
import Show from '@ui/Show';
import { cn } from '@/lib/utils';
interface RealTimeMetricProps {
  className?: string;
  trend?: 'up' | 'down';
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  briefData?: { key: ChartDataTypes; data: ChartDataTypes }[];
}
export default function RealTimeMetric({ className, value, trend, title, icon, briefData }: RealTimeMetricProps) {
  return (
    <div className={cn('after:w-line after:bg-line relative', className)}>
      <div className="text-description mb-5 flex items-center gap-1.5 text-sm">
        {icon}
        <span>{title}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-lg font-semibold">{value}</span>
        <Show when={trend}>{trend === 'up' ? <IconArrowUp size="1.1em" className="text-green-600" /> : <IconArrowDown className="text-red-500" size="1.1em" />}</Show>
        {briefData?.length ? <AreaSparklineChart height={32} width={100} data={briefData} className="ml-4" /> : <SkeletonText className="w-25" />}
      </div>
    </div>
  );
}
