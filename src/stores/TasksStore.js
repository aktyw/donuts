import { defineStore } from 'pinia';

export const useTasksStore = defineStore('tasks', {
  state: () => {
    return {
      tasks: [
        {
          id: 'id1',
          content: 'lorem ipsum',
        },
      ],
    };
  },
  getters: {},
  actions: {},
});
