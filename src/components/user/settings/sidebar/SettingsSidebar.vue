<template>
  <div class="h-full w-96">
    <header>Settings</header>
    <nav>
      <ul>
        <SettingsSidebarButton
          to="{name: 'settings', {id: 'account'}}"
          name="Account" />
        <SettingsSidebarButton
          to="/"
          name="General" />
        <SettingsSidebarButton
          to="/"
          name="Theme" />
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import SettingsSidebarButton from '@/components/user/settings/sidebar/SettingsSidebarButton.vue';
</script>
