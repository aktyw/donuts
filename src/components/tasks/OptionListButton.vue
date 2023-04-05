<template>
  <li>
    <BaseButton class="btn-md md:btn-sm">
      <template #icon>
        <slot name="icon" />
      </template>
      <template #default>
        <slot />
      </template>
    </BaseButton>
  </li>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
</script>
