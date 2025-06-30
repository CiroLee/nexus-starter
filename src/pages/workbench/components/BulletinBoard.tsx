import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Heading from '@ui/Heading';
import Tag from '@ui/Tag';
import Show from '@ui/Show';
import { SkeletonText } from '@ui/Skeleton';
import DynamicTrans from '@/components/business/DynamicTrans';

import { getBulletins } from '@/_mock/system';

interface BulletinBoardProps {
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
export default function BulletinBoard({ className }: BulletinBoardProps) {
  const { t } = useTranslation();
  const { data: response } = useQuery({ queryKey: ['bulletins'], queryFn: getBulletins });
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
          when={response?.data.length}
          fallback={Array.from({ length: 6 }).map((_, i) => (
            <SkeletonText key={i} className="h-4 w-full" />
          ))}>
          {response?.data.map((item) => (
            <li key={item.id} className="flex items-center gap-2">
              <Show when={item.type}>
                <Tag className="w-16 justify-center" size="sm" colors={typeMap[item.type!].color}>
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
