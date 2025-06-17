import { IconSettings } from '@tabler/icons-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Card, CardBody, CardFooter } from '@ui/Card';
import SvgIcon from '@ui/SvgIcon';
import Button from '@ui/Button';
import { cn } from '@/lib/utils';
import DynamicTrans from '@/components/business/DynamicTrans';

const statusDot = cva('block size-2 rounded-full', {
  variants: {
    status: {
      active: 'bg-green-500',
      inactive: 'bg-gray-500',
      disabled: 'bg-gray-500',
      error: 'bg-red-500',
      licensed: 'bg-blue-500',
      unlicensed: 'bg-yellow-500'
    }
  }
});
type StatusVariant = VariantProps<typeof statusDot>;
interface AppCardProps {
  id: string;
  name: string;
  icon: string;
  description?: string;
  status?: StatusVariant['status'][];
  className?: string;
  style?: React.CSSProperties;
}

export default function AppCard({ id, name, icon, description, status, className, ...props }: AppCardProps) {
  const handleSettingOnClick = () => {
    console.log('appId:', id);
  };
  return (
    <Card className={cn('bg-background relative h-40', className)} {...props}>
      <CardBody className="p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SvgIcon size={28} name={icon} />
            <p className="font-semibold">{name}</p>
          </div>
          <Button asIcon size="sm" colors="neutral" variant="light" onClick={handleSettingOnClick}>
            <IconSettings size={20} />
          </Button>
        </div>
        <p className="text-description line-clamp-2 text-sm">{description}</p>
      </CardBody>
      <CardFooter className="absolute bottom-0 left-0 flex w-full items-center gap-2 px-3 pb-3">
        {status?.map((item, index) => (
          <div key={index} className="flex items-center gap-1 text-xs">
            <span className={statusDot({ status: item })}></span>
            <DynamicTrans prefix="common.">{item || ''}</DynamicTrans>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
