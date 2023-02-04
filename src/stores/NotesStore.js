import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
  state: () => {
    return {
      tasks: [
        {
          id: 'id1',
          content: 'lorem ipsum task',
          done: false,
        },
      ],
    };
  },
  getters: {},
  actions: {},
});
