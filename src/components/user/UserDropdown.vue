<template>
  <div class="dropdown dropdown-bottom dropdown-end">
    <label
      tabindex="0"
      class="btn m-1"
      >Click</label
    >
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      <li>Theme</li>
      <li>Print</li>
      <li>Get User Info</li>
      <!-- exlude dropdown from print -->
      <li @click.prevent="logout">Logout</li>
      <!-- base divider -->
      <li>You are online/offline</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import BaseDropdown from '@/components/base/BaseDropdown.vue';
import IconAccount from '@/components/icons/IconAccount.vue';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

import UserInfo from './dropdown/UserInfo.vue';

function logout() {
  authStore.logout();
  router.push('/');
}
</script>
