export default [
  { path: '/login', name: 'login', component: () => import('~/pages/login').then(m => m.default || m) },

  {
    path: '/',
    component: () => import('~/layouts/default').then(m => m.default || m), 
    children: [
      { path: '', redirect: { name: 'dashboard' } },
      { path: 'dashboard', name: 'dashboard', component: () => import('~/pages/dashboard').then(m => m.default || m) },
    ],
  }
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

  // { path: '*', component: NotFound }
]
