<template>
  <div class="navbar-start flex flex-row justify-between lg:w-1/2 print:hidden">
    <div class="flex gap-2">
      <TheTooltip :data="menuTooltip">
        <BaseButton
          class="btn btn-sm btn-square btn-ghost"
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
          class="btn btn-sm btn-square btn-ghost"
          aria-label="Go to home"
          @click="router.push({ name: 'project', params: { id: home } })">
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
import { useRouter } from 'vue-router';

import BaseButton from '@/components/base/BaseButton.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconMenu from '@/components/icons/IconMenu.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import { useSettingsStore } from '@/stores/SettingsStore';

const settingsStore = useSettingsStore();
const { getHomeView: home, getMenuStatus: menuStatus } = storeToRefs(settingsStore);
const menuTooltip = computed(() => (menuStatus.value ? 'Close menu' : 'Open menu'));

const router = useRouter();
</script>
