<template>
  <div class="dropdown-bottom dropdown-end dropdown">
    <UserDropdownButton>
      <template #icon>
        <IconAccount class="fill-base-content" />
      </template>
    </UserDropdownButton>
    <ul
      tabindex="1"
      class="dropdown-content menu w-72 rounded-md bg-base-100 p-2 text-sm shadow print:hidden [&>*:active]:bg-base-200 [&>*:active]:text-base-content [&>*:hover]:bg-transparent">
      <UserInfo />

      <BaseDividerSmall />

      <router-link
        :to="{ name: 'theme' }"
        tabindex="1"
        @click="handleOpenSettings">
        <OptionListButton>
          <template #icon>
            <IconTheme />
          </template>
          Theme
        </OptionListButton>
      </router-link>

      <OptionListButton @click.stop="handlePrint">
        <template #icon>
          <IconPrint />
        </template>
        Print
      </OptionListButton>

      <OptionListButton @click.stop="handleShowActivity">
        <template #icon>
          <IconActivity />
        </template>
        Activity Log
      </OptionListButton>

      <BaseDividerSmall />

      <OptionListButton @click.prevent="logout">
        <template #icon>
          <IconLogout />
        </template>
        Log out
      </OptionListButton>

      <OptionListButton
        tabindex="1"
        class="ml-1 flex cursor-default gap-5 hover:bg-transparent">
        <span
          v-if="online"
          class="h-2 w-2 rounded-full bg-success"></span>
        <span
          v-else
          class="h-2 w-2 rounded-full bg-error"></span>
        {{ online ? 'Online' : 'Offline' }}
      </OptionListButton>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

import BaseDividerSmall from '@/components/base/BaseDividerSmall.vue';
import IconAccount from '@/components/icons/IconAccount.vue';
import IconActivity from '@/components/icons/IconActivity.vue';
import IconLogout from '@/components/icons/IconLogout.vue';
import IconPrint from '@/components/icons/IconPrint.vue';
import IconTheme from '@/components/icons/IconTheme.vue';
import OptionListButton from '@/components/tasks/list/OptionListButton.vue';
import UserDropdownButton from '@/components/user/dropdown/UserDropdownButton.vue';
import UserInfo from '@/components/user/dropdown/UserInfo.vue';
import blurElement from '@/helpers/blur';
import { useAuthStore } from '@/stores/AuthStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import ActivityView from '@/views/ActivityView.vue';

const router = useRouter();
const authStore = useAuthStore();
const settingsStore = useSettingsStore();
const route = useRoute();
const online = useOnline();

const isMenuOpenBeforePrint = ref();

async function hideMenu(): Promise<void> {
  isMenuOpenBeforePrint.value = settingsStore.getMenuStatus;

  return new Promise((resolve) => {
    settingsStore.hideMenu();
    resolve();
  });
}

async function handlePrint(): Promise<void> {
  try {
    await hideMenu();
    print();
  } catch (error) {
    console.error('Cannot print right now.');
  } finally {
    if (isMenuOpenBeforePrint.value) settingsStore.openMenu();
  }
}

function handleOpenSettings() {
  blurElement();
  settingsStore.setModalRoute(route.path);
}

function logout() {
  authStore.logout();
}

function handleShowActivity() {
  router.push({ name: 'activity' });
}
</script>
