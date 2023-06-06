<template>
  <aside class="flex px-8 py-4 gap-2 justify-end">
    <BaseButton>
      <template #icon>
        <IconTheme class="text-primary-content transition" />
      </template>
    </BaseButton>
    <BaseButton @click="handleDeleteNote">
      <template #icon>
        <IconRecycleBin class="text-primary-content hover:!fill-error transition" />
      </template>
    </BaseButton>
  </aside>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import IconRecycleBin from '@/components/icons/IconRecycleBin.vue';
import IconTheme from '@/components/icons/IconTheme.vue';

const emit = defineEmits<{
  (e: 'deleteNote'): void;
}>();

function handleDeleteNote(): void {
  emit('deleteNote');
}
</script>
