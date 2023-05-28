<template>
  <div class="fixed bottom-0 right-0 flex w-full justify-end border-t-2 border-base-300 bg-base-200 p-4">
    <ButtonSecondaryAction
      class="!bg-base-300"
      @click="cancel">
      Cancel
    </ButtonSecondaryAction>
    <ButtonMainAction
      :disabled="!isSaveBtnActive"
      class="text-sm"
      @click="save">
      {{ saveTitle ? saveTitle : 'Save' }}
    </ButtonMainAction>
  </div>
</template>

<script setup lang="ts">
import ButtonMainAction from '@/components/ui/buttons/ButtonMainAction.vue';
import ButtonSecondaryAction from '@/components/ui/buttons/ButtonSecondaryAction.vue';

type Props = {
  isSaveBtnActive: boolean;
  saveTitle?: string;
};

defineProps<Props>();

const emit = defineEmits(['cancel', 'save']);

function cancel() {
  emit('cancel');
}

function save() {
  emit('save');
}
</script>
