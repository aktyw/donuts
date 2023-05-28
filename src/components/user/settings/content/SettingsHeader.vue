<template>
  <header v-bind="$attrs">
    <div class="flex">
      <slot name="action" />
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
