<template>
  <ul class="flex items-center flex-col">
    <li
      v-for="note in notes"
      :key="note.id">
      <NoteCard
        :title="note.title"
        :content="note.content" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import NoteCard from '@/components/notes/NoteCard.vue';
import { useNotesStore } from '@/stores/NotesStore';

const store = useNotesStore();
const { getAllNotes: notes } = storeToRefs(store);
</script>
