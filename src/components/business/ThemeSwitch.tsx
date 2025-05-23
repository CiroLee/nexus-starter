import { cva } from 'class-variance-authority';
import { DropdownMenu } from 'radix-ui';
import Button from '../ui/Button';
import { useTheme } from '@/hooks';
import { IconSunFilled, IconMoonFilled, IconDeviceDesktop } from '@tabler/icons-react';
import { ThemeMode } from '@/types';

const item = cva('flex items-center outline-none gap-1 text-sm rounded p-2 cursor-default transition-colors focus:bg-primary focus:text-white');
const themeMap = {
  light: <IconSunFilled size={22} />,
  dark: <IconMoonFilled size={20} />,
  system: <IconDeviceDesktop size={20} />
};
export default function ThemeSwitch() {
  const [theme, setTheme] = useTheme();

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
        <DropdownMenu.Content
          sideOffset={10}
          align="end"
          className="border-line bg-background data-[state=open]:animate-zoom-fade-in data-[state=closed]:animate-zoom-fade-out z-(--popup) min-w-25 origin-(--radix-dropdown-menu-content-transform-origin) rounded-md border p-1 outline-none">
          <DropdownMenu.Item className={item()} onSelect={() => handleThemeSwitch('light')}>
            Light
          </DropdownMenu.Item>
          <DropdownMenu.Item className={item()} onClick={() => handleThemeSwitch('dark')}>
            Dark
          </DropdownMenu.Item>
          <DropdownMenu.Item className={item()} onClick={() => handleThemeSwitch('system')}>
            System
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
