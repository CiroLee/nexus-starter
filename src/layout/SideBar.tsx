import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { cva } from 'class-variance-authority';
import { useLayoutStore } from '@/store/layout';
import logoSvg from '@/assets/images/logo.svg';
import Menu from '@/components/business/Menu';
import { CustomRoute } from '@/types/route';
import { useMobile } from '@/hooks';

const logo = cva('flex px-4 h-16 items-center gap-1 whitespace-nowrap transition-opacity', {
  variants: {
    isOpen: {
      true: 'opacity-100',
      false: 'opacity-0'
    }
  }
});
export default function SideBar({ menus }: { menus: CustomRoute[] }) {
  const { isSideBarOpen } = useLayoutStore();
  const isMobile = useMobile();

  if (isMobile) return null;
  return (
    <aside
      className={cn('border-line fixed top-0 left-0 z-3 flex h-screen w-(--sidebar-width) translate-x-0 flex-col overflow-hidden border-r transition-transform', {
        '-translate-x-full': !isSideBarOpen
      })}>
      <Link to="/" className={logo({ isOpen: isSideBarOpen })}>
        <img src={logoSvg} alt="logo" className="size-8 sm:size-8" width={100} height={100} />
        <span className="text-lg font-semibold sm:text-xl">Next Starter</span>
      </Link>
      <Menu className="flex-1 overflow-auto p-3" menus={menus} />
    </aside>
  );
}
