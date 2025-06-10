import { cn } from '@/lib/utils';
import { Avatar } from '@ui/Avatar';
import Tag from '@ui/Tag';
import DynamicTrans from './DynamicTrans';
interface BriefUserInfoProps {
  avatarUrl?: string;
  userName?: string;
  role?: string;
  description?: string;
  className?: string;
}
export default function BriefUserInfo({ className, avatarUrl, userName, role, description }: BriefUserInfoProps) {
  return (
    <div className={cn('flex gap-3', className)}>
      <Avatar src={avatarUrl} size="lg" />
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{userName}</p>
          <Tag colors="neutral" className="min-h-5 px-1.5 text-xs">
            <DynamicTrans>{role || ''}</DynamicTrans>
          </Tag>
        </div>
        <div className="text-description text-sm">{description}</div>
      </div>
    </div>
  );
}
