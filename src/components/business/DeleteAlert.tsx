import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogCancel } from '@/components/ui/AlertDialog';
import Button from '@/components/ui/Button';
import { IconAlertSquareRoundedFilled } from '@tabler/icons-react';

interface DeleteAlertProps extends Omit<React.ComponentPropsWithoutRef<typeof AlertDialog>, 'title'> {
  text?: React.ReactNode;
  onConfirm?: () => void;
}
export default function DeleteAlert({ text, onConfirm, ...props }: DeleteAlertProps) {
  const { t } = useTranslation();
  const handleOnConfirm = () => {
    toast.success(t('toast.actionSucceed'), { position: 'top-right' });
    onConfirm?.();
  };
  return (
    <AlertDialog
      {...props}
      title={
        <div className="flex items-center gap-1">
          <IconAlertSquareRoundedFilled className="text-danger mt-0.5" size={28} />
          {t('status.warning')}
        </div>
      }
      description={
        <div>
          {t('longText.notice.deleteWarning')} <strong>{text}</strong>?<p>{t('longText.notice.unDoneWaring')}</p>
        </div>
      }
      footer={
        <div className="flex items-center justify-end gap-2 px-3.5">
          <AlertDialogCancel>
            <Button colors="neutral">{t('actions.cancel')}</Button>
          </AlertDialogCancel>
          <AlertDialogCancel>
            <Button colors="danger" onClick={handleOnConfirm}>
              {t('actions.delete')}
            </Button>
          </AlertDialogCancel>
        </div>
      }
    />
  );
}
