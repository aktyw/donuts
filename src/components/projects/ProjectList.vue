<template>
  <select
    v-model="selectedProject"
    class="outline-custom select-bordered select select-sm w-[6.5rem] max-w-[10rem] rounded-md font-normal lg:w-[10rem]"
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
