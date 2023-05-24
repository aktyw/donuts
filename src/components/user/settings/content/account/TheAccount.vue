<template>
  <div>
    <section class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label
          class="font-semibold"
          for="name"
          >Name</label
        >
        <input
          type="text"
          class="input input-bordered h-9 text-base bg-base-200 border-1 border-base-300 text-base-content"
          :placeholder="displayName || ''" />
      </div>
      <div class="flex flex-col gap-2">
        <label class="font-semibold">Email</label>
        <span>{{ email }}</span>
        <RouterLink
          :to="{ name: 'email' }"
          class="btn btn-sm bg-base-300 text-base-content normal-case font-medium w-48 border-hidden h-9"
          >Change email</RouterLink
        >
      </div>
      <div class="flex flex-col gap-2">
        <label>Password</label>
        <RouterLink
          :to="{ name: 'password' }"
          class="btn btn-sm w-48"
          >Change password</RouterLink
        >
      </div>
    </section>
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { getAuth, updateProfile } from 'firebase/auth';

const auth = getAuth();

import { computed } from 'vue';

import BaseButton from '@/components/base/BaseButton.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useSettingsStore } from '@/stores/SettingsStore';

const authStore = useAuthStore();
const settingsStore = useSettingsStore();

const displayName = computed(() => authStore.getName);
const email = computed(() => authStore.getEmail);

async function updateAccount(name: string) {
  if (!name) return;
  try {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    authStore.setUser();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update username');
  }
}
</script>
