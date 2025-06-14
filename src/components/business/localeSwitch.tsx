import { IconLanguage } from '@tabler/icons-react';
import { DropdownMenu } from 'radix-ui';
import Button from '../ui/Button';
import i18n from '@/i18n/i18n';
import { resourceOptions } from '@/i18n/resources';

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
        <DropdownMenu.Content sideOffset={10} align="end" className="dropdown-menu--content">
          {resourceOptions.map((r) => (
            <DropdownMenu.Item key={r.value} className="dropdown-menu--item" onSelect={() => handleChangeLocale(r.value)}>
              {r.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
