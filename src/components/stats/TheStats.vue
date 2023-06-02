<template>
  <div class="w-96 rounded bg-base-100 flex flex-col gap-8 p-4">
    <header class="flex flex-col justify-between gap-2">
      <h2 class="font-semibold">Your productivity</h2>
      <div class="flex justify-between">
        <p>
          <strong>{{ getCompletedTasks.length }}</strong>
          completed tasks
        </p>
        <LinkButton
          :to="{ name: 'activity', hash: '#Complete' }"
          class="text-primary hover:underline transition">
          View all completed tasks
        </LinkButton>
      </div>
    </header>
    <main class="flex flex-col items-center gap-8">
      <section class="flex flex-col items-center gap-4">
        <StatsToggle
          :achievement-type="activeAchievementType"
          @change-type="handleChangeType" />
        <div>
          <AwardsBadge
            v-if="activeAchievementType === 'daily'"
            type="daily"
            :progress-value="calcProgressValue('daily')">
            <IconOrder :class="{ 'fill-primary': calcProgressValue('daily') >= 100 }" />
          </AwardsBadge>
          <AwardsBadge
            v-else
            type="weekly"
            :progress-value="calcProgressValue('weekly')">
            <IconMedals :class="{ 'fill-primary': calcProgressValue('weekly') >= 100 }" />
          </AwardsBadge>
        </div>
      </section>
      <section class="flex flex-col gap-4 w-full items-center">
        <h3 v-if="activeAchievementType === 'daily'">
          Daily goal:
          <span class="font-semibold">{{ completedDailyTasks }}/{{ dailyTasksTarget }} tasks</span>
        </h3>
        <h3 v-else>
          Weekly goal:
          <span class="font-semibold">{{ completedWeeklyTasks }}/{{ weeklyTasksTarget }} tasks</span>
        </h3>
        <span>{{ message }}</span>
        <LinkButton :to="{ name: 'productivity' }">Edit goal</LinkButton>
        <BaseDivider />
      </section>
      <div>
        <p>chart JS here last 7 days</p>
      </div>
      <div class="w-full flex flex-col items-center">
        <BaseDivider />
        <LinkButton :to="{ name: 'productivity' }">Productivity settings</LinkButton>
      </div>
    </main>
    <teleport to="body">
      <TheAchievement
        v-if="hasEarnAchievement && isModalOpen"
        :type="achievementType" />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, type Ref, ref, watch } from 'vue';

import BaseDivider from '@/components/base/BaseDivider.vue';
import IconMedals from '@/components/icons/IconMedals.vue';
import IconOrder from '@/components/icons/IconOrder.vue';
import TheAchievement from '@/components/layouts/TheAchievement.vue';
import AwardsBadge from '@/components/stats/awards/AwardsBadge.vue';
import LinkButton from '@/components/stats/ui/LinkButton.vue';
import StatsToggle from '@/components/stats/ui/StatsToggle.vue';
import { useMessage } from '@/composables/useMessage';
import { useSettingsStore } from '@/stores/SettingsStore';
import type { TargetType } from '@/stores/StatsStore';
import { useStatsStore } from '@/stores/StatsStore';
import { useTasksStore } from '@/stores/TasksStore';

const tasksStore = useTasksStore();
const statsStore = useStatsStore();
const settingsStore = useSettingsStore();

const completedDailyTasks = computed(() => statsStore.getCompletedTasks('daily'));
const completedWeeklyTasks = computed(() => statsStore.getCompletedTasks('daily'));
const dailyTasksTarget = computed(() => statsStore.getTarget('daily'));
const weeklyTasksTarget = computed(() => statsStore.getTarget('weekly'));

const activeAchievementType: Ref<TargetType> = ref('daily');
const hasEarnAchievement = ref(false);
const isModalOpen = computed(() => settingsStore.getModalStatus('achievement'));
const achievementType = ref();

const dailyProgress = computed(() => statsStore.getProgressValue('daily'));
const weeklyProgress = computed(() => statsStore.getProgressValue('weekly'));

watch(
  () => dailyProgress.value,
  (val, old) => {
    if (val >= 100 && old < 100) {
      showAchievement('daily');
    }
  }
);

watch(
  () => weeklyProgress.value,
  (val, old) => {
    if (val >= 100 && old < 100) {
      showAchievement('weekly');
    }
  }
);

const messages = [
  "Keep going, you're unstoppable!",
  "You're on fire, keep it up!",
  'One step closer to your goals.',
  "Don't stop now, you're doing amazing!",
  'Every small step counts, keep pushing!',
  "Stay focused, you're making progress.",
  "You're a rockstar, keep rocking those tasks!",
  "Keep that momentum going, you're unstoppable.",
  "You're crushing it, keep going!",
  "One task at a time, you've got this.",
  "You're a productivity machine, keep it up!",
  'Stay committed, success is just around the corner.',
  'Keep pushing forward, greatness awaits you.',
  "Don't give up now, you're almost there!",
  'Your determination is inspiring, keep going strong.',
  'Your effort is paying off, keep up the good work.',
  'Stay motivated, success is within your reach.',
  "Keep chasing your dreams, you're getting closer.",
  "Celebrate each completed task, you're making progress.",
  "You're a go-getter, keep that energy up!",
];

const message = useMessage(messages);
const getCompletedTasks = computed(() => tasksStore.getCompletedTasks);

function handleChangeType(type: TargetType) {
  activeAchievementType.value = type;
}

function calcProgressValue(type: TargetType) {
  return type === 'daily'
    ? Math.round((completedDailyTasks.value / dailyTasksTarget.value) * 100)
    : Math.round((completedWeeklyTasks.value / weeklyTasksTarget.value) * 100);
}

function showAchievement(type: TargetType) {
  achievementType.value = type;
  hasEarnAchievement.value = true;
  settingsStore.setModal({ modal: 'achievement', value: true });
}
</script>
