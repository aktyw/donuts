<template>
  <div class="flex items-center justify-between border rounded-md mx-0.5 h-10 max-w-[440px]">
    <ParentTaskButton />
    <ParentSubtaskDropdown />
  </div>
</template>

<script setup lang="ts">
import ParentSubtaskDropdown from '@/components/tasks/modal/ParentSubtaskDropdown.vue';
import ParentTaskButton from '@/components/tasks/modal/ParentTaskButton.vue';
</script>
