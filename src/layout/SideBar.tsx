import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { useLayoutStore } from '@/store/layout';
import mainRoutes from '@/routes/main.routes';
import logoSvg from '@/assets/images/logo.svg';
import MenuList from '@/components/business/MenuList';
import { CustomRoute } from '@/types/route';

const logo = cva('flex h-16 items-center gap-1 whitespace-nowrap transition-opacity', {
  variants: {
    isOpen: {
      true: 'opacity-100',
      false: 'opacity-0'
    }
  }
});
export default function SideBar() {
  const { isSideBarOpen } = useLayoutStore();
  const menus = useMemo(() => {
    const children = mainRoutes.children as CustomRoute[];
    return children?.filter((item) => item.meta?.visible);
  }, [mainRoutes.children]);

  return (
    <aside className={cn('border-line fixed top-0 left-0 z-2 flex h-full w-70 translate-x-0 flex-col overflow-hidden border-r px-3 transition-transform', { '-translate-x-full': !isSideBarOpen })}>
      <div className={logo({ isOpen: isSideBarOpen })}>
        <img src={logoSvg} alt="logo" className="size-8 sm:size-8" width={100} height={100} />
        <span className="text-lg font-semibold sm:text-xl">Next Starter</span>
      </div>
      <MenuList className="flex-1 overflow-auto pb-3" menus={menus} />
    </aside>
  );
}
