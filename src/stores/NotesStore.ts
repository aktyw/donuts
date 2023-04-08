import { defineStore } from 'pinia';
export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [
      {
        id: 'id1',
        content: 'lorem ipsum note',
      },
      {
        id: 'id2',
        content: 'lorem ipsum note 2',
      },
    ],
  }),
  getters: {
    getAllNotes(state) {
      return state.notes;
    },
  },
  actions: {},
});
