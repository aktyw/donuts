<template>
  <div
    class="collapse"
    :class="{ 'collapse-open overflow-visible': isOpenProjectList }">
    <div class="collapse-title flex text-xl font-medium hover:bg-base-300 rounded-lg p-0 min-h-0">
      <RouterLink
        class="block px-4 py-2 text-left text-lg font-normal w-full h-full"
        :to="{ name: 'projects' }">
        <template #default> Projects </template>
      </RouterLink>
      <ProjectAddButton
        class="hover:bg-base-300 h-full p-1 border-none"
        @click.prevent="handleProjectEditor">
      </ProjectAddButton>
      <BaseButton
        class="flex items-center justify-center p-1"
        @click="toggleProjectList">
        <template #icon>
          <IconChevronDown
            class="transition fill-base-content"
            :class="{ 'rotate-90': !isOpenProjectList }" />
        </template>
      </BaseButton>
    </div>

    <div class="collapse-content p-0 overflow-visible">
      <slot name="project-links"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProjectAddButton from '@/components/projects/ProjectAddButton.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';

const isOpenProjectList = ref(false);

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
