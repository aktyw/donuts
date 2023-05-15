<template>
  <div
    class="flex justify-around items-center w-40 h-9 bg-base-200 rounded-full"
    @click="disableSlideTransition()">
    <ProjectToggleLink :to="{ name: 'active' }">Active</ProjectToggleLink>
    <ProjectToggleLink :to="{ name: 'archived' }">Archived</ProjectToggleLink>
  </div>
</template>

<script setup lang="ts">
import ProjectToggleLink from '@/components/projects/toggle/ProjectToggleLink.vue';
import { useSettingsStore } from '@/stores/SettingsStore';

const settingsStore = useSettingsStore();

function disableSlideTransition() {
  console.log('Disabling');
  settingsStore.setTransitionStatus({ transition: 'projectRecord', value: false });
}
</script>
