import NavLayout from '@/layout/NavLayout';
import { CustomRoute } from '@/types/route';
import {
  IconLayoutDashboardFilled,
  IconBoltFilled,
  IconBriefcaseFilled,
  IconExclamationCircleFilled,
  IconCircleLetterRFilled,
  IconBrandDenodo,
  IconUserFilled,
  IconCloverFilled,
  IconCardsFilled,
  IconMessageCircleFilled
} from '@tabler/icons-react';
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
      id: 'chat',
      path: '/chat',
      Component: lazy(() => import('@/pages/chat')),
      meta: {
        name: 'chat.DEFAULT',
        icon: <IconMessageCircleFilled size={20} />
      }
    },
    {
      id: 'dashboard',
      meta: {
        name: 'dashboard.DEFAULT',
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
      id: 'business-management',
      meta: {
        name: 'businessManagement.DEFAULT',
        icon: <IconBriefcaseFilled size={20} />
      },
      children: [
        {
          id: 'customer-management',
          path: '/business/customer',
          Component: lazy(() => import('@/pages/business-manage/customer')),
          meta: {
            name: 'businessManagement.customer'
          }
        }
      ]
    },
    {
      id: 'user-management',
      meta: {
        name: 'userManagement.DEFAULT',
        icon: <IconCloverFilled size={20} />
      },
      children: [
        {
          id: 'staff-management',
          path: '/user-management/staff',
          Component: lazy(() => import('@/pages/user-manage/staff')),
          meta: {
            name: 'userManagement.staff'
          }
        },
        {
          id: 'edit-staff',
          path: '/user-management/staff-edit/:userId',
          Component: lazy(() => import('@/pages/user-manage/staff-edit')),
          meta: {
            visible: false
          }
        },
        {
          id: 'create-staff',
          path: '/user-management/staff-create',
          Component: lazy(() => import('@/pages/user-manage/staff-create')),
          meta: {
            visible: false
          }
        }
      ]
    },
    {
      id: 'operation',
      meta: {
        name: 'operation.DEFAULT',
        icon: <IconBrandDenodo size={20} />
      },
      children: [
        {
          id: 'app',
          path: '/operation/apps',
          Component: lazy(() => import('@/pages/operation/app')),
          meta: {
            name: 'operation.appManagement'
          }
        }
      ]
    },
    {
      id: 'demo',
      meta: {
        name: 'demos.DEFAULT',
        icon: <IconCardsFilled size={20} />
      },
      children: [
        {
          id: 'error',
          meta: {
            name: 'demos.error.DEFAULT',
            icon: <IconExclamationCircleFilled size={20} />
          },
          children: [
            {
              path: '/demos/error/403',
              id: 'error-403',
              Component: lazy(() => import('@/pages/error/403')),
              meta: {
                name: 'demos.error.403'
              }
            },
            {
              path: '/demos/error/404',
              id: 'error-404',
              Component: lazy(() => import('@/pages/error/404')),
              meta: {
                name: 'demos.error.404'
              }
            },
            {
              path: '/demos/error/500',
              id: 'error-500',
              Component: lazy(() => import('@/pages/error/500')),
              meta: {
                name: 'demos.error.500'
              }
            }
          ]
        },
        {
          id: 'result',
          meta: {
            name: 'demos.result.DEFAULT',
            icon: <IconCircleLetterRFilled size={20} />
          },
          children: [
            {
              id: 'result-success',
              path: '/demos/result/success',
              Component: lazy(() => import('@/pages/result/success')),
              meta: {
                name: 'demos.result.success'
              }
            },
            {
              id: 'result-fail',
              path: '/demos/result/fail',
              Component: lazy(() => import('@/pages/result/fail')),
              meta: {
                name: 'demos.result.fail'
              }
            }
          ]
        }
      ]
    },

    {
      id: 'account',
      meta: {
        name: 'account.DEFAULT',
        icon: <IconUserFilled size={20} />
      },
      children: [
        {
          id: 'account-center',
          path: '/account/center',
          Component: lazy(() => import('@/pages/account/center')),
          meta: {
            name: 'account.center'
          }
        },
        {
          id: 'account-setting',
          path: '/account/setting',
          Component: lazy(() => import('@/pages/account/setting')),
          meta: {
            name: 'account.setting'
          }
        }
      ]
    }
  ] as CustomRoute[]
};

export default mainRoutes;
