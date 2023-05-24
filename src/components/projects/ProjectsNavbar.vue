<template>
  <div class="flex w-full items-center justify-between">
    <ProjectsToggle />
    <ProjectAddButton
      class="mx-2 flex items-center gap-2 rounded-md border-none py-1 text-sm font-semibold hover:bg-base-200"
      @click="handleProjectEditor">
      Add project
    </ProjectAddButton>
  </div>
</template>

<script setup lang="ts">
import ProjectAddButton from '@/components/projects/ProjectAddButton.vue';
import ProjectsToggle from '@/components/projects/toggle/ProjectsToggle.vue';

const emit = defineEmits<{
  (e: 'openProjectEditor'): void;
}>();

function handleProjectEditor(): void {
  emit('openProjectEditor');
}
</script>
