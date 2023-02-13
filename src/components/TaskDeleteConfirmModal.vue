<template>
  <div class="modal modal-bottom sm:modal-middle modal-open" role="dialog">
    <div class="modal-box" ref="target">
      <h3 class="font-semibold text-lg text-center py-2">{{ title }}</h3>
      <slot name="content" />

      <div class="modal-action gap-1">
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
const props = defineProps(['title']);
const target = ref();

useFocusTrap(target, {
  immediate: true,
});
</script>
