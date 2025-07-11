import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import SvgIcon from '../ui/SvgIcon';
// import noDataSvg from '@/assets/images/no-data.svg';
interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  indicator?: React.ReactNode;
  description?: React.ReactNode;
}

export default function Empty({ className, indicator, description, ...props }: EmptyProps) {
  const { t } = useTranslation();
  return (
    <tr className={cn('relative flex flex-col items-center justify-center gap-2', className)} {...props}>
      {indicator ? (
        indicator
      ) : (
        <td>
          <SvgIcon name="no-data" size={84} />
        </td>
      )}
      {description ? <>{description}</> : <td className="text-description text-sm">{t('common.noData')}</td>}
    </tr>
  );
}
