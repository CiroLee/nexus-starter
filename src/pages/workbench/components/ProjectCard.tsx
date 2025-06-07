import { Avatar } from '@ui/Avatar';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '@ui/Card';
import DynamicTrans from '@/components/business/DynamicTrans';
import { projectStatusColors } from '@/utils/constants';
import type { ProjectStatus } from '@/types/project';
import { cn } from '@/lib/utils';
interface ProjectCardProps {
  className?: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  avatarColor?: string;
}
export default function ProjectCard({ name, avatarColor = 'gray', status, description, className }: ProjectCardProps) {
  const fallback = name.charAt(0).toUpperCase();
  return (
    <Card className={cn('cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md', className)}>
      <CardHeader>
        <div className="flex w-full flex-1 items-center gap-2">
          <Avatar
            className="size-7 shrink-0"
            fallback={
              <span className="flex size-full items-center justify-center rounded-[inherit] text-sm text-white" style={{ backgroundColor: avatarColor }}>
                {fallback}
              </span>
            }
          />
          <CardTitle className="truncate">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardBody className="pt-2">
        <p className="text-description line-clamp-2 text-sm">{description}</p>
      </CardBody>
      <CardFooter>
        <ProjectStatus status={status} />
      </CardFooter>
    </Card>
  );
}

function ProjectStatus({ status }: { status: ProjectStatus }) {
  return (
    <span
      className="text-description relative flex items-center gap-1 text-xs before:block before:size-2 before:rounded-full before:bg-(--status-color)"
      style={{ '--status-color': projectStatusColors[status] } as React.CSSProperties}>
      <DynamicTrans>{`projectStatus.${status}`}</DynamicTrans>
    </span>
  );
}
