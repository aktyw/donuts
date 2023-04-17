<template>
  <aside
    :class="{
      '-translate-x-full ': !isMenuOpen,
    }"
    class="z-20 transition duration-300 h-screen fixed">
    <nav class="overflow-y-auto">
      <ul
        class="flex flex-nowrap w-80 menu p-4 bg-base-200 text-base-content [&>li>a]:justify-between [&>li>.router-link-exact-active]:bg-base-300 pb-40 overflow-x-hidden h-[calc(100vh-48px)]">
        <slot name="links"></slot>
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
