import { COLORS } from '@/types/models/Colors';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [
      { name: 'Inbox', id: 'inbox', color: COLORS.WHITE, active: true },
      { name: 'Test 1', id: uuid(), color: COLORS.BLACK, active: true },
      {
        name: 'Test 2',
        id: uuid(),
        color: COLORS.BLACK,
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
