<template>
  <BaseButton
    class="btn btn-md border-transparent bg-base-200 hover:bg-base-300 text-neutral-focus normal-case text-lg">
    <slot />
    <slot name="icon" />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
</script>
