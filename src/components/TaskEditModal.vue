<template>
  <div class="modal modal-bottom sm:modal-middle modal-open" role="dialog">
    <div class="modal-box" ref="target">
      <h3 class="font-semibold text-lg text-center py-2">
        {{ title }}
      </h3>

      <input
        class="input input-bordered md:w-full w-80 mt-4"
        type="text"
        maxlength="100"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div class="modal-action gap-1">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

const props = defineProps(['modelValue', 'title']);
const emits = defineEmits(['update:modelValue']);

const target = ref();
useFocusTrap(target, {
  immediate: true,
});
</script>
