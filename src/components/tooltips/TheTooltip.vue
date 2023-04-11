<template>
  <div
    class="tooltip tooltip-bottom after:hidden before:duration-100 after:duration-100"
    :class="{ 'tooltip-open': focused }"
    :data-tip="data"
    @focusin="focused = true"
    @focusout="focused = false"
    @click="focused = false">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const focused = ref(false);

type Props = {
  data: string;
};
defineProps<Props>();
</script>
