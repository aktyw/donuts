<template>
  <div
    class="card w-64 h-64 max-h-64 max-w-64 shadow-xl bg-primary text-primary-content [&>aside]:invisible [&>aside]:hover:visible transition">
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <div v-html="content"></div>
    </div>
    <NoteCardOptions @delete-note="showConfirmDeleteModal" />
    <slot />
  </div>
  <Teleport to="body">
    <ModalConfirmDelete
      v-if="deleteConfirm"
      :is-danger="true"
      @cancel="cancelDeleteNote"
      @action="handleDeleteNote">
      Delete note
      <template #content>
        <p>
          Do you really want to delete note
          <span class="break-words font-bold">{{ title }}</span>
          ?
        </p>
      </template>
    </ModalConfirmDelete>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import ModalConfirmDelete from '@/components/modals/ModalConfirmDelete.vue';
import NoteCardOptions from '@/components/notes/NoteCardOptions.vue';
import { useNotesStore } from '@/stores/NotesStore';

const notesStore = useNotesStore();
const deleteConfirm = ref(false);

type Props = {
  uid: string;
  title: string;
  content: string;
};

const props = defineProps<Props>();

function handleDeleteNote(): void {
  notesStore.deleteNote(props.uid);
  deleteConfirm.value = false;
}

function cancelDeleteNote(): void {
  deleteConfirm.value = false;
}

function showConfirmDeleteModal(): void {
  deleteConfirm.value = true;
}
</script>
