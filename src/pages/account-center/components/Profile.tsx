import { DataList, DataListItem, DataListLabel, DataListValue } from '@ui/DataList';
import { Breadcrumb, BreadcrumbItem } from '@ui/Breadcrumb';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/user';
export default function Profile() {
  const { userInfo } = useUserStore();
  const { t } = useTranslation();
  return (
    <div className="p-2">
      <DataList>
        <DataListItem>
          <DataListLabel>{t('account.profile.name')}</DataListLabel>
          <DataListValue>{userInfo.username}</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>{t('account.profile.email')}</DataListLabel>
          <DataListValue className="text-primary">{userInfo.email}</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>{t('account.profile.contact')}</DataListLabel>
          <DataListValue className="text-primary">{userInfo.contact}</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>{t('account.profile.country')}</DataListLabel>
          <DataListValue>{userInfo.country.toUpperCase()}</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>{t('account.profile.position')}</DataListLabel>
          <DataListValue>
            <Breadcrumb>
              {userInfo.positionPath.map((p, i) => (
                <BreadcrumbItem href="#" key={i} asCurrent={i === userInfo.positionPath.length - 1}>
                  {p}
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
          </DataListValue>
        </DataListItem>
      </DataList>
    </div>
  );
}
