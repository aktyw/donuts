<template>
  <BaseButton class="btn-ghost btn-xs p-0 border border-base-300 rounded">
    <template #icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24">
        <path d="M11.5 18.5v-6h-6v-1h6v-6h1v6h6v1h-6v6Z" />
      </svg>
    </template>
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
</script>
