<template>
  <div class="modal modal-bottom sm:modal-middle modal-open" role="dialog">
    <div class="modal-box">
      <h3 class="font-semibold text-lg text-center py-2">{{ title }}</h3>
      <slot name="content" />

      <div class="modal-action gap-1" v-focus>
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { vFocus } from '@/directives/vAutoFocus.js';
const props = defineProps(['title']);
</script>
