import Badge from '@ui/Badge';
import { cn } from '@/lib/utils';

interface OnlineStatusProps {
  className?: string;
  isOnline?: boolean;
  children?: React.ReactNode;
}
export default function OnlineStatus({ className, isOnline, ...props }: OnlineStatusProps) {
  return <Badge className={cn('size-3', isOnline ? 'bg-green-500' : 'bg-neutral-300 dark:bg-neutral-500', className)} placement="bottom-right" asDot {...props} />;
}
