import { IconId, IconLock, IconUsers, IconServer } from '@tabler/icons-react';
import { cva } from 'class-variance-authority';
import { useTranslation } from 'react-i18next';
import Heading from '@ui/Heading';
import { Avatar } from '@ui/Avatar';
import Tag from '@ui/Tag';
import { Tabs, TabsList, TabsItem, TabsContent } from '@ui/Tabs';
import DynamicTrans from '@/components/business/DynamicTrans';
import { useUserStore } from '@/store/user';
import Profile from './components/Profile';
import Security from './components/Security';
import Teams from './components/Teams';
import Usage from './components/Usage';

const tabItem = cva('md:px-4 text-sm min-w-25 justify-center');
export default function AccountCenterPage() {
  const { userInfo } = useUserStore();
  const { t } = useTranslation();
  return (
    <div>
      <div className="relative h-70 overflow-hidden rounded-md bg-[url('@/assets/images/banner-1.webp')] bg-center bg-no-repeat p-4 shadow">
        <div className="bg-background/90 absolute bottom-0 left-0 flex h-18 w-full items-center gap-3 px-2 backdrop-blur-md backdrop-saturate-150">
          <Avatar src={userInfo.avatarUrl} size="lg" />
          <div>
            <Heading as="h5">{userInfo.username}</Heading>
            <Tag colors="primary" size="sm">
              <DynamicTrans>{`auth.role.${userInfo.role}`}</DynamicTrans>
            </Tag>
          </div>
        </div>
      </div>
      <div className="panel mt-6 pt-2">
        <Tabs className="" defaultValue="profile">
          <TabsList className="scrollbar-hidden w-full overflow-x-auto">
            <TabsItem value="profile" className={tabItem()}>
              <IconId size={20} />
              {t('account.profile.title')}
            </TabsItem>
            <TabsItem value="security" className={tabItem()}>
              <IconLock size={20} />
              {t('account.security.title')}
            </TabsItem>
            <TabsItem value="teams" className={tabItem()}>
              <IconUsers size={20} />
              {t('account.team.title')}
            </TabsItem>

            <TabsItem value="usage" className={tabItem()}>
              <IconServer size={20} />
              {t('account.usage.title')}
            </TabsItem>
          </TabsList>
          <TabsContent value="profile">
            <Profile />
          </TabsContent>
          <TabsContent value="security">
            <Security />
          </TabsContent>
          <TabsContent value="teams">
            <Teams userId={userInfo.id} />
          </TabsContent>
          <TabsContent value="usage">
            <Usage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
