<template>
  <FadeTransitionMedium>
    <div
      class="modal modal-open sm:modal-middle h-full"
      role="dialog">
      <div
        id="user-modal"
        ref="target"
        class="modal-box p-0 flex h-full min-h-[320px] overflow-hidden md:min-w-[720px]">
        <aside class="flex items-center justify-between">
          <SettingsSidebar />
        </aside>
        <div class="flex w-full flex-col bg-base-200">
          <SettingsContent />
        </div>
      </div>
    </div>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';
import SettingsContent from '@/components/user/settings/content/SettingsContent.vue';
import SettingsSidebar from '@/components/user/settings/sidebar/SettingsSidebar.vue';
import { useSettingsStore } from '@/stores/SettingsStore';

const isModalOpen = computed(() => settingsStore.getModalStatus('userSettings'));

const router = useRouter();

const settingsStore = useSettingsStore();

const target = ref();

onClickOutside(target, () => {
  if (isModalOpen.value) return;

  router.push(settingsStore.getParentModalRoute);
});

useFocusTrap(target, {
  immediate: true,
});
</script>
