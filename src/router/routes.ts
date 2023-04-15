import NotesList from '@/components/notes/NotesList.vue';
import NotesSidebar from '@/components/notes/NotesSidebar.vue';
import TasksSidebar from '@/components/tasks/TasksSidebar.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import NotesView from '@/views/NotesView.vue';
import ProjectsView from '@/views/ProjectsView.vue';
import ProjectView from '@/views/ProjectView.vue';
import TasksView from '@/views/TasksView.vue';
import TodayView from '@/views/TodayView.vue';

const routes = [
  {
    path: '/',
    name: 'about',
    component: HomeView,
  },
  {
    path: '/tasks',
    redirect: { path: '/tasks/project/inbox' },
    name: 'tasks',
    components: { default: TasksView, sidebar: TasksSidebar },
    children: [
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
    components: { default: NotesView, sidebar: NotesSidebar },
    children: [
      {
        path: 'list',
        name: 'noteList',
        component: NotesList,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
];

export default routes;
