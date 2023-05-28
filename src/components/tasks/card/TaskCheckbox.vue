<template>
  <div>
    <label class="flex items-start cursor-pointer outline-custom">
      <input
        type="checkbox"
        class="checkbox rounded-full outline-custom"
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
