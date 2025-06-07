import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Heading from '@ui/Heading';
import Tag from '@ui/Tag';
import Divider from '@ui/Divider';
import Link from '@ui/Link';
import { Avatar } from '@ui/Avatar';
import DynamicTrans from '@/components/business/DynamicTrans';
import ProjectCard from './components/ProjectCard';
import { getUser } from '@/_mock/user';
import { getProjectsByUserId } from '@/_mock/project';

export default function WorkBenchPage() {
  const id = 'admin-001';
  const { t } = useTranslation();
  const { data: userResponse } = useQuery({ queryKey: ['user', id], queryFn: () => getUser(id) });
  const { data: projectsResponse } = useQuery({ queryKey: ['projects', id], queryFn: () => getProjectsByUserId(id) });

  return (
    <div>
      <Heading as="h3" className="mb-3">
        {t('menus.dashboard.workbench')}
      </Heading>
      <div className="flex flex-col gap-4 md:flex-row">
        <section className="panel flex-1">
          <div className="mb-5 flex gap-3">
            <Avatar src={userResponse?.data.avatarUrl} size="lg" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{userResponse?.data.userName}</p>
                <Tag colors="neutral" className="min-h-5 px-1.5 text-xs">
                  <DynamicTrans>{`auth.role.${userResponse?.data.role}`}</DynamicTrans>
                </Tag>
              </div>
              <div className="text-description text-sm">{userResponse?.data.positionPath.join(' / ')}</div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Heading as="h5">{t('user.myProject')}</Heading>
              <Link href="#" className="text-sm">
                {t('user.allProject')}
              </Link>
            </div>
            <Divider />
            <ul className="grid gap-2 lg:grid-cols-2 xl:grid-cols-4">
              {projectsResponse?.data.projects.map((item) => (
                <ProjectCard key={item.projectId} status={item.projectStatus} description={item.projectDesc} name={item.projectName} avatarColor={item.projectColor} />
              ))}
            </ul>
          </div>
        </section>
        <section className="panel md:w-70">
          <Heading as="h5">Quick Access</Heading>
        </section>
      </div>
    </div>
  );
}
