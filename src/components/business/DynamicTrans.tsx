import { Trans, useTranslation } from 'react-i18next';

export default function DynamicTrans({ children, prefix, suffix }: { prefix?: string; suffix?: string; children: string }) {
  const { t } = useTranslation();

  return (
    <Trans t={t}>
      {prefix}
      {children}
      {suffix}
    </Trans>
  );
}
