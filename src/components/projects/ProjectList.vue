<template>
  <select
    class="select select-xs select-bordered w-[11rem] max-w-[11rem]"
    @change="handlePassId">
    <option
      v-for="{ id, name: title } in projects"
      :id="id"
      :key="id"
      :name="title">
      {{ title }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { useProjectsStore } from '@/stores/ProjectsStore';
import { storeToRefs } from 'pinia';

const store = useProjectsStore();
const { getAllProjects: projects } = storeToRefs(store);

const emit = defineEmits<{
  (e: 'handleSelectId', selectedId: string): void;
}>();

function handlePassId(event: Event) {
  const target = event.target as HTMLSelectElement;
  const selectedIndex = target.selectedIndex;
  const selectedOption = target.options[selectedIndex];
  const selectedId = selectedOption.id;

  emit('handleSelectId', selectedId);
}
</script>
