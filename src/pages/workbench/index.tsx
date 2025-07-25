import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/user';
import { getProjectsByUserId } from '@/_mock/project';
import Show from '@ui/Show';
import Heading from '@ui/Heading';
import Divider from '@ui/Divider';
import BriefUserInfo from '@business/BriefUserInfo';
import QuickAccess from './components/QuickAccess';
import BulletinBoard from './components/BulletinBoard';
import UpdateFeeds from './components/UpdateFeeds';
import HelpDocument from './components/HelpDocument';
import ProjectCard from './components/ProjectCard';
import { SkeletonBlock } from '@ui/Skeleton';

export default function WorkBenchPage() {
  const { userInfo } = useUserStore();
  const { t } = useTranslation();
  const { data: projectsResponse, isPending: projectsIsPending } = useQuery({ queryKey: ['projects', userInfo?.id], queryFn: () => getProjectsByUserId(userInfo?.id || '') });

  return (
    <div>
      <Heading as="h3" className="mb-3">
        {t('menus.workbench')}
      </Heading>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1 space-y-4">
          <section className="panel h-fit flex-1">
            <BriefUserInfo avatarUrl={userInfo?.avatarUrl} userName={userInfo?.username} role={`auth.role.${userInfo?.role}`} description={userInfo?.positionPath.join(' / ')} className="mb-5" />
            <div>
              <div className="flex items-center justify-between">
                <Heading as="h5">{t('account.myProject')}</Heading>
                <Link to="#" className="text-primary text-sm hover:opacity-80">
                  {t('common.allProject')}
                </Link>
              </div>
              <Divider />
              <ul className="grid gap-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                <Show
                  when={!projectsIsPending}
                  fallback={Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonBlock key={i} className="h-36" />
                  ))}>
                  {projectsResponse?.data.projects.map((item) => (
                    <ProjectCard key={item.projectId} status={item.projectStatus} description={item.projectDesc} name={item.projectName} avatarColor={item.projectColor} />
                  ))}
                </Show>
              </ul>
            </div>
          </section>
          <UpdateFeeds />
        </div>
        <div className="space-y-4 lg:w-70">
          <QuickAccess userId={userInfo?.id || ''} />
          <BulletinBoard />
          <HelpDocument />
        </div>
      </div>
    </div>
  );
}
