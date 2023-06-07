<template>
  <NotesContainer v-if="notes.length > 0">
    <draggable
      :list="notes"
      :delay="100"
      :delay-on-touch-only="true"
      item-key="name"
      class="list-group flex gap-2 justify-start flex-wrap"
      ghost-class="ghost"
      @start="dragging = true"
      @end="handleDragEnd">
      <template #item="{ element }">
        <NoteCard
          :uid="element.id"
          class="list-group-item"
          :title="element.title"
          :content="element.content" />
      </template>
    </draggable>
  </NotesContainer>
  <NotesContainer
    v-else
    class="flex items-center justify-center">
    <div class="flex flex-col gap-8 text-center">
      <span class="flex justify-center">
        <donutNotes class="pointer-events-none w-[200px] sm:w-[240px] pb-6" />
      </span>
      <h2 class="text-2xl font-semibold text-primary underline">
        <router-link :to="{ name: 'noteEditor' }">List is empty. Add your first note</router-link>
      </h2>
    </div>
  </NotesContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import draggable from 'vuedraggable';

import donutNotes from '@/assets/illustrations/donutNotes.vue';
import NoteCard from '@/components/notes/NoteCard.vue';
import NotesContainer from '@/components/ui/containers/NotesContainer.vue';
import { useNotification } from '@/composables/useNotification';
import { useNotesStore } from '@/stores/NotesStore';
import { NotificationMessage } from '@/types/models/Notification';

const dragging = ref(false);
const store = useNotesStore();
const { getAllNotes: notes } = storeToRefs(store);

function handleDragEnd(): void {
  dragging.value = false;
  useNotification(NotificationMessage.ChangeOrder);
}
</script>
