import NavLayout from '@/layout/NavLayout';
import { CustomRoute } from '@/types/route';
import { IconLayoutDashboardFilled, IconBoltFilled, IconExclamationCircleFilled, IconCircleLetterRFilled, IconBrandDenodo, IconUserFilled } from '@tabler/icons-react';
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
      element: <Navigate to="/workbench" replace />,
      meta: {
        visible: false
      }
    },
    {
      id: 'workbench',
      path: '/workbench',
      Component: lazy(() => import('@/pages/workbench')),
      meta: {
        name: 'workbench',
        icon: <IconBoltFilled size={20} />
      }
    },
    {
      id: 'dashboard',
      meta: {
        name: 'dashboard.title',
        icon: <IconLayoutDashboardFilled size={20} />
      },
      children: [
        {
          id: 'analysis',
          path: '/dashboard/analysis',
          Component: lazy(() => import('@/pages/dashboard/analysis')),
          meta: {
            name: 'dashboard.analysis'
          }
        }
      ]
    },
    {
      id: 'management',
      meta: {
        name: 'management.title',
        icon: <IconBrandDenodo size={20} />
      },
      children: [
        {
          id: 'app-management',
          path: '/management/app',
          Component: lazy(() => import('@/pages/management/app')),
          meta: {
            name: 'management.appManagement'
          }
        },
        {
          id: 'staff-management',
          path: '/management/staff',
          Component: lazy(() => import('@/pages/management/staff')),
          meta: {
            name: 'management.staffManagement'
          }
        },
        {
          id: 'edit-staff',
          path: '/management/staff-edit/:userId',
          Component: lazy(() => import('@/pages/management/staff-edit')),
          meta: {
            visible: false
          }
        },
        {
          id: 'create-staff',
          path: '/management/staff-create',
          Component: lazy(() => import('@/pages/management/staff-create')),
          meta: {
            visible: false
          }
        }
      ]
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
    },
    {
      id: 'account',
      meta: {
        name: 'account.title',
        visible: true,
        icon: <IconUserFilled size={20} />
      },
      children: [
        {
          id: 'account-center',
          path: '/account/center',
          Component: lazy(() => import('@/pages/account/center')),
          meta: {
            name: 'account.center',
            visible: true
          }
        },
        {
          id: 'account-setting',
          path: '/account/setting',
          Component: lazy(() => import('@/pages/account/setting')),
          meta: {
            name: 'account.setting',
            visible: true
          }
        }
      ]
    }
  ] as CustomRoute[]
};

export default mainRoutes;
