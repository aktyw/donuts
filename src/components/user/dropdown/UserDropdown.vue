<template>
  <div class="dropdown dropdown-bottom dropdown-end">
    <UserDropdownButton>
      <template #icon>
        <IconAccount class="fill-base-content" />
      </template>
    </UserDropdownButton>
    <ul
      tabindex="1"
      class="text-sm dropdown-content menu p-2 shadow bg-base-100 rounded-md w-72 [&>*:hover]:bg-transparent [&>*:active]:text-base-content [&>*:active]:bg-base-200 print:hidden">
      <UserInfo />

      <BaseDividerSmall />

      <router-link
        :to="{ name: 'theme' }"
        tabindex="1"
        @click="blurDropdown">
        <OptionListButton>
          <template #icon>
            <IconTheme />
          </template>
          Theme
        </OptionListButton>
      </router-link>

      <OptionListButton @click="handlePrint">
        <template #icon>
          <IconPrint />
        </template>
        Print
      </OptionListButton>

      <OptionListButton>
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
        Logout
      </OptionListButton>

      <OptionListButton
        tabindex="1"
        class="flex gap-5 ml-1 cursor-default hover:bg-transparent">
        <span
          v-if="online"
          class="w-2 h-2 bg-success rounded-full"></span>
        <span
          v-else
          class="w-2 h-2 bg-error rounded-full">
        </span>
        {{ online ? 'Online' : 'Offline' }}
      </OptionListButton>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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

const isModalOpen = ref(false);
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const online = useOnline();

function handlePrint() {
  print();
}

function blurDropdown() {
  blurElement();
}

function logout() {
  authStore.logout();
}
</script>
