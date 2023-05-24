<template>
  <div class="flex w-full flex-col p-4">
    <SettingsHeader
      class="flex justify-between font-semibold"
      :name="title">
      <template #action>
        <TheTooltip
          data="Go back"
          class="w-full !tooltip-left flex items-center">
          <BaseButton
            v-if="route.name === 'email' || route.name === 'password'"
            @click="handleGoToPreviousRoute">
            <template #icon>
              <IconArrowLeft class="fill-base-content" />
            </template>
          </BaseButton>
        </TheTooltip>
      </template>
      <template #actionAlt>
        <TheTooltip
          data="Close"
          class="!tooltip-top flex items-center">
          <BaseButton @click="handleCloseModal">
            <template #icon>
              <IconClose />
            </template>
          </BaseButton>
        </TheTooltip>
      </template>
    </SettingsHeader>
    <DividerSlim />
    <div class="p-4">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import BaseButton from '@/components/base/BaseButton.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconClose from '@/components/icons/IconClose.vue';
import SettingsHeader from '@/components/user/settings/content/SettingsHeader.vue';
import DividerSlim from '@/components/user/settings/content/ui/DividerSlim.vue';
import { useSettingsStore } from '@/stores/SettingsStore';

const settingsStore = useSettingsStore();

import TheTooltip from '@/components/tooltips/TheTooltip.vue';

const route = useRoute();
const router = useRouter();

const title = computed(
  () => (route.name as string)[0]?.toString().toUpperCase() + route?.name?.toString().slice(1) || ''
);

function handleCloseModal(): void {
  router.push(settingsStore.getParentModalRoute);
}

function handleGoToPreviousRoute(): void {
  router.go(-1);
}
</script>
