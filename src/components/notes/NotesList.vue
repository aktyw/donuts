<template>
  <NotesContainer>
    <draggable
      :list="notes"
      item-key="name"
      class="list-group flex gap-2 justify-start flex-wrap"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false">
      <template #item="{ element }">
        <NoteCard
          :uid="element.id"
          class="list-group-item"
          :title="element.title"
          :content="element.content" />
      </template>
    </draggable>
  </NotesContainer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import draggable from 'vuedraggable';

import NoteCard from '@/components/notes/NoteCard.vue';
import NotesContainer from '@/components/ui/containers/NotesContainer.vue';
import { useNotesStore } from '@/stores/NotesStore';

const dragging = ref(false);
const store = useNotesStore();
const { getAllNotes: notes } = storeToRefs(store);
</script>
