import { useStorage } from '@vueuse/core';
import { nanoid } from 'nanoid';
import { defineStore, storeToRefs } from 'pinia';

import { findIndex } from '@/helpers/findIndex';
import { findItem } from '@/helpers/findItem';
import { useTasksStore } from '@/stores/TasksStore';
import type { HasId } from '@/types/models/HasId';
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
    addProject({ name, color, id, favorite }: PartialProject) {
      const project = {
        name,
        id,
        color,
        active: true,
        favorite,
      };

      this.projects.push(project);
    },
    deleteProject(id: string) {
      const project = findItem(id, this.projects);

      this.projects = this.projects.filter((p) => p !== project);
    },
    archiveProject(id: string) {
      const projectIdx = findIndex(id, this.projects);

      this.projects[projectIdx]['active'] = false;
    },
    activateProject(id: string) {
      const projectIdx = findIndex(id, this.projects);

      this.projects[projectIdx]['active'] = true;
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
      const { getProjectTasks } = storeToRefs(taskStore);
      const tasks = getProjectTasks.value(id);

      tasks.forEach(({ id }) => taskStore.duplicateTask(id, copyProject.id));
    },
  },
});
