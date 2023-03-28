import { COLORS } from '@/types/models/Colors';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [{ name: 'Inbox', id: uuid(), color: COLORS.WHITE, active: true }],
  }),
  getters: {},
  actions: {},
});
