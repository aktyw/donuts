<template>
  <header v-bind="$attrs">
    <slot
      ><h2>{{ name }}</h2>
    </slot>
    <slot name="content" />
  </header>
</template>

<script setup lang="ts">
type Props = {
  name: string;
};

defineProps<Props>();
</script>
