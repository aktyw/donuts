<template>
  <RouterView
    :class="{ 'ml-80': isMenuOpen }"
    class="overflow-y-auto transition-all duration-300 flex flex-col justify-start items-center pb-80 py-8" />
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/SettingsStore';
import { storeToRefs } from 'pinia';

const settingsStore = useSettingsStore();
const { getMenuStatus: isMenuOpen } = storeToRefs(settingsStore);
</script>
