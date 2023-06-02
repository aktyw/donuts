<template>
  <TheTooltip
    class="z-[100]"
    data="Open productivity">
    <BaseButton
      class="btn-sm btn border-transparent bg-base-300 p-1 px-1.5 text-lg normal-case text-base-content hover:border-transparent hover:bg-base-200"
      v-bind="$attrs">
      <template #icon>
        <IconProductivity />
      </template>
      <span class="ml-1.5 text-sm">{{ completedDailyTasks }} / {{ dailyTasksTarget }}</span>
    </BaseButton>
  </TheTooltip>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import BaseButton from '@/components/base/BaseButton.vue';
import IconProductivity from '@/components/icons/IconProductivity.vue';
import TheTooltip from '@/components/ui/tooltips/TheTooltip.vue';
import { useStatsStore } from '@/stores/StatsStore';

const statsStore = useStatsStore();

const completedDailyTasks = computed(() => statsStore.getCompletedTasks('daily'));
const dailyTasksTarget = computed(() => statsStore.getTarget('daily'));
</script>
