<template>
  <FadeTransitionMedium>
    <div class="flex w-full items-center justify-between rounded-md border border-base-300 bg-base-200 px-3 py-2">
      <div class="flex gap-2">
        <IconArchive />
        <p>This project is archived</p>
      </div>
      <BaseButton
        class="rounded-lg bg-accent px-2.5 py-1.5 text-sm font-semibold text-base-100 transition-colors duration-300 hover:bg-accent-focus focus:bg-accent-focus"
        @click="handleUnarchiveProject">
        Unarchive project
      </BaseButton>
    </div>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import IconArchive from '@/components/icons/IconArchive.vue';
import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';
import { useProjectsStore } from '@/stores/ProjectsStore';

type Props = {
  id: string;
};
const props = defineProps<Props>();
const projectsStore = useProjectsStore();

function handleUnarchiveProject(): void {
  projectsStore.activateProject(props.id);
}
</script>
