<template>
  <BaseButton class="dropdown dropdown-top sm:dropdown-bottom font-normal">
    Add note to current task
    <div
      tabindex="0"
      class="dropdown-content menu -ml-1.5 shadow bg-base-200 rounded-md text-base-content w-full z-20">
      <ul
        v-if="availableNotes.length > 0"
        class="flex flex-col overflow-y-auto max-h-80">
        <li
          v-for="note in availableNotes"
          :key="note.id">
          <BaseButton @click.stop="addNoteToTask(note.id)">
            <p>{{ note.title }}</p>
          </BaseButton>
        </li>
      </ul>

      <router-link
        v-else
        :to="{ name: 'noteEditor' }"
        class="link p-4 text-primary leading-4">
        List is empty. Create new note
      </router-link>
    </div>
  </BaseButton>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import BaseButton from '@/components/base/BaseButton.vue';
import { useNotesStore } from '@/stores/NotesStore';
import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';

type Props = {
  task: Task;
};

const props = defineProps<Props>();
const tasksStore = useTasksStore();

const notesStore = useNotesStore();

const notes = computed(() => notesStore.getAllNotes);
const availableNotes = computed(() => notes.value.filter((note) => !props.task?.noteId?.includes(note.id)));

function addNoteToTask(noteId: string): void {
  tasksStore.addNoteToTask(props.task, noteId);
}
</script>
