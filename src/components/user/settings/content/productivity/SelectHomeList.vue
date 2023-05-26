<template>
  <select
    v-model="selectedHome"
    class="select select-sm font-normal select-bordered w-full outline-custom rounded-md"
    @change="$emit('update:modelValue', selectedHome)">
    <option
      v-for="{ name, id } in homes"
      :key="id"
      :name="name"
      :value="id">
      {{ name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

import { useProjectsStore } from '@/stores/ProjectsStore';
import { useSettingsStore } from '@/stores/SettingsStore';

const settingsStore = useSettingsStore();

const currentHome = computed(() => settingsStore.getHomeView);

const store = useProjectsStore();
const { getAllActiveProjects: activeProjects } = storeToRefs(store);
const selectedHome = ref(currentHome.value);

const projects = [...activeProjects.value];

const homes = [{ name: 'Today', id: 'today' }, ...projects];

console.log(homes);

defineEmits<{
  (e: 'update:modelValue'): void;
}>();
</script>
