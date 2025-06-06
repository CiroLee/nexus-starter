import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Heading from '@ui/Heading';
import Tag from '@ui/Tag';
import DynamicTrans from '@/components/business/DynamicTrans';
import { Avatar } from '@ui/Avatar';
import { getUser } from '@/_mock/user';
export default function WorkBenchPage() {
  const id = 'admin-001';
  const { t } = useTranslation();
  const { data: response } = useQuery({ queryKey: ['user', id], queryFn: () => getUser(id) });

  return (
    <div>
      <Heading as="h3" className="mb-3">
        {t('menus.dashboard.workbench')}
      </Heading>
      <div className="flex items-center gap-2">
        <Avatar src={response?.data.avatarUrl} size="lg" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{response?.data.userName}</p>
            <Tag colors="neutral" className="min-h-5 px-1.5 text-xs">
              <DynamicTrans>{`auth.role.${response?.data.role}`}</DynamicTrans>
            </Tag>
          </div>
          <div className="text-description text-sm">{response?.data.positionPath.join(' / ')}</div>
        </div>
      </div>
    </div>
  );
}
