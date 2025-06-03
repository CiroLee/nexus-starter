import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { useTheme } from '@/hooks';

const queryClient = new QueryClient();
export default function HeadlessLayout() {
  useTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>{<Outlet />}</Suspense>
    </QueryClientProvider>
  );
}
