<template>
  <h1 class="text-center text-5xl font-bold md:pb-6 md:text-6xl">
    {{ title }} to <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Donuts!</span>
  </h1>
</template>

<script setup lang="ts">
type Props = {
  title: string;
};
defineProps<Props>();
</script>
