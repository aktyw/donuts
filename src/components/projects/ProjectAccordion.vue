<template>
  <div
    class="collapse overflow-visible"
    :class="{ 'collapse-open overflow-visible': isOpenProjectList }">
    <div class="collapse-title flex justify-between items-center hover:bg-base-300 rounded-lg p-0.5 min-h-0">
      <h2 class="w-full">
        <RouterLink
          v-if="routeName"
          class=""
          :class="style"
          :to="{ name: routeName }">
          {{ title }}
        </RouterLink>
        <span
          v-else
          :class="style">
          {{ title }}
        </span>
      </h2>
      <div class="flex">
        <ProjectAddButton
          v-if="routeName"
          class="hover:bg-base-300 h-full p-1 border-none"
          @click.prevent="handleProjectEditor">
        </ProjectAddButton>
        <ProjectsToggleButton
          :is-open="isOpenProjectList"
          @click="toggleProjectList">
        </ProjectsToggleButton>
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
import { computed, ref } from 'vue';

import ProjectAddButton from '@/components/projects/ProjectAddButton.vue';
import ProjectsToggleButton from '@/components/projects/toggle/ProjectsToggleButton.vue';

const style = computed(() => 'block px-4 py-1 text-left text-base font-normal w-full h-full outline-custom');
const isOpenProjectList = ref(false);

defineProps<{
  title: string;
  routeName?: string;
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
