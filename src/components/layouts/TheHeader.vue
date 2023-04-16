<template>
  <header class="fixed top-0 p-0 px-6 navbar bg-base-300 z-50 min-h-12">
    <div class="navbar-start flex flex-row-reverse justify-between w-full lg:w-1/2">
      <div
        ref="item"
        class="dropdown dropdown-left [&>.dropdown-content]:right-0 dropdown-bottom gap-2">
        <label
          tabindex="0"
          class="btn btn-sm btn-ghost lg:hidden px-1">
          <IconList />
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content dropdown-left mt-2 shadow bg-base-200 w-48 gap-2 p-2 rounded-xl"
          @click="blurDropdown">
          <HeaderLink to="/tasks"> Tasks </HeaderLink>
          <HeaderLink to="/notes"> Notes </HeaderLink>
          <HeaderLink to="/"> About </HeaderLink>
          <HeaderLink to="/login"> Login </HeaderLink>
        </ul>
      </div>

      <div class="flex gap-2">
        <TheTooltip :data="menuTooltip">
          <BaseButton
            class="btn btn-sm btn-square btn-ghost"
            aria-label="Toggle menu"
            @click="settingsStore.toggleMenu()">
            <template #icon>
              <IconMenu
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
                focusable="false"
                aria-hidden="true" />
            </template>
          </BaseButton>
        </TheTooltip>
      </div>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu-horizontal gap-4">
        <HeaderLink to="/tasks"> Tasks </HeaderLink>
        <HeaderLink to="/notes"> Notes </HeaderLink>
      </ul>
    </div>

    <div class="navbar-end hidden lg:flex">
      <ul class="flex flex-row gap-4">
        <ModalButton>
          <template #icon>
            <IconAdd />
          </template>
          <!-- <TaskQuickAdd /> -->
        </ModalButton>
        <HeaderLink to="/"> About </HeaderLink>
        <HeaderLink to="/login"> Login </HeaderLink>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import HeaderLink from '@/components/header/HeaderLink.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconList from '@/components/icons/IconList.vue';
import IconMenu from '@/components/icons/IconMenu.vue';
import ModalButton from '@/components/modals/ModalButton.vue';
import TaskQuickAdd from '@/components/tasks/TaskQuickAdd.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import blurElement from '@/helpers/blur';
import { useSettingsStore } from '@/stores/SettingsStore';

const item = ref();

function blurDropdown() {
  blurElement();
}
const router = useRouter();
const settingsStore = useSettingsStore();
const { getHomeView: home, getMenuStatus: menuStatus } = storeToRefs(settingsStore);
const menuTooltip = computed(() => (menuStatus.value ? 'Close menu' : 'Open menu'));
</script>
