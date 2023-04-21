<template>
  <form
    id="form"
    class="relative border w-full rounded-lg focus-within:border-accent-content my-1.5 px-4">
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
        <BaseButton
          class="btn btn-sm border-transparent mr-2 bg-base-200 hover:bg-base-300 text-neutral-focus"
          @click.prevent="closeEditor"
          >Cancel</BaseButton
        >
        <BaseButton
          class="btn btn-sm bg-accent border-transparent hover:bg-accent-focus text-neutral-content"
          :disabled="!taskTitle"
          @click.prevent="handleUpdateTask"
          >Save</BaseButton
        >
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';

import BaseButton from '@/components/base/BaseButton.vue';
import TaskEditorInput from '@/components/tasks/editor/TaskEditorInput.vue';
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
