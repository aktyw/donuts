<template>
  <div class="navbar-start flex w-full flex-row-reverse justify-between lg:w-1/2">
    <div
      ref="item"
      class="dropdown-bottom dropdown-left dropdown gap-2 [&>.dropdown-content]:right-0">
      <label
        tabindex="0"
        class="btn-ghost btn-sm btn px-1 lg:hidden">
        <IconList />
      </label>
      <ul
        tabindex="0"
        class="dropdown-left dropdown-content menu menu-compact right-4 mt-2 w-64 gap-2 rounded-xl bg-base-200 p-2 shadow"
        @click="blurDropdown">
        <NavLink to="/tasks">Tasks</NavLink>
        <NavLink to="/notes">Notes</NavLink>
        <NavLink
          :to="{ name: 'account' }"
          @click.stop="handleSettings">
          Settings
        </NavLink>
        <BaseButton
          class="outline-custom btn-md btn rounded border-0 bg-base-300 text-base font-normal normal-case text-base-content lg:btn-sm hover:bg-base-200"
          @click.prevent="logout">
          Logout
        </BaseButton>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

import BaseButton from '@/components/base/BaseButton.vue';
import NavLink from '@/components/header/navigation/NavLink.vue';
import IconList from '@/components/icons/IconList.vue';
import blurElement from '@/helpers/blur';
import { useAuthStore } from '@/stores/AuthStore';
import { useSettingsStore } from '@/stores/SettingsStore';

const settingsStore = useSettingsStore();
const route = useRoute();
const authStore = useAuthStore();

function blurDropdown() {
  blurElement();
}

function logout() {
  authStore.logout();
}

function handleSettings() {
  blurElement();
  settingsStore.setModalRoute(route.path);
}
</script>
