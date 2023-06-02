<template>
  <div>
    <BaseModal
      class="[&>*>div]:m-0"
      close-title="OK"
      @close-editor="handleCloseModal">
      <div class="flex flex-col text-lg items-center text-base-content">
        <div>
          You have achieved your
          <span class="font-semibold">{{ props.type }} goal !</span>
        </div>
        <donutTrophy class="fill-primary pointer-events-none w-full max-w-[220px] pb-6 stroke-primary"></donutTrophy>
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import donutTrophy from '@/assets/illustrations/donutTrophy.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import { useSettingsStore } from '@/stores/SettingsStore';
import type { TargetType } from '@/stores/StatsStore';

const settingsStore = useSettingsStore();

type Props = {
  type: TargetType;
};

const props = defineProps<Props>();

function handleCloseModal() {
  settingsStore.setModal({ modal: 'achievement', value: false });
}
</script>
