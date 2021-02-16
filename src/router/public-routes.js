// Do not try lazy loading components because
// it may experience "Failed to resolved async component" error.

import HomeView from '@entry/home/home-view'
import InviteView from '@auth/invite/invite-view'
import LoginView from '@auth/login/login-view'
import PrivacyView from '@legal/privacy/privacy-view'
import ResetView from '@auth/reset/reset-view'
import SignupView from '@auth/signup/signup-view'
import TosView from '@legal/tos/tos-view'

const routes = [
  {
    path: '/entry',
    name: 'public-home',
    component: HomeView,
    meta: {
      title: 'Landing',
      requireAuth: false,
      labelOfPublicNavItem: 'Home',
    },
  },
  {
    path: '/auth/password/reset/:passwordResetCode?',
    name: 'password-reset',
    component: ResetView,
    meta: {
      title: 'Reset Password',
      requireAuth: false,
    },
  },
  {
    path: '/auth/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Login',
      requireAuth: false,
    },
  },
  {
    path: '/auth/signup/:emailVerificationCode?',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup',
      requireAuth: false,
    },
  },
  {
    path: '/auth/invite/:invitationCode',
    name: 'invite',
    component: InviteView,
    meta: {
      title: 'Invite',
      requireAuth: false,
    },
  },
  {
    path: '/legal/privacy',
    name: 'privacy',
    component: PrivacyView,
    meta: {
      title: 'Privacy',
      requireAuth: false,
    },
  },
  {
    path: '/legal/tos',
    name: 'tos',
    component: TosView,
    meta: {
      title: 'Terms of Service',
      requireAuth: false,
    },
  },
];

export default routes;
