import { CustomRoute } from '@/types/route';
import MenuLink from './MenuLink';
import Collapsible from '@/components/ui/Collapsible';
import Button from '@/components/ui/Button';
import { IconChevronDown } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface MenuListProps {
  menus: CustomRoute[];
  className?: string;
}
// support one level subMenu, that is enough
export default function MenuList({ menus, className }: MenuListProps) {
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
}
function CollapsibleMenu({ name, icon, defaultOpen, list }: CollapsibleMenuProps) {
  const { t } = useTranslation();

  /* @ts-expect-error --dynamic translation  key */
  const transText = (text?: string): string => (text ? t(`menus.${text}`) : '');
  const { pathname } = useLocation();
  const childrenPaths = list.map((child) => child.path);

  return (
    <Collapsible
      defaultOpen={defaultOpen || childrenPaths.includes(pathname)}
      trigger={
        <Button variant="light" colors="neutral" className="group w-full justify-between text-sm">
          <div className="flex items-center gap-1">
            <i className="shrink-0">{icon}</i>
            <span>{transText(name)}</span>
          </div>
          <IconChevronDown size={18} className="transition-transform group-data-[state=open]:rotate-180" />
        </Button>
      }>
      {list.map((child: CustomRoute) => (
        <MenuLink className="pl-6 not-last:mb-1 first:mt-1" key={child.id} path={child.path} icon={child.meta?.icon} name={child.meta?.name} />
      ))}
    </Collapsible>
  );
}
