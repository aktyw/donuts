<template>
  <router-view v-slot="{ Component }">
    <keep-alive max="10">
      <FadeTransitionShort mode="out-in">
        <component
          :is="Component"
          :class="{ 'ml-80': isMenuOpen && lgAndLarger }"
          class="flex flex-col items-center justify-start overflow-y-auto py-8 pb-80 transition-all duration-300" />
      </FadeTransitionShort>
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import FadeTransitionShort from '@/components/ui/transitions/FadeTransitionShort.vue';
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
