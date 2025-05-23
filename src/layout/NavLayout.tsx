import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { useLayoutStore } from '@/store/layout';
import Header from './Header';
import SideBar from './SideBar';
import { cn } from '@/lib/utils';

export default function NavLayout() {
  const { isSideBarOpen } = useLayoutStore();
  return (
    <div>
      <SideBar />
      <main className={cn('relative h-screen pl-0 transition-[padding]', { 'pl-70': isSideBarOpen })}>
        <Header />
        <section className="p-4">
          <Suspense>{<Outlet />}</Suspense>
        </section>
      </main>
    </div>
  );
}
