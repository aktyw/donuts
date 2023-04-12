<template>
  <div
    class="collapse overflow-visible"
    :class="{ 'collapse-open overflow-visible': isOpenProjectList }">
    <div class="collapse-title flex justify-between items-center hover:bg-base-300 rounded-lg p-0.5 min-h-0">
      <h2 class="w-full">
        <RouterLink
          class="block px-4 py-1 text-left text-base font-normal w-full h-full"
          :to="{ name: 'projects' }">
          <template #default> Projects </template>
        </RouterLink>
      </h2>
      <div class="flex">
        <TheTooltip
          class="!tooltip-top"
          data="Add project">
          <template #default>
            <ProjectAddButton
              class="hover:bg-base-300 h-full p-1 border-none"
              @click.prevent="handleProjectEditor">
            </ProjectAddButton>
          </template>
        </TheTooltip>
        <TheTooltip
          class="!tooltip-top"
          data="Toggle list of projects">
          <template #default>
            <BaseButton
              class="flex h-full items-center justify-center p-1"
              @click="toggleProjectList">
              <template #icon>
                <IconChevronDown
                  class="transition fill-base-content"
                  :class="{ 'rotate-90': !isOpenProjectList }" />
              </template>
            </BaseButton>
          </template>
        </TheTooltip>
      </div>
    </div>

    <ul
      class="collapse-content p-0 overflow-hidden"
      :class="{ 'overflow-visible': isOpenProjectList }">
      <slot name="project-links"></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProjectAddButton from '@/components/projects/ProjectAddButton.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';

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
