<template>
  <div
    class="modal modal-bottom sm:modal-middle modal-open"
    role="dialog">
    <div
      ref="target"
      class="modal-box">
      <h3 class="font-semibold text-lg text-center py-2">
        {{ title }}
      </h3>

      <input
        class="input input-bordered md:w-full w-80 mt-4"
        type="text"
        maxlength="100"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
      <div class="modal-action gap-1">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

defineProps<{
  modelValue: string;
  title: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', payload: string): void;
}>();

const target = ref();

useFocusTrap(target, {
  immediate: true,
});
</script>
