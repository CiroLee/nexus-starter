import { Avatar } from '@ui/Avatar';
import { cn } from '@/lib/utils';
interface UserProps {
  username: string;
  avatarUrl?: string;
  className?: string;
}
export default function User({ username, avatarUrl, className }: UserProps) {
  return (
    <div className={cn('border-line bg:bg-neutral-200 flex items-center gap-1 rounded-full border py-1 pr-2 pl-1 dark:bg-neutral-800', className)}>
      <Avatar src={avatarUrl} fallback={<span className="text-xs">{username.slice(0, 1).toUpperCase()}</span>} className="size-4" />
      <span className="text-xs">{username}</span>
    </div>
  );
}
