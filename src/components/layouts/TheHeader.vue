<template>
  <header class="sticky p-0 px-6 navbar bg-base-300 z-50 min-h-12">
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
          <HeaderLink to="/tasks">
            <template #name> Tasks </template>
          </HeaderLink>
          <HeaderLink to="/notes">
            <template #name> Notes </template>
          </HeaderLink>
          <HeaderLink to="/">
            <template #name> About </template>
          </HeaderLink>
          <HeaderLink to="/login">
            <template #name> Login </template>
          </HeaderLink>
        </ul>
      </div>

      <div class="flex gap-2">
        <TheTooltip :data="menuTooltip">
          <template #default>
            <BaseButton
              class="btn btn-sm btn-square btn-ghost"
              @click="settingsStore.toggleMenu()">
              <template #icon>
                <IconMenu />
              </template>
            </BaseButton>
          </template>
        </TheTooltip>
        <TheTooltip data="Go to home">
          <template #default>
            <BaseButton
              class="btn btn-sm btn-square btn-ghost"
              @click="router.push({ name: 'project', params: { id: home } })">
              <template #icon>
                <IconHome />
              </template>
            </BaseButton>
          </template>
        </TheTooltip>
      </div>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu-horizontal gap-4">
        <HeaderLink to="/tasks">
          <template #name> Tasks </template>
        </HeaderLink>
        <HeaderLink to="/notes">
          <template #name> Notes </template>
        </HeaderLink>
      </ul>
    </div>

    <div class="navbar-end hidden lg:flex">
      <ul class="flex flex-row gap-4">
        <HeaderLink to="/">
          <template #name> About </template>
        </HeaderLink>
        <HeaderLink to="/login">
          <template #name> Login </template>
        </HeaderLink>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSettingsStore } from '@/stores/SettingsStore';
import { storeToRefs } from 'pinia';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useRouter } from 'vue-router';
import IconMenu from '@/components/icons/IconMenu.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconList from '@/components/icons/IconList.vue';
import HeaderLink from '@/components/header/HeaderLink.vue';
import blurElement from '@/helpers/blur';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';

const item = ref();

function blurDropdown() {
  blurElement();
}
const router = useRouter();
const settingsStore = useSettingsStore();
const { getHomeView: home, getMenuStatus: menuStatus } = storeToRefs(settingsStore);
const menuTooltip = computed(() => (menuStatus.value ? 'Close menu' : 'Open menu'));
</script>
