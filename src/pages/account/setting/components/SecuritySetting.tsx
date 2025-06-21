import DynamicTrans from '@/components/business/DynamicTrans';
import { cn } from '@/lib/utils';
import Button from '@ui/Button';
import Show from '@ui/Show';
import { useTranslation } from 'react-i18next';

export default function SecuritySetting() {
  const { t } = useTranslation();
  return (
    <div>
      <SecurityItem label="Account Password" content={t('longText.security.accountPsdText')} />
      <SecurityItem label="Secure Phone" content={t('longText.security.securePhoneText')} />
      <SecurityItem label="Secure Email" placeholder={t('longText.security.secureEmailText')} editText="config" />
    </div>
  );
}

interface SecurityItemProps {
  label: string;
  content?: React.ReactNode;
  placeholder?: string;
  className?: string;
  onClick?: () => void;
  editText?: string;
}
function SecurityItem({ label, content, placeholder, editText = 'edit', className }: SecurityItemProps) {
  return (
    <div className={cn('border-line grid grid-rows-[1fr_auto] gap-x-4 text-sm md:grid-cols-[140px_auto]', className)}>
      <div className="flex items-center font-semibold">{label}</div>
      <div className="grid h-20 grid-cols-[1fr_auto] items-center gap-4">
        <div className={cn({ 'line-clamp-2 text-neutral-500': placeholder })}>
          <Show when={content} fallback={<>{placeholder}</>}>
            <>{content}</>
          </Show>
        </div>
        <Button size="sm" variant="light">
          <DynamicTrans>{`common.${editText}`}</DynamicTrans>
        </Button>
      </div>
    </div>
  );
}
