<template>
  <div class="h-full w-96 flex-col">
    <header>{{ title }}</header>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import SidebarButton from './SidebarButton.vue';

type Props = {
  title: string;
};

defineProps<Props>();
</script>
