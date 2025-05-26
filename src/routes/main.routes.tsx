import NavLayout from '@/layout/NavLayout';
import { CustomRoute } from '@/types/route';
import { IconChartPie2Filled, IconLayoutDashboardFilled, IconExclamationCircleFilled, IconCircleLetterRFilled } from '@tabler/icons-react';
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
      meta: {
        name: 'error.title',
        visible: true,
        icon: <IconExclamationCircleFilled size={20} />
      },
      children: [
        {
          path: '/error/403',
          id: 'error-403',
          Component: lazy(() => import('@/pages/error/403')),
          meta: {
            name: 'error.403',
            visible: true
          }
        },
        {
          path: '/error/404',
          id: 'error-404',
          Component: lazy(() => import('@/pages/error/404')),
          meta: {
            name: 'error.404',
            visible: true
          }
        },
        {
          path: '/error/500',
          id: 'error-500',
          Component: lazy(() => import('@/pages/error/500')),
          meta: {
            name: 'error.500',
            visible: true
          }
        }
      ]
    },
    {
      id: 'result',
      meta: {
        name: 'result.title',
        visible: true,
        icon: <IconCircleLetterRFilled size={20} />
      },
      children: [
        {
          id: 'result-success',
          path: '/result/success',
          Component: lazy(() => import('@/pages/result/success')),
          meta: {
            name: 'result.success',
            visible: true
          }
        },
        {
          id: 'result-fail',
          path: '/result/fail',
          Component: lazy(() => import('@/pages/result/fail')),
          meta: {
            name: 'result.fail',
            visible: true
          }
        }
      ]
    }
  ] as CustomRoute[]
};

export default mainRoutes;
