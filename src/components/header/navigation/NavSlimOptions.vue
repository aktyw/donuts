<template>
  <div class="navbar-start flex flex-row justify-between print:hidden lg:w-1/2">
    <div class="flex gap-2">
      <TheTooltip :data="menuTooltip">
        <BaseButton
          class="btn-ghost btn-square btn-sm btn hover:bg-base-200"
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
          class="btn-ghost btn-square btn-sm btn hover:bg-base-200"
          aria-label="Go to home"
          @click="handleLinkToHome">
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
import { useHideMenu } from '@/composables/useHideMenu';
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

function handleLinkToHome() {
  router.push(homeRoute.value as RouteLocationRaw);
  useHideMenu();
}
</script>
