import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';
import { useStorage } from '@vueuse/core';
import type { Projects } from '@/types/models/Projects';

const inbox: Projects = Object.freeze({ name: 'Inbox', id: 'inbox', color: '#000000', active: true });

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: useStorage('projects', [inbox]),
  }),
  getters: {
    getAllProjects(state) {
      return state.projects;
    },
    getProjectById(state): (id: string) => Projects | undefined {
      return (id) => {
        return state.projects.find((p) => p.id === id);
      };
    },
  },
  actions: {
    addProject({ name, color }: Projects) {
      const project = {
        name,
        id: nanoid(),
        color,
        active: true,
      };

      this.projects.push(project);
    },
    deleteProject(id: string) {
      if (this.projects.find((p) => p.id === id) === this.projects[0]) {
        throw new Error('Cannot delete Inbox');
      }

      this.projects = this.projects.filter((p) => p.id !== id);
    },
    updateProject(id: string, update: Partial<Projects>) {
      if (this.projects.find((p) => p.id === id) === this.projects[0]) {
        throw new Error('Cannot update Inbox');
      }

      const projectIndex = this.projects.findIndex((p) => p.id === id);

      if (projectIndex !== -1) {
        this.projects[projectIndex] = { ...this.projects[projectIndex], ...update };
      }
    },
  },
});
