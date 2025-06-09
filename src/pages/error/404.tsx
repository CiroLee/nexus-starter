import NotFound from '@/components/error/NotFound';
import { useTranslation } from 'react-i18next';
export default function Page() {
  const { t } = useTranslation();
  return <NotFound className="absolute top-1/2 left-1/2 -translate-1/2" description={t('error.notFound')} />;
}
