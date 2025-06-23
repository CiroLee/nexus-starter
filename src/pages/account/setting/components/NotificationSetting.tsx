import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import Switch from '@ui/Switch';

export default function NotificationSetting() {
  const { t } = useTranslation();
  return (
    <div>
      <NotificationItem title={t('account.notification.appNoticeTitle')} content={t('longText.notice.app')} isOn={true} />
      <NotificationItem title={t('account.notification.emailNoticeTitle')} content={t('longText.notice.email')} isOn={true} />
      <NotificationItem title={t('account.notification.updateNoticeTitle')} content={t('longText.notice.update')} isOn={false} />
    </div>
  );
}

interface NotificationItemProps {
  title: string;
  content: string;
  isOn?: boolean;
  className?: string;
}
function NotificationItem({ className, title, content, isOn }: NotificationItemProps) {
  return (
    <div className={cn('flex h-20 items-center text-sm', className)}>
      <div className="flex-1 overflow-hidden">
        <p className="mb-2 font-semibold">{title}</p>
        <div className="line-clamp-2 text-neutral-600">{content}</div>
      </div>
      <Switch size="sm" defaultChecked={isOn} />
    </div>
  );
}
