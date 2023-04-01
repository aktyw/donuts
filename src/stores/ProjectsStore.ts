import { COLORS } from '@/types/models/Colors';
import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [
      { name: 'Inbox', id: 'inbox', color: COLORS.WHITE, active: true },
      { name: 'Test 1', id: nanoid(), color: COLORS.RED, active: true },
      {
        name: 'Test 2',
        id: nanoid(),
        color: COLORS.RED,
        active: true,
      },
    ],
  }),
  getters: {
    getAllProjects(state) {
      return state.projects;
    },
  },
  actions: {},
});
