<template>
  <ul class="grid place-items-center">
    <li
      v-for="note in notes"
      :key="note.id">
      {{ note.content }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useNotesStore } from '@/stores/NotesStore';
import { storeToRefs } from 'pinia';

const store = useNotesStore();
const { getAllNotes: notes } = storeToRefs(store);
</script>
