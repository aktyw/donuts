<template>
  <BaseModal
    modal-title="Move project"
    @close-editor="closeEditor">
    <ProjectList
      v-model="selectedProject"
      :current-project="currentProject"
      class="w-full max-w-[40rem] !select-md" />
    <p
      v-show="!!selectedProject && currentProject?.id !== selectedProject.id"
      class="bg-base-200 rounded-md p-2 my-4 px-2 [&>span]:font-bold">
      <span>"{{ task.title.slice(0, 16) }}"</span> move from <span>"{{ currentProject?.name }}"</span><br />
      to
      <span>"{{ selectedProject?.name }}"</span>
    </p>
    <template #action>
      <ModalButton
        :disabled="currentProject?.id === selectedProject?.id"
        @click.prevent="handleMoveTask">
        Accept
      </ModalButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import ModalButton from '@/components/modals/ModalButton.vue';
import ProjectList from '@/components/projects/ProjectList.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import { useNotification } from '@/composables/useNotification';
import { useTasksStore } from '@/stores/TasksStore';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import type { Project } from '@/types/models/Projects';
import type { Task } from '@/types/models/Task';

const router = useRouter();

type Props = {
  currentProject?: Project;
  task: Task;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'closeEditor'): void;
}>();

const store = useTasksStore();
const selectedProject = ref(props.currentProject);
const target = ref();

function handleMoveTask(): void {
  store.moveTask(props.task.id, selectedProject.value!.id);
  useNotification(NotificationMessage.TaskMove);

  closeEditor();

  router.push({ name: 'project', params: { id: selectedProject.value!.id } });
}

function closeEditor(): void {
  emit('closeEditor');
}

useFocusTrap(target, {
  immediate: true,
});
</script>