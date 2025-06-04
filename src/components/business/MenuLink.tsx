import { NavLink } from 'react-router-dom';
import Button from '@ui/Button';
import Show from '@ui/Show';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface MenuButtonLinkProps {
  path?: string;
  isActive?: boolean;
  className?: string;
  name?: string;
  icon?: React.ReactNode;
}
export default function MenuLink({ path, name, icon, className }: MenuButtonLinkProps) {
  const { t } = useTranslation();
  if (!path) return null;

  /* @ts-expect-error --dynamic translation  key */
  const transText = (text?: string): string => (text ? t(`menus.${text}`) : '');
  return (
    <NavLink to={path} className={({ isActive }) => cn('block', { '[&_button]:bg-primary/15 [&_button]:text-primary': isActive }, className)}>
      <Button variant="light" colors="neutral" className={cn('w-full justify-start gap-1 text-sm')}>
        <Show when={icon}>
          <i className="shrink-0">{icon}</i>
        </Show>
        <span>{transText(name)}</span>
      </Button>
    </NavLink>
  );
}
