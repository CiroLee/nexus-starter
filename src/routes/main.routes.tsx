import NavLayout from '@/layout/NavLayout';
import { CustomRoute } from '@/types/route';
import { IconChartPie2Filled, IconLayoutDashboardFilled } from '@tabler/icons-react';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
const mainRoutes: CustomRoute = {
  path: '/',
  id: 'root',
  element: <NavLayout />,
  // id is required
  children: [
    {
      index: true,
      id: 'replace-to-dashboard',
      element: <Navigate to="/dashboard" replace />,
      meta: {
        visible: false
      }
    },
    {
      path: '/dashboard',
      id: 'dashboard',
      Component: lazy(() => import('@/pages/dashboard')),
      meta: {
        name: 'dashboard',
        visible: true,
        icon: <IconLayoutDashboardFilled size={20} />
      }
    },
    {
      path: '/analysis',
      id: 'analysis',
      Component: lazy(() => import('@/pages/analysis')),
      meta: {
        name: 'analysis',
        visible: true,
        icon: <IconChartPie2Filled size={20} />
      }
    }
  ] as CustomRoute[]
};

export default mainRoutes;
