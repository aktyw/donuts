<template>
  <BaseButton class="btn btn-sm border-transparent bg-base-200 hover:bg-base-300 text-base-content normal-case text-lg">
    <slot />
    <slot name="icon" />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
</script>
