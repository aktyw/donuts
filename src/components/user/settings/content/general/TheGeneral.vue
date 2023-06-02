<template>
  <div>
    <section class="flex flex-col gap-4">
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
    </section>
  </div>

  <InfoContainer
    v-if="isSuccess"
    class="mt-6">
    <p>The new home view has been set up successfully.</p>
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

const tasksStore = useTasksStore();
const settingsStore = useSettingsStore();

const isSuccess = ref(false);
const selectedHome = ref('');

function handleClearSelect() {
  selectedHome.value = '';
}

function handleChangeHomeView() {
  settingsStore.setHomeView(selectedHome.value);
  isSuccess.value = true;
}

function handleClearDeletedTasks() {
  tasksStore.clearAllDeletedTasks();
}
</script>
