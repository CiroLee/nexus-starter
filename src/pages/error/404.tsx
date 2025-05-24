import NotFound from '@/components/error/NotFound';
import { useTranslation } from 'react-i18next';
export default function Page() {
  const { t } = useTranslation();
  return <NotFound description={t('common.notFound')} />;
}
