import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

import { findItem } from '../helpers/findItem';

interface Note {
  id: string;
  title: string;
  content: string;
}

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: useStorage<Note[]>('notes', []),
  }),
  getters: {
    getAllNotes(state) {
      return state.notes;
    },
  },
  actions: {
    addNewNote(payload: Omit<Note, 'id'>): void {
      const note: Note = {
        id: uuid(),
        title: payload.title,
        content: payload.content,
      };

      this.notes.push(note);
    },
    deleteNote(id: string): void {
      const noteToDel: Note = findItem(id, this.notes);

      this.notes = this.notes.filter((note: Note) => note.id !== noteToDel.id);
    },
  },
});
