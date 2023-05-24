<template>
  <div class="relative flex items-end justify-center gap-1 text-sm">
    <IconSubTask />
    <slot name="amount">
      <span class=""> {{ completedAmount }}/{{ amount }} </span>
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
