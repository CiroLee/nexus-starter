import { DropdownMenu } from 'radix-ui';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconLogout, IconSettings } from '@tabler/icons-react';
import { useUserStore } from '@/store/user';
import { Avatar } from '../ui/Avatar';
import { cn } from '@/lib/utils';
import { useLogin } from '@/hooks';

export default function UserDropdown({ className }: { className?: string }) {
  const { userInfo } = useUserStore();
  const { logout } = useLogin();
  const { t } = useTranslation();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Avatar className={cn('border-line hover:ring-line ring-offset-background size-6 ring-offset-1 transition hover:ring-2', className)} src={userInfo.avatarUrl} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={10} align="end" className="dropdown-menu--content">
          <DropdownMenu.Item asChild className="dropdown-menu--item flex items-center gap-1">
            <Link to="/account/center">
              <IconSettings size={20} />
              {t('menus.account.center')}
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="bg-line my-1 h-px" />
          <DropdownMenu.Item className="dropdown-menu--item flex items-center gap-1" onSelect={logout}>
            <IconLogout size={20} />
            {t('common.logout')}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
