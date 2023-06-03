<template>
  <RouterView
    :class="{ 'ml-80 ': isMenuOpen && lgAndLarger }"
    class="h-[calc(100vh-48px)] py-8 transition-all duration-300" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { getBreakpoints } from '@/composables/useBreakpoints';
import { useSettingsStore } from '@/stores/SettingsStore';

const { lgAndLarger } = getBreakpoints();

const settingsStore = useSettingsStore();
const { getMenuStatus: isMenuOpen } = storeToRefs(settingsStore);
</script>

<style scoped>
body {
  overflow: hidden;
}
</style>
