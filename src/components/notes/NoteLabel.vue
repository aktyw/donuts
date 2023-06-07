<template>
  <div class="flex items-center btn btn-xs gap-1">
    <BaseLabel
      class="text-xs font-medium !mb-0 cursor-pointer"
      @click="showNoteModal = true">
      {{ note.title }}
    </BaseLabel>

    <BaseButton
      class="hover:bg-base-100 relative -right-1 rounded-md"
      @click.stop="handleDeleteNoteFromTask">
      <template #icon>
        <IconCloseSmall />
      </template>
    </BaseButton>
  </div>
  <NoteModal
    v-if="showNoteModal"
    :title="note.title"
    :content="note.content"
    @close-editor="showNoteModal = false">
    Delete note
    <template #content>
      <p>
        Do you really want to delete note
        <span class="break-words font-bold">{{ note.title }}</span>
        ?
      </p>
    </template>
  </NoteModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseButton from '@/components/base/BaseButton.vue';
import BaseLabel from '@/components/base/BaseLabel.vue';
import IconCloseSmall from '@/components/icons/IconCloseSmall.vue';
import NoteModal from '@/components/notes/NoteModal.vue';
import type { Note } from '@/stores/NotesStore';

const showNoteModal = ref(false);

type Props = {
  note: Note;
};

defineProps<Props>();
const emit = defineEmits<{
  (e: 'deleteNoteFromTask'): void;
}>();

function handleDeleteNoteFromTask(): void {
  emit('deleteNoteFromTask');
}
</script>
