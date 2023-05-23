<template>
  <div class="dropdown dropdown-bottom dropdown-end">
    <UserDropdownButton>
      <template #icon>
        <IconAccount class="fill-base-content" />
      </template>
    </UserDropdownButton>
    <ul
      tabindex="0"
      class="text-sm dropdown-content menu p-2 shadow bg-base-100 rounded-md w-72 [&>*:hover]:bg-transparent [&>*:active]:text-base-content [&>*:active]:bg-base-200">
      <li
        class="text-base-content hover:bg-base-200"
        @click="openSettingsModal">
        <div class="flex flex-col items-start p-3">
          <div class="flex gap-4 items-center">
            <Avatar
              :size="34"
              variant="marble"
              :name="name || 'random'" />
            <div class="flex flex-col items-start gap-0 p-0">
              <span class="font-bold">{{ name }}</span>
              <span class="">{{ email }}</span>
            </div>
          </div>
          <span class="flex items-center py-0 gap-3">
            <IconSettingsAlt class="" />
            Settings
          </span>
        </div>
      </li>
      <BaseDividerSmall />

      <OptionListButton>
        <template #icon>
          <IconTheme />
        </template>
        Theme
      </OptionListButton>
      <OptionListButton>
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
      <!-- exlude dropdown from print -->
      <BaseDividerSmall />

      <OptionListButton @click.prevent="logout">
        <template #icon>
          <IconLogout />
        </template>
        Logout
      </OptionListButton>

      <OptionListButton class="flex gap-5 ml-1 cursor-default hover:bg-transparent">
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
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import Avatar from 'vue-boring-avatars';
import { useRoute, useRouter } from 'vue-router';

import BaseButton from '@/components/base/BaseButton.vue';
import BaseDividerSmall from '@/components/base/BaseDividerSmall.vue';
import BaseDropdown from '@/components/base/BaseDropdown.vue';
import IconAccount from '@/components/icons/IconAccount.vue';
import IconActivity from '@/components/icons/IconActivity.vue';
import IconLogout from '@/components/icons/IconLogout.vue';
import IconPrint from '@/components/icons/IconPrint.vue';
import IconSettingsAlt from '@/components/icons/IconSettingsAlt.vue';
import IconTheme from '@/components/icons/IconTheme.vue';
import OptionListButton from '@/components/tasks/list/OptionListButton.vue';
import UserDropdownButton from '@/components/user/UserDropdownButton.vue';
import { useAuthStore } from '@/stores/AuthStore';

const isModalOpen = ref(false);
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const online = useOnline();

const { getEmail: email, getName: name } = storeToRefs(authStore);

import UserInfo from './dropdown/UserInfo.vue';

function openSettingsModal() {
  isModalOpen.value = true;
}

function logout() {
  authStore.logout();
}
</script>
