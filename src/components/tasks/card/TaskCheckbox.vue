<template>
  <div>
    <label
      class="flex items-start cursor-pointer focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent">
      <input
        type="checkbox"
        class="checkbox rounded-full focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent"
        :class="{ 'checkbox-primary': isPriority, 'checkbox-accent': isDone }"
        :checked="isDone"
        v-bind="$attrs"
        @click="toggle" />
    </label>
  </div>
</template>

<script setup lang="ts">
type Props = {
  isDone: boolean;
  isPriority: boolean;
};
defineProps<Props>();

const emit = defineEmits<{
  (e: 'toggle'): void;
}>();

function toggle(): void {
  emit('toggle');
}
</script>
