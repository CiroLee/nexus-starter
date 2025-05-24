import NavLayout from '@/layout/NavLayout';
import { CustomRoute } from '@/types/route';
import { IconChartPie2Filled, IconLayoutDashboardFilled, IconExclamationCircleFilled } from '@tabler/icons-react';
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
    },
    {
      id: 'error',
      path: '/error',
      Component: lazy(() => import('@/pages/error')),
      meta: {
        name: 'error',
        visible: true,
        icon: <IconExclamationCircleFilled size={20} />
      },
      children: [
        {
          path: '/error/403',
          id: 'error-403',
          Component: lazy(() => import('@/pages/error/403')),
          meta: {
            name: '403',
            visible: true
          }
        },
        {
          path: '/error/404',
          id: 'error-404',
          Component: lazy(() => import('@/pages/error/404')),
          meta: {
            name: '404',
            visible: true
          }
        },
        {
          path: '/error/500',
          id: 'error-500',
          Component: lazy(() => import('@/pages/error/500')),
          meta: {
            name: '500',
            visible: true
          }
        }
      ]
    }
  ] as CustomRoute[]
};

export default mainRoutes;
