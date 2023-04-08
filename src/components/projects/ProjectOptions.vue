<template>
  <div
    ref="dropdown"
    class="dropdown dropdown-left dropdown-bottom h-0">
    <button
      tabindex="0"
      class="btn btn-square rounded-md btn-xs bg-base-200 hover:bg-base-100 border-0 focus:bg-base-200">
      <IconHorizontalDots class="fill-base-content" />
    </button>

    <ul
      ref="dropList"
      role="menu"
      tabindex="0"
      aria-label="show task options"
      class="dropdown-content menu py-0.5 shadow rounded-md w-52 bg-base-100 border border-base-300 text-base-content fill-base-content [& svg:not(.active-state)]:fill-base-content [&>li:hover>button:not(.active-state)]:bg-base-200 [& button:active]:text-base-content [&>button:active]:bg-base-200">
      <OptionListButton @click="handleEditProject(props.id)">
        <template #icon>
          <IconPen />
        </template>
        <template #default>Edit project</template>
      </OptionListButton>

      <OptionListButton @click="handleAddToFav(props.id)">
        <template #icon>
          <IconHeart />
        </template>
        <template #default>Add to favorites</template>
      </OptionListButton>

      <OptionListButton @click="handleDuplicateProject(props.id)">
        <template #icon>
          <IconDuplicate />
        </template>
        <template #default>Duplicate project</template>
      </OptionListButton>

      <BaseDividerSmall />

      <OptionListButton
        class="hover:text-error hover:fill-error focus:text-error focus:fill-error fill-base-content"
        @click="handleArchiveProject(props.id)">
        <template #icon>
          <IconArchive />
        </template>
        <template #default>Archive project</template>
      </OptionListButton>

      <OptionListButton
        class="hover:text-error hover:fill-error focus:text-error focus:fill-error fill-base-content"
        @click="handleDeleteProject(props.id)">
        <template #icon>
          <IconRecycleBin />
        </template>
        <template #default>Delete project</template>
      </OptionListButton>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from '@/stores/ProjectsStore';
import { storeToRefs } from 'pinia';
import IconHorizontalDots from '@/components/icons/IconHorizontalDots.vue';
import IconPen from '@/components/icons/IconPen.vue';
import IconDuplicate from '@/components/icons/IconDuplicate.vue';
import IconArchive from '@/components/icons/IconArchive.vue';
import IconRecycleBin from '@/components/icons/IconRecycleBin.vue';
import IconHeart from '@/components/icons/IconHeart.vue';
import BaseDividerSmall from '@/components/ui/BaseDividerSmall.vue';
import OptionListButton from '@/components/tasks/OptionListButton.vue';

const projectsStore = useProjectsStore();
const { getProjectById } = storeToRefs(projectsStore);

type Props = {
  id: string;
};

const props = defineProps<Props>();

// const emit = defineEmits<{
//   (e: 'deleteTask', id: string): void;
//   (e: 'toggleIsPriority', id: string): void;
//   (e: 'toggleIsDone', id: string): void;
//   (e: 'handleDate', date: Date): void;
//   (e: 'editTask', id: string): void;
//   (e: 'duplicateTask', id: string): void;
//   (e: 'pickerOpen'): void;
// }>();

function handleEditProject(id: string): void {
  // emit('toggleIsPriority', taskId);
  console.log('handling', id);
}

function handleAddToFav(id: string): void {
  // emit('toggleIsDone', taskId);
  console.log('handling', id);
}

function handleDuplicateProject(id: string): void {
  // blurElement();
  // emit('duplicateTask', taskId);
  console.log('handling', id);
}

function handleArchiveProject(id: string): void {
  // console.log('sub', taskId);
  console.log('handling', id);
}

function handleDeleteProject(id: string): void {
  // emit('editTask', taskId);
  console.log('handling', id);
}
</script>
