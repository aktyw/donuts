<template>
  <BaseButton
    class="btn-ghost btn-xs p-0 border border-base-300 rounded hover:delay-150 focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent">
    <template #icon>
      <IconAdd />
    </template>
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
</script>
