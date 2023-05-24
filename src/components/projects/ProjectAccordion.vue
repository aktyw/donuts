<template>
  <div
    class="collapse overflow-visible"
    :class="{ 'collapse-open overflow-visible': isOpenProjectList }">
    <div class="collapse-title flex min-h-0 items-center justify-between rounded-lg p-0.5 hover:bg-base-300">
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
          class="h-full border-none p-1 hover:bg-base-300"
          @click.prevent="handleProjectEditor">
        </ProjectAddButton>
        <ProjectsToggleButton
          :is-open="isOpenProjectList"
          @click="toggleProjectList">
        </ProjectsToggleButton>
      </div>
    </div>

    <ul
      class="collapse-content overflow-hidden p-0 [&>li>.router-link-exact-active]:bg-base-300"
      :class="{ 'overflow-visible': isOpenProjectList }">
      <slot name="project-links"></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import ProjectAddButton from '@/components/projects/ProjectAddButton.vue';
import ProjectsToggleButton from '@/components/projects/toggle/ProjectsToggleButton.vue';

const style = computed(
  () =>
    'block px-4 py-1 text-left text-base font-normal w-full h-full focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent'
);
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
