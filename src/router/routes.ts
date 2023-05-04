import NotesList from '@/components/notes/NotesList.vue';
import NotesSidebar from '@/components/notes/NotesSidebar.vue';
import TasksSidebar from '@/components/sidebars/TasksSidebar.vue';
import TaskModal from '@/components/tasks/modal/TaskModal.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import NotesView from '@/views/NotesView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
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
        children: [
          {
            path: 'task/:taskid',
            name: 'taskToday',
            component: TaskModal,
            props: true,
          },
        ],
      },
      {
        path: 'project/:id',
        name: 'project',
        component: ProjectView,
        children: [
          {
            path: 'task/:taskid',
            name: 'task',
            component: TaskModal,
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
    components: { default: ProjectsView, sidebar: TasksSidebar },
    children: [
      {
        path: 'active',
        name: 'active',
        component: ProjectsView,
      },
      {
        path: 'archived',
        name: 'archived',
        component: ProjectsView,
      },
    ],
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
  { path: '/:catchAll(.*)', name: '404', component: NotFoundView },
];

export default routes;
