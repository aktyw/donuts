<template>
  <div
    ref="dropdown"
    class="dropdown dropdown-left dropdown-bottom overflow-visible">
    <TheTooltip
      class="!tooltip-top hover:bg-base-200 rounded-sm flex items-center"
      data="More actions">
      <BaseButton
        tabindex="0"
        aria-label="More actions"
        class="flex items-center p-0.5">
        <IconHorizontalDots class="fill-base-content" />
      </BaseButton>
    </TheTooltip>

    <ul
      ref="dropList"
      role="menu"
      tabindex="0"
      class="dropdown-content menu py-1 shadow rounded-md w-56 bg-base-100 border border-base-300 text-base-content fill-base-content [& svg:not(.active-state)]:fill-base-content [&>li:hover>button:not(.active-state)]:bg-base-200 [& button:active]:text-base-content [&>button:active]:bg-base-200">
      <OptionListInfo> Added on {{ formattedCreatedAt.value }} </OptionListInfo>

      <BaseDividerSmall />

      <OptionListButton @click="handleCopyLinkTask">
        <template #icon>
          <IconLink />
        </template>
        Copy link to task
      </OptionListButton>

      <OptionListButton @click="handleDuplicateTask">
        <template #icon>
          <IconDuplicate />
        </template>
        Duplicate Task
      </OptionListButton>

      <OptionListButton @click="handleViewActivityTask">
        <template #icon>
          <IconActivity />
        </template>
        View task activity
      </OptionListButton>

      <OptionListButton @click="handlePrintTask">
        <template #icon>
          <IconPrint />
        </template>
        Print task
      </OptionListButton>

      <BaseDividerSmall />

      <OptionListButton
        :is-danger="true"
        @click="handleDeleteTask">
        <template #icon>
          <IconRecycleBin />
        </template>
        Delete Task
      </OptionListButton>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useClipboard, useDateFormat } from '@vueuse/core';
import { computed, type Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

import BaseButton from '@/components/base/BaseButton.vue';
import BaseDividerSmall from '@/components/base/BaseDividerSmall.vue';
import IconActivity from '@/components/icons/IconActivity.vue';
import IconDuplicate from '@/components/icons/IconDuplicate.vue';
import IconHorizontalDots from '@/components/icons/IconHorizontalDots.vue';
import IconLink from '@/components/icons/IconLink.vue';
import IconPrint from '@/components/icons/IconPrint.vue';
import IconRecycleBin from '@/components/icons/IconRecycleBin.vue';
import OptionListButton from '@/components/tasks/list/OptionListButton.vue';
import OptionListInfo from '@/components/tasks/list/OptionListInfo.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import { useNotification } from '@/composables/useNotification';
import blurElement from '@/helpers/blur';
import { useTasksStore } from '@/stores/TasksStore';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import type { Task } from '@/types/models/Task';

type Props = {
  task: Task;
};

const props = defineProps<Props>();
const store = useTasksStore();
const emit = defineEmits<{
  (e: 'viewActivityTask', id: string): void;
  (e: 'printTask', id: string): void;
  (e: 'deleteTask', id: string): void;
}>();
const route = useRoute();
const createdAt = computed(() => props.task.createdAt);
const formattedCreatedAt = computed(() => useDateFormat(createdAt.value, 'DD MMM · HH:mm', { locales: 'en-US' }));
const dropdown: Ref<HTMLElement | undefined> = ref();
const dropList: Ref<HTMLElement | undefined> = ref();

const source = computed(() => route.fullPath);
const { copy } = useClipboard({ source });

function handleCopyLinkTask(): void {
  copy(source.value);
  useNotification(NotificationMessage.CopyLink);
}

function handleDuplicateTask(): void {
  store.duplicateTask(props.task.id);
  blurElement();
}

function handleViewActivityTask(): void {
  emit('viewActivityTask', props.task.id);
}

function handlePrintTask(): void {
  blurElement();
  emit('printTask', props.task.id);
}

function handleDeleteTask(): void {
  emit('deleteTask', props.task.id);
}
</script>
