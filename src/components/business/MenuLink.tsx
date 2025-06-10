import { NavLink } from 'react-router-dom';
import Button from '@ui/Button';
import Show from '@ui/Show';
import { cn } from '@/lib/utils';
import DynamicTrans from './DynamicTrans';

interface MenuButtonLinkProps {
  path?: string;
  isActive?: boolean;
  className?: string;
  name?: string;
  icon?: React.ReactNode;
}
export default function MenuLink({ path, name, icon, className }: MenuButtonLinkProps) {
  if (!path) return null;
  return (
    <NavLink to={path} className={({ isActive }) => cn('block', { '[&_button]:bg-primary/15 [&_button]:text-primary': isActive }, className)}>
      <Button variant="light" colors="neutral" className={cn('w-full justify-start gap-1 text-sm')}>
        <Show when={icon}>
          <i className="shrink-0">{icon}</i>
        </Show>
        <DynamicTrans prefix="menus.">{name || ''}</DynamicTrans>
      </Button>
    </NavLink>
  );
}
