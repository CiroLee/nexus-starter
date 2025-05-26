import ServerError from '@/components/error/ServerError';
import { useTranslation } from 'react-i18next';
export default function Page() {
  const { t } = useTranslation();
  return <ServerError description={t('error.serverError')} />;
}
