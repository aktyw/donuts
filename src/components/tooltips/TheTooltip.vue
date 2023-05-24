<template>
  <component
    :is="is"
    class="tooltip tooltip-bottom after:hidden hover:before:delay-500 before:duration-200 after:duration-100 break-words"
    :class="{ 'tooltip-open': focused }"
    :data-tip="data"
    @focusin="focused = true"
    @focusout="focused = false"
    @click="focused = false">
    <slot />
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
