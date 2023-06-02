<template>
  <div>
    <BaseModal
      class="[&>*>div]:m-0 bg-transparent fixed right-8 bottom-8 !w-80  [&>div]:!bg-base-100 [&>div]:bg-gradient-to-r from-base-100 to-base-300"
      close-title="OK"
      @close-editor="handleCloseModal">
      <div
        ref="target"
        class="flex flex-col text-lg items-center text-base-content">
        <div>
          You've achieved
          <span class="font-semibold">{{ props.type }} goal !</span>
        </div>
        <donutTrophy class="fill-primary pointer-events-none w-full max-w-[220px] pb-6 stroke-primary"></donutTrophy>
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';

import donutTrophy from '@/assets/illustrations/donutTrophy.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import { useSettingsStore } from '@/stores/SettingsStore';
import type { TargetType } from '@/stores/StatsStore';

const settingsStore = useSettingsStore();
const target = ref();

type Props = {
  type: TargetType;
};

const props = defineProps<Props>();

function handleCloseModal() {
  settingsStore.setModal({ modal: 'achievement', value: false });
}

onClickOutside(target, (e) => {
  settingsStore.setModal({ modal: 'achievement', value: false });
});
</script>
