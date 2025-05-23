import { CustomRoute } from '@/types/route';
import MenuLink from './MenuLink';
import Collapsible from '@/components/ui/Collapsible';
import Button from '@/components/ui/Button';
import { IconChevronDown } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface MenuListProps {
  menus: CustomRoute[];
  className?: string;
}
export default function MenuList({ menus, className }: MenuListProps) {
  return (
    <div className={cn('space-y-1', className)}>
      {menus.map((menu) => {
        if (!menu.children?.length) {
          return <MenuLink key={menu.id} meta={menu.meta} path={menu.path} />;
        }
        return (
          <Collapsible
            key={menu.id}
            trigger={
              <Button variant="light" colors="neutral" className="group w-full justify-between">
                <div className="flex items-center gap-1">
                  <i className="shrink-0">{menu.meta?.icon}</i>
                  <span>{menu.meta?.name}</span>
                </div>
                <IconChevronDown size={18} className="transition-transform group-data-[state=open]:rotate-180" />
              </Button>
            }>
            {menu.children.map((child: CustomRoute) => (
              <MenuLink className="not-last:mb-1 first:mt-1" key={child.id} path={child.path} meta={child.meta} />
            ))}
          </Collapsible>
        );
      })}
    </div>
  );
}
