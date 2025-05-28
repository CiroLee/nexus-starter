import { cn } from '@/lib/utils';
import { DiscreteLegend, DiscreteLegendEntry } from 'reaviz';

interface DiscreteLegendsProps {
  className?: string;
  legends: LegendItem[];
  orientation?: 'horizontal' | 'vertical';
}

interface LegendItem {
  label: string;
  color: string;
}
export function DiscreteLegends({ className, orientation = 'horizontal', legends }: DiscreteLegendsProps) {
  return (
    <div className={cn('relative', className)}>
      <DiscreteLegend
        orientation={orientation}
        entries={legends.map((item, i) => (
          <DiscreteLegendEntry key={i} label={item.label} color={item.color} />
        ))}
      />
    </div>
  );
}
