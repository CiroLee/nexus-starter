import Forbidden from '@/components/error/Forbidden';
import { useTranslation } from 'react-i18next';
export default function Page() {
  const { t } = useTranslation();
  return <Forbidden description={t('error.forbidden')} />;
}
