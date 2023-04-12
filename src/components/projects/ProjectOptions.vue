<template>
  <div
    ref="dropdown"
    class="dropdown dropdown-left dropdown-bottom h-0">
    <button
      class="btn btn-square rounded-md btn-xs bg-transparent hover:bg-transparent border-0 focus:bg-base-200 focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent"
      aria-label="show task options">
      <IconHorizontalDots class="fill-base-content hover:fill-neutral" />
    </button>

    <ul
      ref="dropList"
      role="menu"
      tabindex="0"
      class="dropdown-content menu py-0.5 shadow rounded-md w-52 bg-base-100 border border-base-300 text-base-content fill-base-content [& svg:not(.active-state)]:fill-base-content [&>li:hover>button:not(.active-state)]:bg-base-200 [& button:active]:text-base-content [&>button:active]:bg-base-200">
      <teleport to="body">
        <ProjectModalEdit
          v-if="isProjectModalOpen"
          :project="project"
          @close-editor="handleCloseEditor">
        </ProjectModalEdit>
      </teleport>
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
import { ref, computed } from 'vue';
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
import ProjectModalEdit from '@/components/projects/ProjectModalEdit.vue';

type Props = {
  id: string;
};

const props = defineProps<Props>();

const projectsStore = useProjectsStore();
const { getProjectById } = storeToRefs(projectsStore);
const isProjectModalOpen = ref(false);

const project = computed(() => getProjectById.value(props.id));

// const emit = defineEmits<{
//   (e: 'deleteTask', id: string): void;
//   (e: 'toggleIsPriority', id: string): void;
//   (e: 'toggleIsDone', id: string): void;
//   (e: 'handleDate', date: Date): void;
//   (e: 'editTask', id: string): void;
//   (e: 'duplicateTask', id: string): void;
//   (e: 'pickerOpen'): void;
// }>();

function handleEditProject(): void {
  isProjectModalOpen.value = true;
}

function handleCloseEditor(): void {
  isProjectModalOpen.value = false;
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
