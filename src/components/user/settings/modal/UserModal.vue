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
        <main class="flex flex-col gap-4 w-full h-full bg-primary-content">
          <SettingsContent />
        </main>
      </div>
    </div>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, onUpdated, provide, type Ref, ref, unref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';
import SettingsContent from '@/components/user/settings/content/SettingsContent.vue';
import SettingsSidebar from '@/components/user/settings/sidebar/SettingsSidebar.vue';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import { useTasksStore } from '@/stores/TasksStore';
import type { Task } from '@/types/models/Task';
// onMounted(() => {
//   storeSettings.setModal({ modal: 'task', value: true });
// });

// onUnmounted(() => {
//   storeSettings.setModal({ modal: 'task', value: false });
// });

const route = useRoute();
const router = useRouter();

const storeProjects = useProjectsStore();
const storeSettings = useSettingsStore();
const store = useTasksStore();

const target = ref();

// onClickOutside(target, (e) => {
//   const notification = (e.target as HTMLElement)?.closest('#notification');

//   if (
//     deleteConfirm.value ||
//     subtaskDeleteConfirm.value ||
//     isCalendarOpen.value ||
//     isMoveProjectOpen.value ||
//     notification
//   )
//     return;
//   closeModal();
// });
</script>
