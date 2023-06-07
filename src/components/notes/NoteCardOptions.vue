<template>
  <aside class="flex px-8 py-4 gap-2 justify-end">
    <ColorOptions @change-color="handleChangeNoteColor" />

    <BaseButton @click.stop="handleDeleteNote">
      <template #icon>
        <IconRecycleBin class="fill-primary-content hover:!fill-error transition" />
      </template>
    </BaseButton>
  </aside>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import IconRecycleBin from '@/components/icons/IconRecycleBin.vue';
import ColorOptions from '@/components/notes/ColorOptions.vue';
import { useNotesStore } from '@/stores/NotesStore';
import { type NOTES_COLORS_HEXES } from '@/types/models/Colors';

const notesStore = useNotesStore();

const emit = defineEmits<{
  (e: 'deleteNote'): void;
}>();

function handleDeleteNote(): void {
  emit('deleteNote');
}

type Props = {
  id: string;
};

const props = defineProps<Props>();

function handleChangeNoteColor(color: NOTES_COLORS_HEXES): void {
  notesStore.updateColor(props.id, color);
}
</script>
