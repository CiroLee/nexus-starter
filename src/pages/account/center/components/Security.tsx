import { useState } from 'react';
import { cva } from 'class-variance-authority';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { DataList, DataListItem, DataListLabel, DataListValue } from '@ui/DataList';
import { useUserStore } from '@/store/user';
import { Button } from '@ui/Button';
import Show from '@ui/Show';
import Tag from '@ui/Tag';
import CopyButton from '@/components/business/CopyButton';

const longText = cva('flex-1 min-w-50 truncate md:w-90');
export default function Security() {
  const [hideToken, setHideToken] = useState(true);
  const { t } = useTranslation();
  const { userInfo } = useUserStore();
  return (
    <DataList className="overflow-auto">
      <DataListItem>
        <DataListLabel className="flex min-w-16 items-center">{t('account.security.token')}</DataListLabel>
        <DataListValue className="flex items-center md:gap-4">
          <p className={longText()}>{hideToken ? '******** ****** ********' : userInfo?.token}</p>
          <div className="flex items-center gap-2">
            <Show
              when={hideToken}
              fallback={
                <Button size="sm" variant="light" pill colors="neutral" asIcon onClick={() => setHideToken(true)}>
                  <IconEyeClosed size={16} />
                </Button>
              }>
              <Button size="sm" variant="light" colors="neutral" pill asIcon onClick={() => setHideToken(false)}>
                <IconEye size={16} />
              </Button>
            </Show>
            <CopyButton pill text={userInfo?.token || ''} />
          </div>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel className="min-w-16 pt-1.5">{t('account.security.appKeys')}</DataListLabel>
        <DataListValue className="space-y-2">
          {userInfo?.appKeys.map((item) => (
            <div className="flex items-center gap-3.5" key={item.key}>
              <p className="min-w-50 flex-1 truncate md:w-80">{item.key}</p>
              <div className="flex items-center justify-between gap-2">
                <Tag colors="neutral" size="sm">
                  {item.name}
                </Tag>
                <CopyButton pill text={item.key} />
              </div>
            </div>
          ))}
        </DataListValue>
      </DataListItem>
    </DataList>
  );
}
