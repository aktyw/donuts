<template>
  <RouterView
    :class="{ 'ml-80': isMenuOpen }"
    class="transition-all duration-300 w-full flex flex-col justify-start items-center py-8 pb-80" />
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/SettingsStore';
import { storeToRefs } from 'pinia';

const settingsStore = useSettingsStore();
const { getMenuStatus: isMenuOpen } = storeToRefs(settingsStore);
</script>
