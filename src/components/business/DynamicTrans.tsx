import { Trans, useTranslation } from 'react-i18next';

export default function Translation({ children }: { children: string }) {
  const { t } = useTranslation();

  return <Trans t={t}>{children}</Trans>;
}
