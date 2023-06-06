<template>
  <NotesContainer>
    <div class="flex gap-4">
      <NoteEditorOptions @save-note="handleSaveNote" />
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
      @ready="isEditorReady = true" />
  </NotesContainer>
</template>

<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { QuillEditor } from '@vueup/vue-quill';
import { ref } from 'vue';

import TheNotification from '@/components/layouts/TheNotification.vue';
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
</script>
