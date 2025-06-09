import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import Heading from '@ui/Heading';
import Divider from '@ui/Divider';
import ProjectCard from './components/ProjectCard';
import { getUser } from '@/_mock/user';
import { getProjectsByUserId } from '@/_mock/project';
import { getQuickAccessById } from '@/_mock/system';
import BriefUserInfo from '@business/BriefUserInfo';
import Button from '@/components/ui/Button';
import SvgIcon from '@/components/ui/SvgIcon';
import DynamicTrans from '@/components/business/DynamicTrans';

export default function WorkBenchPage() {
  const id = 'admin-001';
  const { t } = useTranslation();
  const { data: userResponse } = useQuery({ queryKey: ['user', id], queryFn: () => getUser(id) });
  const { data: projectsResponse } = useQuery({ queryKey: ['projects', id], queryFn: () => getProjectsByUserId(id) });
  const { data: quickAccessResponse } = useQuery({ queryKey: ['quickAccess', id], queryFn: () => getQuickAccessById(id) });

  return (
    <div>
      <Heading as="h3" className="mb-3">
        {t('menus.dashboard.workbench')}
      </Heading>
      <div className="flex flex-col gap-4 lg:flex-row">
        <section className="panel flex-1">
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
        <section className="panel h-fit md:w-70">
          <div className="mb-8 flex items-center justify-between">
            <Heading as="h5">{t('common.quickAccess')}</Heading>
            <Link to="#" className="text-primary text-sm hover:opacity-80">
              {t('common.viewMore')}
            </Link>
          </div>
          <div className="grid grid-cols-3 justify-items-center gap-4">
            {quickAccessResponse?.data.list.map((item) => (
              <Link to={item.url} key={item.id} className="flex flex-col items-center gap-1">
                <Button size="md" colors="neutral" asIcon>
                  <SvgIcon size={22} name={item.icon} />
                </Button>
                <span className="text-description text-xs">
                  <DynamicTrans prefix="common.">{item.label}</DynamicTrans>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
