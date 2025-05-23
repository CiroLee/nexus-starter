import { IconLayoutSidebarFilled } from '@tabler/icons-react';
import { useLayoutStore } from '@/store/layout';
import Button from '@ui/Button';
import ThemeSwitch from '@/components/business/ThemeSwitch';
import LocaleSwitch from '@/components/business/localeSwitch';
export default function Header() {
  const { toggleSideBar } = useLayoutStore();
  return (
    <header className="border-line flex h-16 items-center justify-between border-b px-4">
      <Button asIcon colors="neutral" variant="light" size="sm" onClick={toggleSideBar}>
        <IconLayoutSidebarFilled size={20} />
      </Button>
      <div className="flex items-center gap-2">
        <LocaleSwitch />
        <ThemeSwitch />
      </div>
    </header>
  );
}
