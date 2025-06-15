import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import noDataSvg from '@/assets/images/no-data.svg';
interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  indicator?: React.ReactNode;
  description?: React.ReactNode;
}

export default function Empty({ className, indicator, description, ...props }: EmptyProps) {
  const { t } = useTranslation();
  return (
    <div className={cn('relative flex flex-col items-center justify-center gap-2', className)} {...props}>
      {indicator ? indicator : <img className="mx-auto block size-22" src={noDataSvg} alt="no data" />}
      {description ? <>{description}</> : <p className="text-description text-sm">{t('common.noData')}</p>}
    </div>
  );
}
