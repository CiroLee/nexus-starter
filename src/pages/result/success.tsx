import { IconCircleCheckFilled } from '@tabler/icons-react';
import Heading from '@ui/Heading';
import Button from '@ui/Button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
export default function SuccessPage() {
  const { t } = useTranslation();
  return (
    <div className="absolute top-1/2 left-1/2 flex h-full -translate-1/2 flex-col items-center justify-center">
      <IconCircleCheckFilled size={92} className="text-green-600" />
      <Heading as="h5" className="mt-4">
        {t('result.submitSuccess')}!
      </Heading>
      <div className="mt-10 flex gap-4">
        <Button asChild>
          <Link to="/">{t('common.backHome')}</Link>
        </Button>
        <Button colors="neutral">{t('common.print')}</Button>
      </div>
    </div>
  );
}
