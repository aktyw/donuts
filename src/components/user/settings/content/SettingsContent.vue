<template>
  <div class="flex h-full w-full flex-col gap-4 p-4">
    <SettingsHeader
      class="flex justify-between font-semibold"
      :name="title">
      <template #content>
        <BaseButton @click="handleCloseModal">
          <template #icon>
            <IconClose />
          </template>
        </BaseButton>
      </template>
    </SettingsHeader>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import BaseButton from '@/components/base/BaseButton.vue';
import IconClose from '@/components/icons/IconClose.vue';
import SettingsHeader from '@/components/user/settings/content/SettingsHeader.vue';
import { useSettingsStore } from '@/stores/SettingsStore';

const settingsStore = useSettingsStore();
const route = useRoute();
const router = useRouter();
const title = computed(
  () => (route.name as string)[0]?.toString().toUpperCase() + route?.name?.toString().slice(1) || ''
);

function handleCloseModal(): void {
  router.push(settingsStore.getParentModalRoute);
}
</script>
