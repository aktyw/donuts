<template>
  <header v-bind="$attrs">
    <slot>{{ name }}</slot>
    <slot name="content" />
  </header>
</template>

<script setup lang="ts">
type Props = {
  name: string;
};

defineProps<Props>();
</script>
