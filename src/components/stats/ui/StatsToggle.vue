<template>
  <div class="flex h-9 w-32 items-center justify-around rounded-full bg-base-200">
    <ToggleButton
      :class="{ 'bg-primary text-primary-content': props.achievementType === 'daily' }"
      @click="handleChangeType('daily')">
      Daily
    </ToggleButton>
    <ToggleButton
      :class="{ 'bg-primary text-primary-content': props.achievementType === 'weekly' }"
      @click="handleChangeType('weekly')">
      Weekly
    </ToggleButton>
  </div>
</template>

<script setup lang="ts">
import ToggleButton from '@/components/stats/ui/ToggleButton.vue';
import type { TargetType } from '@/stores/StatsStore';

type Props = {
  achievementType: TargetType;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'changeType', type: TargetType): void;
}>();

function handleChangeType(type: TargetType) {
  emit('changeType', type);
}
</script>
