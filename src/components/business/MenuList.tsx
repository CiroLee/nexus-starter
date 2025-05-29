import { CustomRoute } from '@/types/route';
import MenuLink from './MenuLink';
import Collapsible from '@/components/ui/Collapsible';
import Button from '@/components/ui/Button';
import { IconChevronDown } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface MenuListProps {
  menus: CustomRoute[];
  className?: string;
}
// support one level subMenu, that is enough
export default function MenuList({ menus, className }: MenuListProps) {
  const { t } = useTranslation();

  /* @ts-expect-error --dynamic translation  key */
  const transText = (text?: string): string => (text ? t(`menus.${text}`) : '');

  return (
    <div className={cn('space-y-1', className)}>
      {menus.map((menu) => {
        if (!menu.children?.length) {
          return <MenuLink key={menu.id} path={menu.path} name={transText(menu.meta?.name)} icon={menu.meta?.icon} />;
        }
        return (
          <Collapsible
            defaultOpen={menu.meta?.defaultOpen}
            key={menu.id}
            trigger={
              <Button variant="light" colors="neutral" className="group w-full justify-between text-sm">
                <div className="flex items-center gap-1">
                  <i className="shrink-0">{menu.meta?.icon}</i>
                  <span>{transText(menu.meta?.name)}</span>
                </div>
                <IconChevronDown size={18} className="transition-transform group-data-[state=open]:rotate-180" />
              </Button>
            }>
            {menu.children.map((child: CustomRoute) => (
              <MenuLink className="pl-6 not-last:mb-1 first:mt-1" key={child.id} path={child.path} icon={child.meta?.icon} name={transText(child.meta?.name)} />
            ))}
          </Collapsible>
        );
      })}
    </div>
  );
}
