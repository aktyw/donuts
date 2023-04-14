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
import { storeToRefs } from 'pinia';

import { useNotesStore } from '@/stores/NotesStore';

const store = useNotesStore();
const { getAllNotes: notes } = storeToRefs(store);
</script>
