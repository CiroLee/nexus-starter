import { cn } from '@/lib/utils';
import Collapsible from '@ui/Collapsible';
import Button from '@ui/Button';
import Show from '@ui/Show';
import { IconChevronDown } from '@tabler/icons-react';
import { useLocation, NavLink } from 'react-router-dom';
import DynamicTrans from './DynamicTrans';
import { CustomRoute } from '@/types/route';

interface MenuListProps {
  menus: CustomRoute[];
  className?: string;
}

export default function Menu({ menus, className }: MenuListProps) {
  return (
    <div className={cn('space-y-1', className)}>
      {menus.map((menu) => {
        if (!menu.children?.length) {
          return <MenuLink key={menu.id} path={menu.path} name={menu.meta?.name} icon={menu.meta?.icon} />;
        }
        return <CollapsibleMenu key={menu.id} name={menu.meta?.name} list={menu.children} icon={menu.meta?.icon} defaultOpen={menu.meta?.defaultOpen} />;
      })}
    </div>
  );
}

interface CollapsibleMenuProps {
  list: CustomRoute[];
  name?: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  triggerClassName?: string;
}
function CollapsibleMenu({ name, icon, triggerClassName, className, defaultOpen, list }: CollapsibleMenuProps) {
  const { pathname } = useLocation();
  const childrenPaths = list.map((child) => child.path);

  return (
    <Collapsible
      className={className}
      defaultOpen={defaultOpen || childrenPaths.includes(pathname)}
      trigger={
        <Button variant="light" colors="neutral" className={cn('group relative w-full justify-between text-sm', triggerClassName)}>
          <div className="flex items-center gap-1">
            <Show when={icon}>
              <i className="shrink-0">{icon}</i>
            </Show>
            <DynamicTrans prefix="menus.">{name || ''}</DynamicTrans>
          </div>
          <IconChevronDown size={18} className="transition-transform group-data-[state=open]:rotate-180" />
        </Button>
      }>
      {list.map((child) => {
        if (child.children?.length) {
          return (
            <CollapsibleMenu
              className="pl-6"
              triggerClassName="w-[calc(100%_-_calc(var(--spacing)*6))] left-[calc(var(--spacing)*6)]"
              key={`submenu-${child.id}`}
              list={child.children}
              name={child.meta?.name}
              defaultOpen={child.meta?.defaultOpen}
            />
          );
        }
        return <MenuLink className="pl-6 not-last:mb-1 first:mt-1" key={child.id} path={child.path} icon={child.meta?.icon} name={child.meta?.name} />;
      })}
    </Collapsible>
  );
}

interface MenuButtonLinkProps {
  path?: string;
  isActive?: boolean;
  className?: string;
  name?: string;
  icon?: React.ReactNode;
}
function MenuLink({ path, name, icon, className }: MenuButtonLinkProps) {
  if (!path) return null;
  return (
    <NavLink to={path} className={({ isActive }) => cn('block outline-none', { '[&_button]:bg-primary/15 [&_button]:text-primary': isActive }, className)}>
      <Button variant="light" colors="neutral" className={cn('w-full justify-start gap-1 text-sm')}>
        <Show when={icon}>
          <i className="shrink-0">{icon}</i>
        </Show>
        <DynamicTrans prefix="menus.">{name || ''}</DynamicTrans>
      </Button>
    </NavLink>
  );
}
