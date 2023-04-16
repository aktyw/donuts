<template>
  <div
    class="collapse overflow-visible"
    :class="{ 'collapse-open overflow-visible': isOpenProjectList }">
    <div class="collapse-title flex justify-between items-center hover:bg-base-300 rounded-lg p-0.5 min-h-0">
      <h2 class="w-full">
        <RouterLink
          class="block px-4 py-1 text-left text-base font-normal w-full h-full focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent"
          :to="{ name: 'projects' }">
          {{ title }}
        </RouterLink>
      </h2>
      <div class="flex">
        <ProjectAddButton
          class="hover:bg-base-300 h-full p-1 border-none"
          @click.prevent="handleProjectEditor">
        </ProjectAddButton>
        <TheTooltip
          class="!tooltip-top"
          data="Toggle list of projects">
          <ProjectsToggleButton
            :is-open="isOpenProjectList"
            @click="toggleProjectList"></ProjectsToggleButton>
        </TheTooltip>
      </div>
    </div>

    <ul
      class="collapse-content p-0 overflow-hidden [&>li>.router-link-exact-active]:bg-base-300"
      :class="{ 'overflow-visible': isOpenProjectList }">
      <slot name="project-links"></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import ProjectAddButton from '@/components/projects/ProjectAddButton.vue';
import ProjectsToggleButton from '@/components/projects/ProjectsToggleButton.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';

const isOpenProjectList = ref(false);

defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  (e: 'openProjectEditor'): void;
}>();

function handleProjectEditor(): void {
  emit('openProjectEditor');
}

function toggleProjectList(): void {
  isOpenProjectList.value = !isOpenProjectList.value;
}
</script>
