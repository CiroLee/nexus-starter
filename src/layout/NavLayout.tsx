import { Outlet } from 'react-router-dom';
import { Suspense, useMemo } from 'react';
import { useLayoutStore } from '@/store/layout';
import Header from './Header';
import SideBar from './SideBar';
import { cn } from '@/lib/utils';
import { useMobile } from '@/hooks';
import mainRoutes from '@/routes/main.routes';
import { filterVisibleRoutes } from '@/utils/routes';
import type { CustomRoute } from '@/types/route';

export default function NavLayout() {
  const { isSideBarOpen } = useLayoutStore();
  const isMobile = useMobile();
  const menus = useMemo(() => {
    const children = mainRoutes.children as CustomRoute[];
    return filterVisibleRoutes(children);
  }, []);
  return (
    <div>
      <SideBar menus={menus} />
      <Header className={cn({ 'w-[calc(100%_-_var(--sidebar-width))]': !isMobile && isSideBarOpen })} menus={menus} />
      <main className={cn('relative min-h-screen pl-0 transition-[padding]', { 'pl-(--sidebar-width)': !isMobile && isSideBarOpen })}>
        <div className="h-16"></div>
        <section className="relative min-h-[calc(100vh_-_var(--header-height))] bg-zinc-100 p-4 dark:bg-zinc-900/60">
          <Suspense>{<Outlet />}</Suspense>
        </section>
      </main>
    </div>
  );
}
