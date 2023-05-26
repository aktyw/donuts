<template>
  <h1 class="text-5xl md:text-6xl font-bold text-center md:pb-6">
    {{ title }} to
    <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Donuts!</span>
  </h1>
</template>

<script setup lang="ts">
type Props = {
  title: string;
};
defineProps<Props>();
</script>
