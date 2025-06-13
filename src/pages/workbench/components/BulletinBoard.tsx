import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Heading from '@ui/Heading';
import Tag from '@ui/Tag';
import Show from '@/components/ui/Show';
import { SkeletonText } from '@ui/Skeleton';
import DynamicTrans from '@/components/business/DynamicTrans';

interface BulletinItem {
  id: string;
  type?: 'info' | 'notice' | 'event';
  content?: string;
}
interface BulletinBoardProps {
  list: BulletinItem[];
  className?: string;
}

const typeMap = {
  info: {
    label: 'info',
    color: 'neutral'
  },
  notice: {
    label: 'notice',
    color: 'primary'
  },
  event: {
    label: 'event',
    color: 'secondary'
  }
} as const;
export default function BulletinBoard({ className, list }: BulletinBoardProps) {
  const { t } = useTranslation();
  return (
    <div className={cn('panel', className)}>
      <div className="mb-4 flex items-center justify-between">
        <Heading as="h5">{t('common.bulletin')}</Heading>
        <Link to="#" className="text-primary text-sm hover:opacity-80">
          {t('common.viewMore')}
        </Link>
      </div>
      <ul className="space-y-2">
        <Show
          when={list.length}
          fallback={Array.from({ length: 6 }).map((_, i) => (
            <SkeletonText key={i} className="h-4 w-full" />
          ))}>
          {list.map((item) => (
            <li key={item.id} className="flex items-center gap-2">
              <Show when={item.type}>
                <Tag className="w-16 justify-center" colors={typeMap[item.type!].color}>
                  <DynamicTrans prefix="tags.">{typeMap[item.type!].label}</DynamicTrans>
                </Tag>
              </Show>
              <p className="flex-1 truncate text-xs">{item.content}</p>
            </li>
          ))}
        </Show>
      </ul>
    </div>
  );
}
