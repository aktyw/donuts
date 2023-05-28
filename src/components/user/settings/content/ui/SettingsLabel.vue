<template>
  <label class="label font-semibold px-0 py-1.5">
    <slot>
      <span class="label-text">{{ title }}</span>
    </slot>
  </label>
</template>

<script setup lang="ts">
type Props = {
  title: string;
};

defineProps<Props>();
</script>
