<template>
  <BaseButton class="btn-md btn border-transparent bg-base-200 text-lg normal-case text-base-content hover:bg-base-300">
    <slot />
    <slot name="icon" />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
</script>
