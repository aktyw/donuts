<template>
  <FadeTransitionMedium>
    <BaseModal
      modal-title="Move project"
      close-title="Cancel"
      @close-editor="closeEditor">
      <div class="w-full">
        <ProjectList
          v-model="selectedProject"
          :current-project="currentProject"
          class="w-full max-w-[28rem] md:max-w-[48rem] lg:max-w-[60rem] !select-md" />
        <InfoContainer
          v-if="!!selectedProject && currentProject?.id !== selectedProject.id"
          class="bg-base-200 my-4 px-2 [&>span]:font-bold">
          <p>
            <strong>"{{ task.title.slice(0, 16) }}"</strong>
            move from
            <strong>"{{ currentProject?.name }}"</strong>
            to
            <strong>"{{ selectedProject?.name }}"</strong>
          </p>
        </InfoContainer>
      </div>
      <template #action>
        <ModalButton
          :disabled="currentProject?.id === selectedProject?.id"
          @click.prevent="handleMoveTask">
          Accept
        </ModalButton>
      </template>
    </BaseModal>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import BaseModal from '@/components/base/BaseModal.vue';
import ModalButton from '@/components/modals/ModalButton.vue';
import ProjectList from '@/components/projects/ProjectList.vue';
import InfoContainer from '@/components/ui/containers/InfoContainer.vue';
import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';
import { useSettingsStore } from '@/stores/SettingsStore';
import { useTasksStore } from '@/stores/TasksStore';
import type { Project } from '@/types/models/Projects';
import type { Task } from '@/types/models/Task';

onMounted(() => {
  settingsStore.setModal({ modal: 'moveProject', value: true });
});

onUnmounted(() => {
  settingsStore.setModal({ modal: 'moveProject', value: false });
});

type Props = {
  currentProject?: Project;
  task: Task;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'closeEditor'): void;
}>();

const router = useRouter();
const store = useTasksStore();
const settingsStore = useSettingsStore();

const selectedProject = ref(props.currentProject);
const target = ref();

function handleMoveTask(): void {
  store.moveTask(props.task.id, selectedProject.value!.id);

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
