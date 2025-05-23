import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Button from '@ui/Button';
import Show from '@ui/Show';
import { cn } from '@/lib/utils';
import type { CustomRoute } from '@/types/route';

type MenuButtonLinkProps = CustomRoute & {
  isActive?: boolean;
  className?: string;
};
export default function MenuLink({ path, meta, className }: MenuButtonLinkProps) {
  if (!path || !meta?.name) return null;
  const { t } = useTranslation();
  return (
    <NavLink to={path} className={({ isActive }) => cn('block', { '[&_button]:bg-primary/15 [&_button]:text-primary': isActive }, className)}>
      <Button variant="light" colors="neutral" className={cn('w-full justify-start gap-1 text-sm')}>
        <Show when={meta?.icon}>
          <i className="shrink-0">{meta?.icon}</i>
        </Show>
        {/* @ts-expect-error --dynamic translation  key */}
        <span>{t(`menus.${meta.name}`)}</span>
      </Button>
    </NavLink>
  );
}
