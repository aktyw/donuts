<template>
  <header v-bind="$attrs">
    <div class="flex gap-4 items-center">
      <slot name="action"></slot>
      <slot>
        <h2>{{ name }}</h2>
      </slot>
    </div>
    <slot name="actionAlt" />
  </header>
</template>

<script setup lang="ts">
type Props = {
  name: string;
};

defineProps<Props>();
</script>
