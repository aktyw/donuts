<template>
  <aside
    :class="{
      '-translate-x-full ': !isMenuOpen,
    }"
    class="z-20 transition duration-300 h-screen fixed">
    <ul
      class="w-80 menu p-4 py-8 bg-base-200 text-base-content [&>li>a]:justify-between [&>li>.router-link-exact-active]:bg-base-300 h-full">
      <slot name="links"></slot>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useSettingsStore } from '@/stores/SettingsStore';

const settingsStore = useSettingsStore();
const { getMenuStatus: isMenuOpen } = storeToRefs(settingsStore);
</script>
