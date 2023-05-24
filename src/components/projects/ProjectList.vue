<template>
  <select
    v-model="selectedProject"
    class="select-bordered select select-sm w-[11rem] max-w-[11rem] rounded-md font-normal focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
    @change="$emit('update:modelValue', selectedProject)">
    <option
      v-for="project in activeProjects"
      :key="project.id"
      :name="project.name"
      :value="project">
      {{ project.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watchEffect } from 'vue';

import { useProjectsStore } from '@/stores/ProjectsStore';
import type { Project } from '@/types/models/Projects';

type Props = {
  currentProject?: Project | undefined;
};

const props = defineProps<Props>();

const store = useProjectsStore();
const { getAllActiveProjects: activeProjects } = storeToRefs(store);
const selectedProject = ref(props.currentProject);

watchEffect(() => {
  selectedProject.value = props.currentProject;
});

defineEmits<{
  (e: 'update:modelValue'): void;
}>();
</script>
