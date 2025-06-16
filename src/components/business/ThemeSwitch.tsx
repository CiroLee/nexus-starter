import { DropdownMenu } from 'radix-ui';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import { useTheme } from '@/hooks';
import { IconSunFilled, IconMoonFilled, IconDeviceDesktop } from '@tabler/icons-react';
import { ThemeMode } from '@/types/theme';

const themeMap = {
  light: <IconSunFilled size={22} />,
  dark: <IconMoonFilled size={20} />,
  system: <IconDeviceDesktop size={20} />
};
export default function ThemeSwitch() {
  const [theme, setTheme] = useTheme();
  const { t } = useTranslation();
  const handleThemeSwitch = (theme: ThemeMode) => {
    if (typeof setTheme === 'function') {
      setTheme(theme);
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="light" colors="neutral" size="sm" asIcon>
          {themeMap[theme as keyof typeof themeMap]}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={10} align="end" className="dropdown-menu--content">
          <DropdownMenu.Item className="dropdown-menu--item" onSelect={() => handleThemeSwitch('light')}>
            {t('common.lightTheme')}
          </DropdownMenu.Item>
          <DropdownMenu.Item className="dropdown-menu--item" onClick={() => handleThemeSwitch('dark')}>
            {t('common.darkTheme')}
          </DropdownMenu.Item>
          <DropdownMenu.Item className="dropdown-menu--item" onClick={() => handleThemeSwitch('system')}>
            {t('common.systemTheme')}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
