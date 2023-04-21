<template>
  <div class="flex justify-between items-center w-full border border-base-300 rounded-md bg-base-200 py-2 px-3">
    <div class="flex gap-2">
      <IconArchive />
      <p>This project is archived</p>
    </div>
    <BaseButton
      class="bg-accent hover:bg-accent-focus transition-colors duration-300 font-semibold text-sm py-1.5 px-2.5 rounded-lg text-base-100"
      @click="handleUnarchiveProject">
      Unarchive project
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import IconArchive from '@/components/icons/IconArchive.vue';
import { useNotification } from '@/composables/useNotification';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { NotificationMessage } from '@/types/models/NotificationMessage';

type Props = {
  id: string;
};
const props = defineProps<Props>();
const projectsStore = useProjectsStore();

function handleUnarchiveProject(): void {
  projectsStore.activateProject(props.id);
  useNotification(NotificationMessage.ActivateProject);
}
</script>
