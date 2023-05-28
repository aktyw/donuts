<template>
  <div class="relative flex text-sm gap-1 justify-center items-end">
    <IconSubTask class="fill-base-content" />
    <slot name="amount">
      <span class="">{{ completedAmount }}/{{ amount }}</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import IconSubTask from '@/components/icons/IconSubTask.vue';

type Props = {
  amount: number;
  completedAmount: number;
};

defineProps<Props>();
</script>
