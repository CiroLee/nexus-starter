import { IconDots } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { DropdownMenu } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { Card, CardBody, CardFooter } from '@ui/Card';
import SvgIcon from '@ui/SvgIcon';
import Button from '@ui/Button';
import { cn } from '@/lib/utils';
import DynamicTrans from '@/components/business/DynamicTrans';

const dropdownItem = cva('flex items-center outline-none gap-1 text-sm rounded p-1.5 cursor-default transition-colors focus:bg-neutral-200/60 dark:focus:bg-neutral-700/60');

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
  const { t } = useTranslation();

  const handleMenuSelect = (id: string, action: string) => {
    console.log('appId:', id, 'action:', action);
  };
  return (
    <Card className={cn('relative h-40', className)} {...props}>
      <CardBody className="p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SvgIcon className="text-[28px]" name={icon} />
            <p className="font-semibold">{name}</p>
          </div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button asIcon size="sm" colors="neutral" variant="light">
                <IconDots size={20} />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                loop
                align="end"
                className="border-line bg-background data-[state=open]:animate-zoom-fade-in data-[state=closed]:animate-zoom-fade-out z-(--popup) min-w-25 origin-(--radix-dropdown-menu-content-transform-origin) rounded-md border p-1 outline-none">
                <DropdownMenu.Item className={dropdownItem()} onClick={() => handleMenuSelect(id, 'detail')}>
                  {t('common.view')}
                </DropdownMenu.Item>
                <DropdownMenu.Item className={dropdownItem()} onSelect={() => handleMenuSelect(id, 'edit')}>
                  {t('common.config')}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
        <p className="text-description line-clamp-2 text-sm">{description}</p>
      </CardBody>
      <CardFooter className="absolute bottom-0 left-0 flex w-full items-center gap-2 px-3 pb-3">
        {status?.map((item, index) => (
          <div key={index} className="flex items-center gap-1 text-xs">
            <span className={statusDot({ status: item })}></span>
            <DynamicTrans>{`common.${item}`}</DynamicTrans>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
