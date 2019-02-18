export default [
  { path: '/login', name: 'Login', component: () => import('~/pages/login').then(m => m.default || m) },

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

  { path: '*', component: () => import('~/pages/login').then(m => m.default || m) }

  // { path: '/', name: 'welcome', component: Welcome },

  // { path: '/login', name: 'login', component: Login },
  // { path: '/register', name: 'register', component: Register },
  // { path: '/password/reset', name: 'password.request', component: PasswordEmail },
  // { path: '/password/reset/:token', name: 'password.reset', component: PasswordReset },

  // { path: '/home', name: 'home', component: Home },
  // {
  //   path: '/settings',
  //   component: Settings,
  //   children: [
  //     { path: '', redirect: { name: 'settings.profile' } },
  //     { path: 'profile', name: 'settings.profile', component: SettingsProfile },
  //     { path: 'password', name: 'settings.password', component: SettingsPassword }
  //   ]
  // },
]
