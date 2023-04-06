import HomeView from '@/views/HomeView.vue';
import TasksView from '@/views/TasksView.vue';
import NotesView from '@/views/NotesView.vue';
import LoginView from '@/views/LoginView.vue';
import TasksSidebar from '@/components/tasks/TasksSidebar.vue';
import TodayView from '@/views/TodayView.vue';
import InboxView from '@/views/InboxView.vue';
import ProjectView from '@/views/ProjectView.vue';
import ProjectsView from '@/views/ProjectsView.vue';

// interface ProjectViewRoute {
//   params: {
//     id: string;
//   };
// }

const routes = [
  {
    path: '/',
    name: 'about',
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
        component: InboxView,
      },
      {
        path: 'today',
        name: 'today',
        component: TodayView,
      },
      {
        path: 'project/:id',
        name: 'project',
        component: ProjectView,
      },
    ],
  },
  {
    path: '/projects',
    name: 'projects',
    components: { default: ProjectsView, sidebar: TasksSidebar },
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
