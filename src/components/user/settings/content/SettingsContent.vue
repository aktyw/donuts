<template>
  <div class="flex flex-col overflow-hidden">
    <SettingsHeader
      class="flex justify-between font-semibold p-4 sticky top-0 z-50 bg-base-200 border-b-2 border-b-base-300"
      :name="title">
      <template #action>
        <span
          v-if="route.name === 'email' || route.name === 'password'"
          ref="actionOverflowContainer"
          class="relative">
          <TheTooltip
            data="Go back"
            class="fixed !tooltip-left flex items-center pr-2">
            <BaseButton @click="handleGoToPreviousRoute">
              <template #icon>
                <IconArrowLeft class="fill-base-content" />
              </template>
            </BaseButton>
          </TheTooltip>
        </span>
      </template>
      <h2 :class="{ 'px-9 ': actionOverflowContainer }">{{ title }}</h2>
      <template #actionAlt>
        <span class="relative right-6">
          <TheTooltip
            data="Close"
            class="!tooltip-left flex items-center fixed">
            <BaseButton @click="handleCloseModal">
              <template #icon>
                <IconClose />
              </template>
            </BaseButton>
          </TheTooltip>
        </span>
      </template>
    </SettingsHeader>

    <main class="p-4 overflow-auto h-screen relative">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import BaseButton from '@/components/base/BaseButton.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconClose from '@/components/icons/IconClose.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import SettingsHeader from '@/components/user/settings/content/SettingsHeader.vue';
import { useSettingsStore } from '@/stores/SettingsStore';

const settingsStore = useSettingsStore();
const actionOverflowContainer = ref(null);

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
