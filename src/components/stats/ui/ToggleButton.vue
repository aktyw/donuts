<template>
  <BaseButton class="rounded-3xl bg-base-2300 px-2.5 py-1 text-sm font-semibold transition">
    <slot />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
</script>
