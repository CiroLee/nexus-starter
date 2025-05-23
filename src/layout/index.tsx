import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { useTheme } from '@/hooks';
export default function HeadlessLayout() {
  useTheme();
  return (
    <>
      <Suspense>{<Outlet />}</Suspense>
    </>
  );
}
