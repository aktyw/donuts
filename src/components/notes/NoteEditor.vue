<template>
  <NotesContainer>
    <div class="flex gap-4">
      <NoteEditorOptions
        @copy-to-clipboard="handleCopyToClipboard"
        @save-note="handleSaveNote" />
      <NoteTitle
        v-model="title"
        :title="title" />
    </div>
    <QuillEditor
      ref="editor"
      v-model:content="content"
      content-type="html"
      class="!max-w-80"
      theme="snow"
      toolbar="full"
      @ready="isEditorReady = true"></QuillEditor>
  </NotesContainer>
</template>

<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { QuillEditor } from '@vueup/vue-quill';
import { useClipboard } from '@vueuse/core';
import { ref } from 'vue';

import NoteEditorOptions from '@/components/notes/NoteEditorOptions.vue';
import NoteTitle from '@/components/notes/NoteTitle.vue';
import NotesContainer from '@/components/ui/containers/NotesContainer.vue';
import { useNotification } from '@/composables/useNotification';
import { useNotesStore } from '@/stores/NotesStore';
import { NotificationMessage } from '@/types/models/Notification';

const notesStore = useNotesStore();

const editor = ref();
const isEditorReady = ref(false);

const content = ref('');
const title = ref('Untitled');

const { copy } = useClipboard({ content });

function handleSaveNote(): void {
  if (!content.value) return;

  const note = {
    title: title.value,
    content: content.value,
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
</script>
