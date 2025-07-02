import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import RootLayout from '@/layout';
import mainRoutes from './main.routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      mainRoutes,
      {
        id: 'login',
        path: '/login',
        Component: lazy(() => import('@/pages/auth/login'))
      },
      {
        id: 'forgot-password',
        path: '/forgot-password',
        Component: lazy(() => import('@/pages/auth/forgot-password'))
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />
      },
      {
        path: '/404',
        id: 'not-found',
        Component: lazy(() => import('@/pages/not-found'))
      }
    ]
  }
]);
