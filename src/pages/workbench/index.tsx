import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Heading from '@ui/Heading';
import Divider from '@ui/Divider';
import ProjectCard from './components/ProjectCard';
import { getUser } from '@/_mock/user';
import { getProjectsByUserId } from '@/_mock/project';
import { getBulletins, getQuickAccessById } from '@/_mock/system';
import BriefUserInfo from '@business/BriefUserInfo';
import QuickAccess from './components/QuickAccess';
import BulletinBoard from './components/BulletinBoard';
import UpdateFeeds from './components/UpdateFeeds';
import HelpDocument from './components/HelpDocument';

export default function WorkBenchPage() {
  const id = 'admin-001';
  const { t } = useTranslation();
  const { data: userResponse } = useQuery({ queryKey: ['user', id], queryFn: () => getUser(id) });
  const { data: projectsResponse } = useQuery({ queryKey: ['projects', id], queryFn: () => getProjectsByUserId(id) });
  const { data: quickAccessResponse } = useQuery({ queryKey: ['quickAccess', id], queryFn: () => getQuickAccessById(id) });
  const { data: bulletinsResponse } = useQuery({ queryKey: ['bulletins'], queryFn: getBulletins });

  return (
    <div>
      <Heading as="h3" className="mb-3">
        {t('menus.dashboard.workbench')}
      </Heading>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="space-y-4">
          <section className="panel h-fit flex-1">
            <BriefUserInfo
              avatarUrl={userResponse?.data.avatarUrl}
              userName={userResponse?.data.userName}
              role={`auth.role.${userResponse?.data.role}`}
              description={userResponse?.data.positionPath.join(' / ')}
              className="mb-5"
            />
            <div>
              <div className="flex items-center justify-between">
                <Heading as="h5">{t('user.myProject')}</Heading>
                <Link to="#" className="text-primary text-sm hover:opacity-80">
                  {t('common.allProject')}
                </Link>
              </div>
              <Divider />
              <ul className="grid gap-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {projectsResponse?.data.projects.map((item) => (
                  <ProjectCard key={item.projectId} status={item.projectStatus} description={item.projectDesc} name={item.projectName} avatarColor={item.projectColor} />
                ))}
              </ul>
            </div>
          </section>
          <UpdateFeeds />
        </div>
        <div className="space-y-4 md:w-70">
          <QuickAccess list={quickAccessResponse?.data.list || []} />
          <BulletinBoard list={bulletinsResponse?.data || []} />
          <HelpDocument />
        </div>
      </div>
    </div>
  );
}
