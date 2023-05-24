<template>
  <div class="mx-0.5 flex h-10 max-w-[440px] items-center justify-between rounded-md border">
    <ParentTaskButton />
    <ParentSubtaskDropdown />
  </div>
</template>

<script setup lang="ts">
import ParentSubtaskDropdown from '@/components/tasks/modal/ParentSubtaskDropdown.vue';
import ParentTaskButton from '@/components/tasks/modal/ParentTaskButton.vue';
</script>
