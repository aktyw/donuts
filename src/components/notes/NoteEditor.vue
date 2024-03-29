<template>
  <NotesContainer>
    <div class="flex sm:gap-4 flex-col sm:flex-row justify-between sm:items-center">
      <NoteTitle
        v-model="title"
        :title="title" />
      <div class="flex flex-col sm:flex-row gap-4 !static">
        <ColorOptions
          class="btn btn-sm z-20 !transition-none !no-animation"
          :class="currentColorStyle"
          @change-color="handleChangeCurrentColor" />
        <NoteEditorOptions
          @copy-to-clipboard="handleCopyToClipboard"
          @save-note="handleSaveNote" />
      </div>
    </div>

    <QuillEditor
      ref="editor"
      v-model:content="content"
      content-type="html"
      class="w-full"
      theme="snow"
      toolbar="essential"
      @ready="isEditorReady = true" />
  </NotesContainer>
</template>

<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { QuillEditor } from '@vueup/vue-quill';
import { useClipboard } from '@vueuse/core';
import { computed, ref } from 'vue';

import ColorOptions from '@/components/notes/ColorOptions.vue';
import NoteEditorOptions from '@/components/notes/NoteEditorOptions.vue';
import NoteTitle from '@/components/notes/NoteTitle.vue';
import NotesContainer from '@/components/ui/containers/NotesContainer.vue';
import { useNotification } from '@/composables/useNotification';
import blurElement from '@/helpers/blur';
import { useNotesStore } from '@/stores/NotesStore';
import { NOTES_COLORS, type NOTES_COLORS_HEXES } from '@/types/models/Colors';
import { NotificationMessage } from '@/types/models/Notification';

const notesStore = useNotesStore();

const editor = ref();
const isEditorReady = ref(false);

const content = ref('');
const title = ref('Untitled');

const currentColor = ref<NOTES_COLORS_HEXES>(NOTES_COLORS[4].hex);
const currentColorStyle = computed(() => `bg-[${currentColor.value}] active:bg-[${currentColor.value}] `);

const { copy } = useClipboard();

function handleSaveNote(): void {
  if (!content.value) return;

  const note = {
    title: title.value,
    content: content.value,
    color: currentColor.value || NOTES_COLORS[4].hex,
  };

  notesStore.addNewNote(note);

  clearEditor();
  useNotification(NotificationMessage.NoteAdd);
}

function clearEditor(): void {
  editor.value.setContents('', 'silent');
  title.value = 'Untitled';
}

function handleCopyToClipboard(): void {
  copy(editor.value.getText());
  useNotification(NotificationMessage.NoteContent);
}

function handleChangeCurrentColor(color: NOTES_COLORS_HEXES): void {
  currentColor.value = color;
  blurElement();
}
</script>
