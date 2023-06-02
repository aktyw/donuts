<template>
  <div class="flex flex-col overflow-y-hidden">
    <SettingsHeader
      class="sticky top-0 z-50 flex w-full justify-between border-b-2 border-b-base-300 bg-base-200 p-4 font-semibold"
      :name="title">
      <template #action>
        <span
          v-if="route.name === 'email' || route.name === 'password'"
          ref="actionOverflowContainer"
          class="relative">
          <TheTooltip
            data="Go back"
            class="!tooltip-left fixed flex items-center pr-2">
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
        <span
          v-if="!mdAndSmaller"
          class="relative right-6">
          <TheTooltip
            data="Close"
            class="!tooltip-left fixed flex items-center">
            <BaseButton @click="handleCloseModal">
              <template #icon>
                <IconCloseFat />
              </template>
            </BaseButton>
          </TheTooltip>
        </span>
      </template>
    </SettingsHeader>

    <main class="relative h-screen overflow-auto p-4 pb-96 md:pb-8">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import BaseButton from '@/components/base/BaseButton.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconCloseFat from '@/components/icons/IconCloseFat.vue';
import TheTooltip from '@/components/ui/tooltips/TheTooltip.vue';
import SettingsHeader from '@/components/user/settings/content/SettingsHeader.vue';
import { getBreakpoints } from '@/composables/useBreakpoints';
import { useSettingsStore } from '@/stores/SettingsStore';

const { mdAndSmaller } = getBreakpoints();
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
