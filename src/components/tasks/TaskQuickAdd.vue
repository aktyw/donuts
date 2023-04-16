<template>
  <div
    class="modal modal-bottom sm:modal-middle modal-open "
    role="dialog">
    <TaskEditor class="bg-base-300 max-w-2xl border-none shadow-xl shadow-base-content" />
  </div>
</template>

<script setup lang="ts">
import TaskEditor from './TaskEditor.vue';
</script>
