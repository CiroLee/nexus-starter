import { IconUserFilled, IconCoinFilled, IconClipboardFilled, IconGiftFilled } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import StatisticCard from './components/StatisticCard';
import Heading from '@ui/Heading';
import SaleBartChart from './components/SaleBartChart';
export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <div>
      <Heading as="h3" className="mb-3">
        {t('dashboard.title')}
      </Heading>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatisticCard
          title={
            <div className="flex items-center gap-1">
              <IconUserFilled size="1.2em" />
              {t('dashboard.totalConsumers')}
            </div>
          }
          value={236732}
          trend="increase"
          radio="2.4%"
        />
        <StatisticCard
          title={
            <div className="flex items-center gap-1">
              <IconCoinFilled size="1.2em" />
              {t('dashboard.totalSales')}
            </div>
          }
          value={184553}
          trend="increase"
          radio="0.45%"
          prefix={<span className="text-xl leading-[1em]">$</span>}
        />
        <StatisticCard
          title={
            <div className="flex items-center gap-1">
              <IconClipboardFilled size="1.2em" />
              {t('dashboard.orderPerDay')}
            </div>
          }
          value={794}
          trend="decrease"
          radio="0.02%"
        />
        <StatisticCard
          title={
            <div className="flex items-center gap-1">
              <IconGiftFilled size="1.2em" />
              {t('dashboard.transactionPerDay')}
            </div>
          }
          precision={1}
          value={98.4}
          unit="%"
        />
      </div>
      <SaleBartChart className="mt-4" />
    </div>
  );
}
