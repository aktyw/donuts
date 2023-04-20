<template>
  <div class="flex items-center justify-between w-full">
    <ProjectsToggle />
    <ProjectAddButton
      class="hover:bg-base-200 rounded-md mx-2 py-1 flex items-center text-sm font-semibold border-none gap-2"
      @click="handleProjectEditor">
      Add project
    </ProjectAddButton>
  </div>
</template>

<script setup lang="ts">
import ProjectAddButton from '@/components/projects/ProjectAddButton.vue';
import ProjectsToggle from '@/components/projects/ProjectsToggle.vue';

const emit = defineEmits<{
  (e: 'openProjectEditor'): void;
}>();

function handleProjectEditor(): void {
  emit('openProjectEditor');
}
</script>
