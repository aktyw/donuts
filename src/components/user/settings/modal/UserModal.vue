<template>
  <FadeTransitionMedium>
    <div
      class="modal modal-open sm:modal-middle"
      role="dialog">
      <div
        id="user-modal"
        ref="target"
        class="modal-box fixed top-12 flex h-[calc(100vh_-_6rem)] !max-h-screen min-h-[460px] overflow-visible !rounded-xl p-0 md:min-w-[720px]">
        <aside class="flex items-center justify-between border-b">
          <SettingsSidebar />
        </aside>
        <main class="flex h-full w-full flex-col gap-4 bg-base-200">
          <SettingsContent />
        </main>
      </div>
    </div>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';
import SettingsContent from '@/components/user/settings/content/SettingsContent.vue';
import SettingsSidebar from '@/components/user/settings/sidebar/SettingsSidebar.vue';
import { useSettingsStore } from '@/stores/SettingsStore';

const router = useRouter();

const settingsStore = useSettingsStore();

const target = ref();

onClickOutside(target, () => {
  router.push(settingsStore.getParentModalRoute);
});
</script>
