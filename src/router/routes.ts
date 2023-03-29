import HomeView from '@/views/HomeView.vue';
import TasksView from '@/views/TasksView.vue';
import NotesView from '@/views/NotesView.vue';
import LoginView from '@/views/LoginView.vue';
import TasksSidebar from '@/components/tasks/TasksSidebar.vue';
import TodayView from '@/views/TodayView.vue';
import InboxView from '@/views/InboxView.vue';
import ProjectView from '@/views/ProjectView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/tasks',
    redirect: { name: 'inbox' },
    name: 'tasks',
    components: { default: TasksView, sidebar: TasksSidebar },
    children: [
      {
        path: 'inbox',
        name: 'inbox',
        components: { default: InboxView, sidebar: TasksSidebar },
        props: { default: true, sidebar: false },
      },
      {
        path: 'today',
        name: 'today',
        component: TodayView,
        props: true,
      },
      {
        path: 'project/:id',
        name: 'project',
        component: ProjectView,
        props: true,
      },
    ],
  },
  {
    path: '/notes',
    name: 'notes',
    components: { default: NotesView, sidebar: TasksSidebar },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
];

export default routes;
