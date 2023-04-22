<template>
  <BaseButton class="btn btn-sm btn-primary border-transparent">
    <slot name="icon" />
    <slot />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
</script>
