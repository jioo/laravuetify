export default [
  { path: '/login', name: 'Login', component: () => import('~/pages/auth/login').then(m => m.default || m) },
  { path: '/register', name: 'Register', component: () => import('~/pages/auth/register').then(m => m.default || m) },
  { path: '/forgot-password', name: 'Forgot Password', component: () => import('~/pages/auth/forgot-password').then(m => m.default || m) },
  { path: '/password/reset/:token', name: 'Reset Password', component: () => import('~/pages/auth/reset-password').then(m => m.default || m) },

  {
    path: '/',
    component: () => import('~/layouts/default').then(m => m.default || m), 
    children: [
      { path: '', redirect: { path: '/dashboard' } },
      { path: 'dashboard', name: 'Dashboard', component: () => import('~/pages/dashboard').then(m => m.default || m) },
      { path: 'user-profile', name: 'User Profile', component: () => import('~/pages/user-profile').then(m => m.default || m) },
      { path: 'user-password', name: 'Change Password', component: () => import('~/pages/user-password').then(m => m.default || m) },
      { path: 'table-list', name: 'Table List', component: () => import('~/pages/table-list').then(m => m.default || m) },
      { path: 'icons', name: 'Icons', component: () => import('~/pages/icons').then(m => m.default || m) },
      { path: 'maps', name: 'Maps', component: () => import('~/pages/maps').then(m => m.default || m) },
      { path: 'notifications', name: 'Notifications', component: () => import('~/pages/notifications').then(m => m.default || m) },
    ],
  },

  { path: '*', component: () => import('~/pages/auth/login').then(m => m.default || m) }
]