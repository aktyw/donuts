<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ content.slice(0, 100) }}</p>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string;
  content: string;
};

defineProps<Props>();
</script>
