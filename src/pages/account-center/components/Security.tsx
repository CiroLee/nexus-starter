import { useTranslation } from 'react-i18next';
import { DataList, DataListItem, DataListLabel, DataListValue } from '@ui/DataList';
import { useUserStore } from '@/store/user';
export default function Security() {
  const { t } = useTranslation();
  const { userInfo } = useUserStore();
  return (
    <div>
      <DataList className="overflow-hidden">
        <DataListItem>
          <DataListLabel>{t('account.security.token')}</DataListLabel>
          <DataListValue className="">
            <p className="max-w-[70%] truncate md:max-w-full">{userInfo.token}</p>
          </DataListValue>
        </DataListItem>
      </DataList>
    </div>
  );
}
