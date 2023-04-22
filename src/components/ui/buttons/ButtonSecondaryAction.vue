<template>
  <BaseButton class="btn btn-sm border-none mr-2 bg-base-200 hover:bg-base-300 text-base-content">
    <slot name="icon" />
    <slot />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
</script>
