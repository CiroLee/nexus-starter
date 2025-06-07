import { Trans, useTranslation } from 'react-i18next';

export default function DynamicTrans({ children }: { children: string }) {
  const { t } = useTranslation();

  return <Trans t={t}>{children}</Trans>;
}
