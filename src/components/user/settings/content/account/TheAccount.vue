<template>
  <div>
    <section class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <SettingsLabel
          for="name"
          title="Name" />
        <SettingsInput
          type="text"
          :placeholder="displayName || ''" />
      </div>

      <div class="flex flex-col gap-2">
        <SettingsLabel title="Email" />

        <span class="text-sm pb-2">{{ email }}</span>
        <SettingsButtonLink
          :to="{ name: 'email' }"
          title="Change email"></SettingsButtonLink>
      </div>

      <div class="flex flex-col gap-2">
        <SettingsLabel title="Password" />

        <SettingsButtonLink
          :to="{ name: 'password' }"
          title="Change password"></SettingsButtonLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getAuth, updateProfile } from 'firebase/auth';

const auth = getAuth();

import { computed } from 'vue';

import BaseButton from '@/components/base/BaseButton.vue';
import SettingsButtonLink from '@/components/user/settings/content/ui/SettingsButtonLink.vue';
import SettingsInput from '@/components/user/settings/content/ui/SettingsInput.vue';
import SettingsLabel from '@/components/user/settings/content/ui/SettingsLabel.vue';
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
