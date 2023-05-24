<template>
  <form
    id="form"
    class="relative my-1.5 w-full rounded-lg border px-4 focus-within:border-accent-content">
    <div class="py-3">
      <TaskEditorInput
        ref="taskTitleInput"
        v-model.trim="taskTitle"
        v-focus
        maxlength="100"
        placeholder="Task name"
        class="font-semibold">
      </TaskEditorInput>
      <TaskEditorInput
        ref="taskDescriptionInput"
        v-model.trim="taskDescription"
        maxlength="240"
        placeholder="Description">
      </TaskEditorInput>

      <div class="flex justify-end pt-2">
        <ButtonSecondaryAction @click.prevent="closeEditor">Cancel</ButtonSecondaryAction>
        <ButtonMainAction
          :disabled="!taskTitle"
          @click.prevent="handleUpdateTask"
          >Save</ButtonMainAction
        >
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';

import TaskEditorInput from '@/components/tasks/editor/TaskEditorInput.vue';
import ButtonMainAction from '@/components/ui/buttons/ButtonMainAction.vue';
import ButtonSecondaryAction from '@/components/ui/buttons/ButtonSecondaryAction.vue';
import { vFocus } from '@/directives/vAutoFocus';
import type { Task } from '@/types/models/Task';

type Props = {
  title?: string;
  description?: string;
};

const emit = defineEmits<{
  (e: 'closeEditor'): void;
  (e: 'updateTask', content: Partial<Task>): void;
}>();

const props = defineProps<Props>();
const taskTitle = ref(props.title || '');
const taskDescription = ref(props.description || '');
const taskTitleInput: Ref<InstanceType<typeof HTMLInputElement> | null> = ref(null);
const taskDescriptionInput: Ref<HTMLInputElement | null> = ref(null);

function handleUpdateTask(): void {
  const content = {
    title: taskTitle.value,
    description: taskDescription.value,
  };

  emit('updateTask', content);
}

function closeEditor(): void {
  emit('closeEditor');
}
</script>
