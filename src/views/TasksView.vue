<template>
  <router-view v-slot="{ Component }">
    <keep-alive max="10">
      <FadeTransitionShort mode="out-in">
        <component
          :is="Component"
          :class="{ 'ml-80': isMenuOpen }"
          class="overflow-y-auto transition-all duration-300 flex flex-col justify-start items-center pb-80 py-8" />
      </FadeTransitionShort>
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import FadeTransitionShort from '@/components/ui/transitions/FadeTransitionShort.vue';
import { useSettingsStore } from '@/stores/SettingsStore';

const settingsStore = useSettingsStore();
const { getMenuStatus: isMenuOpen } = storeToRefs(settingsStore);
</script>

<style scoped>
body {
  overflow: hidden;
}
</style>
