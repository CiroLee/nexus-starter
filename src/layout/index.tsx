import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { useTheme, useLogin } from '@/hooks';
import Toaster from '@ui/Sonner';
import Loading from '@ui/Loading';

const queryClient = new QueryClient();
export default function HeadlessLayout() {
  useLogin();
  useTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading open isFullscreen />}>{<Outlet />}</Suspense>
      <Toaster />
    </QueryClientProvider>
  );
}
