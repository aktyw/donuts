<template>
  <ul class="flex flex-wrap gap-2 py-2">
    <li
      v-for="(note, id) in notes"
      :key="id">
      <div>
        <NoteLabel
          :note="note"
          @delete-note-from-task="handleDeleteNoteFromTask(note.id)"></NoteLabel>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import NoteLabel from '@/components/notes/NoteLabel.vue';
import { useNotesStore } from '@/stores/NotesStore';
import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

const notesStore = useNotesStore();
const tasksStore = useTasksStore();

type Props = {
  labels: string[];
  task: Task;
};
const props = defineProps<Props>();

const notes = computed(() => {
  const allNotes = notesStore.getAllNotes;

  return allNotes.filter((note) => {
    return props.labels.includes(note.id);
  });
});

function handleDeleteNoteFromTask(noteId: string): void {
  tasksStore.deleteNoteFromTask(props.task, noteId);
}
</script>
