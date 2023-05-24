<template>
  <FadeTransitionMedium>
    <div
      class="modal sm:modal-middle modal-open"
      role="dialog">
      <div
        id="user-modal"
        ref="target"
        class="fixed flex modal-box top-12 !rounded-xl !max-h-screen overflow-visible p-0 md:min-w-[720px] min-h-[460px] h-[calc(100vh_-_6rem)]">
        <aside class="flex justify-between items-center border-b">
          <SettingsSidebar />
        </aside>
        <main class="flex flex-col gap-4 w-full h-full bg-base-200">
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
