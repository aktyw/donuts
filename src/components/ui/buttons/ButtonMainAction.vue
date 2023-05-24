<template>
  <BaseButton class="btn-primary btn-sm btn border-transparent">
    <slot name="icon" />
    <slot />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
</script>
