import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

import { type NOTES_COLORS_HEXES } from '@/types/models/Colors';

import { findItem } from '../helpers/findItem';

interface Note {
  id: string;
  title: string;
  content: string;
  color: NOTES_COLORS_HEXES;
}

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: useStorage<Note[]>('notes', []),
  }),
  getters: {
    getAllNotes(state) {
      return state.notes;
    },
    getNoteColor(state) {
      return (id: string) => {
        const note = findItem(id, state.notes);

        return note.color;
      };
    },
  },
  actions: {
    addNewNote(payload: Omit<Note, 'id'>): void {
      const note: Note = {
        id: uuid(),
        title: payload.title,
        content: payload.content,
        color: payload.color,
      };

      this.notes.push(note);
    },
    deleteNote(id: string): void {
      const noteToDel: Note = findItem(id, this.notes);

      this.notes = this.notes.filter((note: Note) => note.id !== noteToDel.id);
    },
    updateNote(prop: 'title' | 'content', id: string, value: string) {
      const noteToUpdate: Note = findItem(id, this.notes);

      noteToUpdate[prop] = value;
    },
    updateColor(id: string, color: NOTES_COLORS_HEXES) {
      const noteToUpdate: Note = findItem(id, this.notes);

      noteToUpdate.color = color;
    },
  },
});
