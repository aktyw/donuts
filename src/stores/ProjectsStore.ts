import { useStorage } from '@vueuse/core';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { defineStore, storeToRefs } from 'pinia';
import { useCollection } from 'vuefire';

import { useNotification } from '@/composables/useNotification';
import { db } from '@/firebase/config';
import { findIndex } from '@/helpers/findIndex';
import { findItem } from '@/helpers/findItem';
import { useTasksStore } from '@/stores/TasksStore';
import type { HasId } from '@/types/models/HasId';
import { NotificationMessage } from '@/types/models/Notification';
import type { Project } from '@/types/models/Projects';

type PartialProject = Omit<Project, 'active'>;

const inbox: Project = Object.freeze({ name: 'Inbox', id: 'inbox', color: '#000000', active: true, favorite: false });

const isNotInbox = (p: HasId): boolean => p.id !== 'inbox';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: useStorage('projects', [inbox]),
  }),
  getters: {
    getAllProjects(state) {
      return state.projects;
    },
    getAllActiveProjects(state) {
      return state.projects.filter((p) => p.active);
    },
    getActiveProjects(state) {
      return state.projects.filter((p) => p.active && isNotInbox(p));
    },
    getArchiveProjects(state) {
      return state.projects.filter((p) => !p.active && isNotInbox(p));
    },
    getProjects(state) {
      return state.projects.filter((p) => isNotInbox(p));
    },
    getFavoriteProjects(state) {
      return state.projects.filter((p) => p.favorite);
    },
    getActiveFavoriteProjects(state) {
      return state.projects.filter((p) => p.favorite && p.active);
    },
    getProjectById(state): (id: string) => Project | undefined {
      return (id) => {
        return state.projects.find((p) => p.id === id);
      };
    },
  },
  actions: {
    async addProject({ name, color, id, favorite }: PartialProject) {
      const project = {
        name,
        color,
        id,
        active: true,
        favorite,
      };

      await setDoc(doc(db, 'projects', id), project);

      this.projects.push(project);

      useNotification(NotificationMessage.AddProject);
    },
    async deleteProject(id: string) {
      const project = findItem(id, this.projects);
      const docRef = doc(db, 'projects', id);

      await deleteDoc(docRef);
      this.projects = this.projects.filter((p) => p !== project);

      useNotification(NotificationMessage.DeleteProject);
    },
    archiveProject(id: string) {
      const projectIdx = findIndex(id, this.projects);

      this.projects[projectIdx]['active'] = false;

      useNotification(NotificationMessage.ArchiveProject);
    },
    activateProject(id: string) {
      const projectIdx = findIndex(id, this.projects);

      this.projects[projectIdx]['active'] = true;

      useNotification(NotificationMessage.ActivateProject);
    },
    updateProject(update: PartialProject) {
      const { id } = update;

      if (this.projects.find((p) => p.id === id) === this.projects[0]) {
        throw new Error('Cannot update project');
      }

      const projectIndex = this.projects.findIndex((p) => p.id === id);

      if (projectIndex !== -1) {
        this.projects[projectIndex] = { ...this.projects[projectIndex], ...update };
      }

      useNotification(NotificationMessage.UpdateProject);
    },
    toggleFavoriteStatus(id: string) {
      const projectIdx = findIndex(id, this.projects);

      this.projects[projectIdx]['favorite'] = !this.projects[projectIdx]['favorite'];
    },
    duplicateProject(id: string) {
      const project = findItem(id, this.projects);
      const copyProject = JSON.parse(JSON.stringify(project));
      const newId = nanoid();

      copyProject.id = newId;
      copyProject.name = `Copy of ${project.name}`;
      const projectIdx = findIndex(id, this.projects);

      const projectStarts = this.projects.slice(0, projectIdx + 1);
      const projectEnds = this.projects.slice(projectIdx + 1);

      this.projects = [...projectStarts, copyProject, ...projectEnds];

      const taskStore = useTasksStore();
      const { getRootProjectTasks } = storeToRefs(taskStore);
      const tasks = getRootProjectTasks.value(id);

      tasks.forEach(({ id }: { id: string }) => taskStore.duplicateTask(id, copyProject.id));

      useNotification(NotificationMessage.DuplicateProject);
      this.router.push({ name: 'project', params: { id: copyProject.id } });
    },
  },
});
