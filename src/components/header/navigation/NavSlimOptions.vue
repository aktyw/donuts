<template>
  <div class="navbar-start flex flex-row justify-between lg:w-1/2 print:hidden">
    <div class="flex gap-2">
      <TheTooltip :data="menuTooltip">
        <BaseButton
          class="btn btn-sm btn-square btn-ghost hover:bg-base-200"
          aria-label="Toggle menu"
          @click="settingsStore.toggleMenu()">
          <template #icon>
            <IconMenu
              class="fill-base-content"
              focusable="false"
              aria-hidden="true" />
          </template>
        </BaseButton>
      </TheTooltip>
      <TheTooltip data="Go to home">
        <BaseButton
          class="btn btn-sm btn-square btn-ghost hover:bg-base-200"
          aria-label="Go to home"
          @click="router.push(homeRoute as RouteLocationRaw)">
          <template #icon>
            <IconHome
              class="fill-base-content"
              focusable="false"
              aria-hidden="true" />
          </template>
        </BaseButton>
      </TheTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { type RouteLocationRaw, useRouter } from 'vue-router';

import BaseButton from '@/components/base/BaseButton.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconMenu from '@/components/icons/IconMenu.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import { useSettingsStore } from '@/stores/SettingsStore';

const settingsStore = useSettingsStore();
const { getHomeView: home, getMenuStatus: menuStatus } = storeToRefs(settingsStore);
const menuTooltip = computed(() => (menuStatus.value ? 'Close menu' : 'Open menu'));

const homeRoute = computed(() => {
  if (home.value === 'today') {
    return { name: 'today' };
  } else {
    return { name: 'project', params: { id: home.value } };
  }
});

const router = useRouter();
</script>
