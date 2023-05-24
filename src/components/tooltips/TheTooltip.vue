<template>
  <component
    :is="is"
    class="tooltip tooltip-bottom break-words before:duration-200 after:hidden after:duration-100 hover:before:delay-500"
    :class="{ 'tooltip-open': focused }"
    :data-tip="data"
    @focusin="focused = true"
    @focusout="focused = false"
    @click="focused = false">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const focused = ref(false);

type Props = {
  data: string;
  is?: string;
};

withDefaults(defineProps<Props>(), {
  is: 'div',
});
</script>
