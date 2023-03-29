<template>
  <select
    class="select select-xs select-bordered w-[11rem] max-w-[11rem]"
    :value="name"
    @change="$emit('update:name', $event.target.value)">
    <option
      v-for="project in projects"
      :key="project.id">
      {{ project.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { useProjectsStore } from '@/stores/ProjectsStore';
import { storeToRefs } from 'pinia';

const store = useProjectsStore();
const { getAllProjects: projects } = storeToRefs(store);

type Props = {
  name: string;
};

defineProps<Props>();
defineEmits<{
  (e: 'update:name', name: string): void;
}>();
</script>
