<template>
  <div>
    <section class="flex flex-col gap-4">
      <SettingsLabel title="Home view" />
      <SelectHomeList v-model="selectedHome" />
    </section>
  </div>
  <SettingsFooterAction
    :is-save-btn-active="!!selectedHome"
    save-title="Update"
    @cancel="handleClearSelect"
    @save="handleChangeHomeView" />

  <InfoContainer
    v-if="isSuccess"
    class="mt-6">
    <p>The new home view has been set up successfully.</p>
  </InfoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import InfoContainer from '@/components/ui/containers/InfoContainer.vue';
import SelectHomeList from '@/components/user/settings/content/productivity/SelectHomeList.vue';
import SettingsFooterAction from '@/components/user/settings/content/SettingsFooterAction.vue';
import SettingsLabel from '@/components/user/settings/content/ui/SettingsLabel.vue';
import { useSettingsStore } from '@/stores/SettingsStore';

const isSuccess = ref(false);
const settingsStore = useSettingsStore();
const selectedHome = ref('');

function handleClearSelect() {}

function handleChangeHomeView() {
  settingsStore.setHomeView(selectedHome.value);
  isSuccess.value = true;
}
</script>
