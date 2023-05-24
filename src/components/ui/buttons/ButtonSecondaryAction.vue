<template>
  <BaseButton class="btn-sm btn mr-2 border-none bg-base-200 text-base-content hover:bg-base-300">
    <slot name="icon" />
    <slot />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
</script>
