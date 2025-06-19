import { useTranslation } from 'react-i18next';
import BaseSetting from './components/BaseSetting';
import { Tabs, TabsList, TabsItem, TabsContent } from '@ui/Tabs';
import SecuritySetting from './components/SecuritySetting';
import NotificationSetting from './components/NotificationSetting';
import { cva } from 'class-variance-authority';

const tabItem = cva('md:px-4 text-sm min-w-40 md:min-w-auto justify-center');
export default function AccountSettingPage() {
  const { t } = useTranslation();
  return (
    <div className="panel pt-2">
      <Tabs defaultValue="base">
        <TabsList className="scrollbar-hidden w-full overflow-x-auto">
          <TabsItem value="base" className={tabItem()}>
            {t('account.basicSetting')}
          </TabsItem>
          <TabsItem value="security" className={tabItem()}>
            {t('account.securitySetting')}
          </TabsItem>
          <TabsItem value="notification" className={tabItem()}>
            {t('account.notificationSetting')}
          </TabsItem>
        </TabsList>
        <TabsContent value="base">
          <BaseSetting />
        </TabsContent>
        <TabsContent value="security">
          <SecuritySetting />
        </TabsContent>
        <TabsContent value="notification">
          <NotificationSetting />
        </TabsContent>
      </Tabs>
    </div>
  );
}
