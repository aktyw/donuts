<template>
  <div
    class="card w-64 h-64 max-h-64 max-w-64 shadow-xl [&>aside]:invisible [&>aside]:hover:visible transition cursor-pointer"
    :class="cardBackgroundStyle"
    @click="showNoteModal = true">
    <div class="card-body overflow-hidden">
      <h2 class="card-title">{{ title }}</h2>
      <div
        class="break-all"
        v-html="content"></div>
    </div>
    <NoteCardOptions
      :id="uid"
      @delete-note="showConfirmDeleteModal" />

    <slot />
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
    <Teleport to="body">
      <NoteModal
        v-if="showNoteModal"
        :title="props.title"
        :content="props.content"
        @close-editor="showNoteModal = false">
        Delete note
        <template #content>
          <p>
            Do you really want to delete note
            <span class="break-words font-bold">{{ title }}</span>
            ?
          </p>
        </template>
      </NoteModal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import ModalConfirmDelete from '@/components/modals/ModalConfirmDelete.vue';
import NoteCardOptions from '@/components/notes/NoteCardOptions.vue';
import NoteModal from '@/components/notes/NoteModal.vue';
import { useNotesStore } from '@/stores/NotesStore';

type Props = {
  uid: string;
  title: string;
  content: string;
};

const props = defineProps<Props>();

const notesStore = useNotesStore();

const deleteConfirm = ref(false);
const showNoteModal = ref(false);

const cardBackgroundHex = computed(() => notesStore.getNoteColor(props.uid));
const cardBackgroundStyle = computed(() => `bg-[${cardBackgroundHex.value}]`);

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
