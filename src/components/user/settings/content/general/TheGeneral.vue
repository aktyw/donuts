<template>
  <div>
    <section class="flex flex-col gap-4 pb-16">
      <div class="flex flex-col gap-2">
        <SettingsLabel title="Home view" />
        <SelectHomeList v-model="selectedHome" />
      </div>
      <div class="flex flex-col gap-2">
        <SettingsLabel title="Clear recycle bin" />
        <p class="text-sm">This will permanently delete all tasks stored in recycle bin. This can’t be undone.</p>
        <SettingsButtonDangerAction
          title="Delete tasks"
          @click="handleClearDeletedTasks" />
      </div>
      <div class="flex flex-col gap-2">
        <SettingsLabel title="Clear activity logs" />
        <p class="text-sm">This will permanently clear all logs stored in activity logs</p>
        <SettingsButtonDangerAction
          title="Clear logs"
          @click="handleClearActivityLogs" />
      </div>
    </section>
  </div>

  <InfoContainer
    v-if="isSuccess"
    class="mt-6">
    <p>{{ successInfo }}</p>
  </InfoContainer>

  <SettingsFooterAction
    :is-save-btn-active="!!selectedHome"
    save-title="Update"
    @cancel="handleClearSelect"
    @save="handleChangeHomeView" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import InfoContainer from '@/components/ui/containers/InfoContainer.vue';
import SelectHomeList from '@/components/user/settings/content/general/SelectHomeList.vue';
import SettingsFooterAction from '@/components/user/settings/content/SettingsFooterAction.vue';
import SettingsButtonDangerAction from '@/components/user/settings/content/ui/SettingsButtonDangerAction.vue';
import SettingsLabel from '@/components/user/settings/content/ui/SettingsLabel.vue';
import { useSettingsStore } from '@/stores/SettingsStore';
import { useTasksStore } from '@/stores/TasksStore';
import { useTrackingStore } from '@/stores/TrackingStore';

const tasksStore = useTasksStore();
const settingsStore = useSettingsStore();
const trackingStore = useTrackingStore();

const isSuccess = ref(false);
const successInfo = ref();
const selectedHome = ref('');

function handleClearSelect() {
  selectedHome.value = '';
  successInfo.value = '';
}

function handleChangeHomeView() {
  settingsStore.setHomeView(selectedHome.value);
  successInfo.value = 'The new home view has been set up successfully.';
  isSuccess.value = true;
}

function handleClearDeletedTasks() {
  tasksStore.clearAllDeletedTasks();
  successInfo.value = 'Tasks deleted successfully.';
  isSuccess.value = true;
}

function handleClearActivityLogs() {
  trackingStore.clearLogs();
  successInfo.value = 'Logs cleared successfully.';
  isSuccess.value = true;
}
</script>
