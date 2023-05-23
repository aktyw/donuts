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
      },
      {
        path: 'archived',
        name: 'archived',
        component: lazyLoad('ProjectsView'),
      },
    ],
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
      },
    ],
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/components/user/settings/modal/UserModal.vue'),
    children: [
      {
        path: ':id',
        name: 'SettingsContent',
        component: () => import(`@/components/user/settings/content/SettingsContent.vue`),
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
