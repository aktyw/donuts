<template>
  <div
    class="collapse overflow-visible"
    :class="{ 'collapse-open overflow-visible': isProjectOpen }">
    <div class="collapse-title flex h-10 min-h-0 items-center justify-between rounded-lg p-0.5 hover:bg-base-300">
      <h2>
        <RouterLink
          v-if="routeName"
          :to="{ name: routeName }"
          :class="style">
          <span>
            {{ title }}
          </span>
        </RouterLink>
        <div
          v-else
          :class="style">
          <span>
            {{ title }}
          </span>
        </div>
      </h2>
      <div class="flex">
        <ProjectAddButton
          v-if="routeName"
          class="m-1 h-full border-none hover:bg-base-300"
          @click.prevent="handleProjectEditor" />
        <ProjectsToggleButton
          :is-open="isProjectOpen"
          @click="setProjectListToggle" />
      </div>
    </div>

    <ul
      class="collapse-content overflow-hidden p-0 [&>li>.router-link-active]:bg-base-300"
      :class="{ 'overflow-visible': isProjectOpen }">
      <slot name="project-links" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ProjectAddButton from '@/components/projects/ProjectAddButton.vue';
import ProjectsToggleButton from '@/components/projects/toggle/ProjectsToggleButton.vue';

const style = computed(() => 'px-4 text-left text-base font-normal w-full h-full outline-custom');

const props = defineProps<{
  title: string;
  routeName?: string;
  isProjectOpen: boolean;
  id: 'favorites' | 'projects';
}>();

const emit = defineEmits<{
  (e: 'openProjectEditor'): void;
  (e: 'setProjectListToggle', payload: { id: 'favorites' | 'projects'; currentValue: boolean }): void;
}>();

function handleProjectEditor(): void {
  emit('openProjectEditor');
}

function setProjectListToggle(): void {
  emit('setProjectListToggle', { id: props.id, currentValue: props.isProjectOpen });
}
</script>
