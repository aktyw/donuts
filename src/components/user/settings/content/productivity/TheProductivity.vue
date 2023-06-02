<template>
  <div>
    <section class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <SettingsLabel title="Goals" />
        <p class="text-sm">Small steps add up to big achievements. Set task goals to keep your momentum.</p>
      </div>
      <div>
        <div class="w-40">
          <SettingsLabel title="Daily tasks" />
          <SettingsInput
            v-model.number="dailyValue"
            class="w-full"
            maxlength="3"
            :placeholder="initialDaily.toString()"
            min="1"
            max="100"
            type="number" />
        </div>
        <div class="w-40">
          <SettingsLabel title="Weekly tasks" />
          <SettingsInput
            v-model.number="weeklyValue"
            :placeholder="initialWeekly.toString()"
            class="w-full"
            min="1"
            max="1000"
            type="number" />
        </div>
      </div>
    </section>
  </div>

  <InfoContainer
    v-if="isSuccess"
    class="mt-6">
    <p>New goals has been set up successfully.</p>
  </InfoContainer>

  <SettingsFooterAction
    :is-save-btn-active="initialDaily !== dailyValue || initialWeekly !== weeklyValue"
    @cancel="handleCancelAction"
    @save="handleUpdateGoals" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import InfoContainer from '@/components/ui/containers/InfoContainer.vue';
import SettingsFooterAction from '@/components/user/settings/content/SettingsFooterAction.vue';
import SettingsInput from '@/components/user/settings/content/ui/SettingsInput.vue';
import SettingsLabel from '@/components/user/settings/content/ui/SettingsLabel.vue';
import { useStatsStore } from '@/stores/StatsStore';

const statsStore = useStatsStore();

const targetTasks = computed(() => {
  const daily = statsStore.getTarget('daily');
  const weekly = statsStore.getTarget('weekly');

  return { daily, weekly };
});
const isSuccess = ref(false);

const initialDaily = targetTasks.value.daily;
const initialWeekly = targetTasks.value.weekly;

const dailyValue = ref(initialDaily);
const weeklyValue = ref(initialWeekly);

function handleCancelAction() {}

function handleUpdateGoals() {
  if (targetTasks.value.daily !== dailyValue.value) {
    statsStore.setNewTarget({ targetType: 'daily', value: dailyValue.value || 1 });
  }
  if (targetTasks.value.weekly !== weeklyValue.value) {
    statsStore.setNewTarget({ targetType: 'weekly', value: weeklyValue.value || 1 });
  }

  isSuccess.value = true;
}
</script>
