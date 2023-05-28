<template>
  <div class="flex flex-col h-full bg-base-100 p-4 gap-4">
    <SettingsHeader
      name="Settings"
      class="font-bold pl-2" />
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
          :to="{ name: 'productivity' }"
          name="Productivity">
          <template #icon>
            <IconSettingsAlt />
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
import IconAccount from '@/components/icons/IconAccount.vue';
import IconSettingsAlt from '@/components/icons/IconSettingsAlt.vue';
import IconTheme from '@/components/icons/IconTheme.vue';
import SettingsHeader from '@/components/user/settings/content/SettingsHeader.vue';
import SettingsSidebarButton from '@/components/user/settings/sidebar/SettingsSidebarButton.vue';
</script>
