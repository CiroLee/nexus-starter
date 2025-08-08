import { IconExclamationCircleFilled } from '@tabler/icons-react';
import Heading from '@ui/Heading';
import { Button } from '@ui/Button';
import { useTranslation } from 'react-i18next';
export default function SuccessPage() {
  const { t } = useTranslation();
  return (
    <div className="absolute top-1/2 left-1/2 flex h-full -translate-1/2 flex-col items-center justify-center">
      <IconExclamationCircleFilled size={92} className="text-rose-500" />
      <Heading as="h5" className="mt-4">
        {t('result.submitFail')}!
      </Heading>
      <div className="mt-10 flex gap-4">
        <Button>{t('result.toModify')}</Button>
      </div>
    </div>
  );
}
