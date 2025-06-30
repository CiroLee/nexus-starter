import { IconLayoutSidebarFilled, IconBrandGithub, IconBell } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useLayoutStore } from '@/store/layout';
import Button from '@ui/Button';
import { Drawer } from '@ui/Drawer';
import ThemeSwitch from '@/components/business/ThemeSwitch';
import LocaleSwitch from '@/components/business/localeSwitch';
import UserDropdown from '@/components/business/UserDropdown';
import Notification from '@/components/business/Notification';
import { useMobile } from '@/hooks';
import MenuList from '@/components/business/MenuList';
import logoSvg from '@/assets/images/logo.svg';
import Badge from '@/components/ui/Badge';
import { getNotifications } from '@/_mock/system';
import type { CustomRoute } from '@/types/route';

export default function Header({ menus, className }: { className?: string; menus: CustomRoute[] }) {
  const { toggleSideBar } = useLayoutStore();
  const isMobile = useMobile();
  const { data: notifications } = useQuery({ queryKey: ['notifications'], queryFn: getNotifications });
  return (
    <header
      className={cn(
        'border-line bg-background/80 fixed top-0 right-0 z-20 flex h-16 w-full items-center justify-between border-b px-4 backdrop-blur-md backdrop-saturate-200 transition-[width]',
        className
      )}>
      {isMobile ? (
        <MobileSideDrawer menus={menus} onClick={toggleSideBar} />
      ) : (
        <Button asIcon colors="neutral" size="sm" variant="light" className="z-1" onClick={toggleSideBar}>
          <IconLayoutSidebarFilled size={22} />
        </Button>
      )}
      <div className="flex items-center gap-2">
        <Button asIcon colors="neutral" variant="light" size="sm" asChild>
          <a href="https://github.com/CiroLee/nexus-starter" target="_blank" rel="noopener noreferrer">
            <IconBrandGithub size={20} />
          </a>
        </Button>
        <LocaleSwitch />
        <ThemeSwitch />
        <Notification
          data={notifications?.data}
          trigger={
            <Button size="sm" colors="neutral" variant="light" asIcon>
              <Badge size="sm" asDot>
                <IconBell size={20} />
              </Badge>
            </Button>
          }
        />
        <UserDropdown className="ml-2" />
      </div>
    </header>
  );
}

function MobileSideDrawer({ menus, onClick }: { menus: CustomRoute[]; onClick?: () => void }) {
  return (
    <Drawer
      className="min-w-[70%] p-2"
      placement="left"
      trigger={
        <Button asIcon colors="neutral" size="sm" variant="light" className="z-1" onClick={onClick}>
          <IconLayoutSidebarFilled size={22} />
        </Button>
      }>
      <div>
        <Link to="/" className="flex h-12 items-center gap-1 px-4 whitespace-nowrap transition-opacity">
          <img src={logoSvg} alt="logo" className="size-7" width={100} height={100} />
          <span className="font-semibold">Next Starter</span>
        </Link>
        <MenuList menus={menus} />
      </div>
    </Drawer>
  );
}
