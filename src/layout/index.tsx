import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { useTheme, useLogin } from '@/hooks';

const queryClient = new QueryClient();
export default function HeadlessLayout() {
  useLogin();
  useTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>{<Outlet />}</Suspense>
    </QueryClientProvider>
  );
}
