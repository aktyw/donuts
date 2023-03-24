import HomeView from '@/views/HomeView.vue';
import TasksView from '@/views/TasksView.vue';
import NotesView from '@/views/NotesView.vue';
import LoginView from '@/views/LoginView.vue';
import TasksSidebar from '@/components/tasks/TasksSidebar.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/tasks',
    name: 'tasks',
    components: { default: TasksView, sidebar: TasksSidebar },
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
