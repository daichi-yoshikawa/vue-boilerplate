// Do not try lazy loading components because
// it may experience "Failed to resolved async component" error.

import FoundationView from '@private/foundation-view'
import HomeView from '@private/home/home-view'
import MicroLearningView from '@private/micro-learning/micro-learning-view'
import SettingsView from '@private/settings/settings-view'
import TenantLoginView from '@private/tenant/login/tenant-login-view'
import TenantSignupView from '@private/tenant/signup/tenant-signup-view'

const routes = [
  {
    path: '/',
    component: FoundationView,
    children: [
      {
        path: '',
        name: 'private-home',
        component: HomeView,
        meta: {
          title: '',
          requireAuth: true,
          requireTenant: true,
        },
      },
      {
        path: '',
        name: 'micro-learning',
        component: MicroLearningView,
        meta: {
          title: 'Micro Learning',
          requireAuth: true,
          requireTenant: true,
        },
      },
      {
        path: 'settings',
        name: 'settings',
        component: SettingsView,
        props: {
          tabIndex: {
            type: Number,
            default: 0,
          },
        },
        meta: {
          title: 'Settings',
          requireAuth: true,
          requireTenant: true,
        },
      },
    ],
  },
  {
    path: '/tenant/login',
    name: 'tenant-login',
    component: TenantLoginView,
    meta: {
      title: 'Tenant Login',
      requireAuth: true,
    },
  },
  {
    path: '/tenant/signup',
    name: 'tenant-signup',
    component: TenantSignupView,
    meta: {
      title: 'Tenant Signup',
      requireAuth: true,
    },
  },
];

export default routes;
