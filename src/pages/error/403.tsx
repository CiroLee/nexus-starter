import Forbidden from '@/components/error/Forbidden';
import { useTranslation } from 'react-i18next';
export default function Page() {
  const { t } = useTranslation();
  return <Forbidden className="absolute top-1/2 left-1/2 -translate-1/2" description={t('error.forbidden')} />;
}
