<template>
  <div class="modal modal-bottom sm:modal-middle modal-open" id="modal" role="dialog">
    <div class="modal-box">
      <h3 class="font-semibold text-lg text-center py-2">
        {{ title }}
      </h3>
      <input
        id="input"
        class="input input-bordered md:w-full w-80 mt-4"
        type="text"
        maxlength="100"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div class="modal-action gap-1" id="action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup>
import * as focusTrap from 'focus-trap';
const props = defineProps(['modelValue', 'title']);
const emits = defineEmits(['update:modelValue']);
const modal = document.querySelector('#modal');

const trap = focusTrap.createFocusTrap(['#input', '#action'], {
  onActivate: () => modal.classList.add('is-active'),
  onDeactivate: () => modal.classList.remove('is-active'),
});

</script>
