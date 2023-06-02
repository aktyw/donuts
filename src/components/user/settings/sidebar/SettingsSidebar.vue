<template>
  <div class="flex h-full w-full flex-col gap-4 bg-base-100 p-4">
    <div>
      <SettingsHeader
        name="Settings"
        class="flex w-full justify-between pl-2 font-bold">
        <template #actionAlt>
          <span
            v-if="mdAndSmaller"
            class="relative right-6">
            <TheTooltip
              data="Close"
              class="!tooltip-left fixed flex items-center">
              <BaseButton @click="handleCloseModal">
                <template #icon>
                  <IconClose />
                </template>
              </BaseButton>
            </TheTooltip>
          </span>
        </template>
      </SettingsHeader>
    </div>
    <nav>
      <ul>
        <SettingsSidebarButton
          :to="{ name: 'account' }"
          name="Account">
          <template #icon>
            <IconAccount />
          </template>
        </SettingsSidebarButton>
        <SettingsSidebarButton
          :to="{ name: 'general' }"
          name="General">
          <template #icon>
            <IconSettingsAlt />
          </template>
        </SettingsSidebarButton>
        <SettingsSidebarButton
          :to="{ name: 'productivity' }"
          name="Productivity">
          <template #icon>
            <IconProductivity />
          </template>
        </SettingsSidebarButton>
        <SettingsSidebarButton
          :to="{ name: 'theme' }"
          name="Theme">
          <template #icon>
            <IconTheme />
          </template>
        </SettingsSidebarButton>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import BaseButton from '@/components/base/BaseButton.vue';
import IconAccount from '@/components/icons/IconAccount.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconProductivity from '@/components/icons/IconProductivity.vue';
import IconSettingsAlt from '@/components/icons/IconSettingsAlt.vue';
import IconTheme from '@/components/icons/IconTheme.vue';
import TheTooltip from '@/components/ui/tooltips/TheTooltip.vue';
import SettingsHeader from '@/components/user/settings/content/SettingsHeader.vue';
import SettingsSidebarButton from '@/components/user/settings/sidebar/SettingsSidebarButton.vue';
import { getBreakpoints } from '@/composables/useBreakpoints';
import { useSettingsStore } from '@/stores/SettingsStore';

const router = useRouter();

const settingsStore = useSettingsStore();

const { mdAndSmaller } = getBreakpoints();

function handleCloseModal(): void {
  router.push(settingsStore.getParentModalRoute);
}
</script>
