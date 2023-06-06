<template>
  <div
    class="card w-64 h-64 max-h-64 max-w-64 bg-zinc-900 shadow-xl [&>aside]:invisible [&>aside]:hover:visible transition">
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <div v-html="content"></div>
    </div>
    <NoteCardOptions @delete-note="handleDeleteNote" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import NoteCardOptions from '@/components/notes/NoteCardOptions.vue';
import { useNotesStore } from '@/stores/NotesStore';

const notesStore = useNotesStore();

type Props = {
  uid: string;
  title: string;
  content: string;
};

const props = defineProps<Props>();

function handleDeleteNote(): void {
  notesStore.deleteNote(props.uid);
}
</script>
