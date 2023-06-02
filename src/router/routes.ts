function lazyLoad(view: string) {
  return () => import(`@/views/${view}.vue`);
}

const routes = [
  {
    path: '/',
    name: 'about',
    component: lazyLoad('HomeView'),
    meta: { requiresNotAuth: true },
  },
  {
    path: '/tasks',
    redirect: { path: '/tasks/project/inbox' },
    name: 'tasks',
    components: { default: lazyLoad('TasksView'), sidebar: () => import(`@/components/sidebars/TasksSidebar.vue`) },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'today',
        name: 'today',
        component: lazyLoad('TodayView'),
        children: [
          {
            path: 'task/:taskid',
            name: 'taskToday',
            component: () => import(`@/components/tasks/modal/TaskModal.vue`),
            meta: { requiresAuth: true },
            props: true,
          },
        ],
      },
      {
        path: 'project/:id',
        name: 'project',
        component: lazyLoad('ProjectView'),
        children: [
          {
            path: 'task/:taskid',
            name: 'task',
            component: () => import(`@/components/tasks/modal/TaskModal.vue`),
            meta: { requiresAuth: true },
            props: true,
          },
        ],
      },
    ],
  },
  {
    path: '/projects',
    redirect: { path: '/projects/active' },
    name: 'projects',
    components: { default: lazyLoad('ProjectsView'), sidebar: () => import(`@/components/sidebars/TasksSidebar.vue`) },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'active',
        name: 'active',
        component: lazyLoad('ProjectsView'),
        meta: { requiresAuth: true },
      },
      {
        path: 'archived',
        name: 'archived',
        component: lazyLoad('ProjectsView'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/activity',
    redirect: { path: '/activity' },
    name: 'activity',
    components: { default: lazyLoad('ActivityView'), sidebar: () => import(`@/components/sidebars/TasksSidebar.vue`) },
    meta: { requiresAuth: true },
  },
  {
    path: '/notes',
    name: 'notes',
    redirect: { path: '/notes/list' },
    components: { default: lazyLoad('NotesView'), sidebar: () => import(`@/components/sidebars/NotesSidebar.vue`) },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'list',
        name: 'noteList',
        component: () => import(`@/components/notes/NotesList.vue`),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/components/user/settings/modal/UserModal.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'account',
        name: 'account',
        component: () => import('@/components/user/settings/content/account/TheAccount.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'account/email',
        name: 'email',
        component: () => import('@/components/user/settings/content/account/ChangeEmail.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'account/password',
        name: 'password',
        component: () => import('@/components/user/settings/content/account/ChangePassword.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'general',
        name: 'general',
        component: () => import('@/components/user/settings/content/general/TheGeneral.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'productivity',
        name: 'productivity',
        component: () => import('@/components/user/settings/content/productivity/TheProductivity.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'theme',
        name: 'theme',
        component: () => import('@/components/user/settings/content/theme/TheTheme.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/auth/login',
    name: 'login',
    component: lazyLoad('LoginView'),
    meta: { requiresNotAuth: true },
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: lazyLoad('SignupView'),
    meta: { requiresNotAuth: true },
  },

  { path: '/:catchAll(.*)', name: '404', component: lazyLoad('NotFoundView') },
];

export default routes;
