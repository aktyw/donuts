<template>
  <aside
    :class="{
      '-translate-x-full ': !isMenuOpen,
    }"
    class="fixed z-40 h-screen transition duration-300 print:hidden">
    <nav class="overflow-y-auto">
      <ul
        class="menu flex h-[calc(100vh-48px)] w-80 flex-nowrap overflow-x-hidden bg-base-200 p-4 pb-40 text-base-content [&>li>.router-link-exact-active]:bg-base-300 [&>li>a]:justify-between">
        <slot name="links" />
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useSettingsStore } from '@/stores/SettingsStore';

const settingsStore = useSettingsStore();
const { getMenuStatus: isMenuOpen } = storeToRefs(settingsStore);
</script>
