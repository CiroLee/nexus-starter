import { IconLanguage } from '@tabler/icons-react';
import { cva } from 'class-variance-authority';
import { DropdownMenu } from 'radix-ui';
import Button from '../ui/Button';
import i18n from '@/i18n/i18n';
import { resourceOptions } from '@/i18n/resources';

const item = cva('flex items-center outline-none gap-1 text-sm rounded p-2 cursor-default transition-colors focus:bg-primary focus:text-white');

export default function LocaleSwitch() {
  const handleChangeLocale = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="light" colors="neutral" size="sm" asIcon>
          <IconLanguage size={20} />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={10}
          align="end"
          className="border-line bg-background data-[state=open]:animate-zoom-fade-in data-[state=closed]:animate-zoom-fade-out z-(--popup) min-w-25 origin-(--radix-dropdown-menu-content-transform-origin) rounded-md border p-1 outline-none">
          {resourceOptions.map((r) => (
            <DropdownMenu.Item key={r.value} className={item()} onClick={() => handleChangeLocale(r.value)}>
              {r.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
