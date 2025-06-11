import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Heading from '@ui/Heading';
import Button from '@ui/Button';
import SvgIcon from '@ui/SvgIcon';
import DynamicTrans from '@business/DynamicTrans';
import { cn } from '@/lib/utils';
import { SkeletonBlock } from '@ui/Skeleton';
import Show from '@/components/ui/Show';

interface AccessItem {
  id: string;
  url: string;
  label?: string;
  icon?: string;
}

interface QuickAccessProps {
  className?: string;
  list: AccessItem[];
}
export default function QuickAccess({ className, list }: QuickAccessProps) {
  const { t } = useTranslation();
  return (
    <div className={cn('panel h-fit', className)}>
      <div className="mb-4 flex items-center justify-between">
        <Heading as="h5">{t('common.quickAccess')}</Heading>
        <Link to="#" className="text-primary text-sm hover:opacity-80">
          {t('common.viewMore')}
        </Link>
      </div>
      <div className="grid grid-cols-3 justify-items-center gap-4">
        <Show
          when={list.length}
          fallback={Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-16 w-full" />
          ))}>
          {list.map((item) => (
            <Link to={item.url} key={item.id} className="flex flex-col items-center gap-1">
              <Button size="md" colors="neutral" asIcon>
                <SvgIcon size={22} name={item.icon || ''} />
              </Button>
              <span className="text-description text-xs">
                <DynamicTrans prefix="common.">{item.label || ''}</DynamicTrans>
              </span>
            </Link>
          ))}
        </Show>
      </div>
    </div>
  );
}
