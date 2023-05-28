<template>
  <div
    class="flex flex-col gap-4 justify-center items-center z-[5000] fixed bg-base-200 text-base-content w-full h-full">
    <div class="text-base-content text-xl font-bold">Loading Donuts</div>
    <BaseLoader />
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/base/BaseLoader.vue';
</script>
