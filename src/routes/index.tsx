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
        path: '*',
        element: <Navigate to="/error/404" replace />
      },
      {
        path: '/error/404',
        id: 'not-found',
        Component: lazy(() => import('@/pages/404'))
      }
    ]
  }
]);
