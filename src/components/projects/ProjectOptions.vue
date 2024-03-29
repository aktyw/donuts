<template>
  <div
    ref="dropdown"
    class="dropdown-bottom dropdown-left dropdown h-0 absolute right-2">
    <button
      class="outline-custom btn-square btn-xs btn rounded-md border-0 bg-transparent hover:bg-transparent focus:bg-base-200 !duration-0"
      aria-label="show task options">
      <IconHorizontalDots class="fill-base-content hover:opacity-50" />
    </button>

    <ul
      ref="dropList"
      role="menu"
      tabindex="1"
      class="[& svg:not(.active-state)]:fill-base-content [& button:active]:text-base-content dropdown-content menu w-56 rounded-md border border-base-300 bg-base-100 fill-base-content py-0.5 text-base-content shadow [&>button:active]:bg-base-200 [&>li:hover>button:not(.active-state)]:bg-base-200">
      <teleport to="body">
        <ProjectModal
          v-if="isProjectModalOpen"
          :project="project"
          modal-title="Edit project"
          action-title="Save"
          @action="updateProject"
          @close-editor="handleCloseEditor" />
      </teleport>
      <OptionListButton
        v-if="!isArchived"
        @click.stop="handleOpenEditor">
        <template #icon>
          <IconPen />
        </template>
        Edit project
      </OptionListButton>

      <OptionListButton
        v-if="!isArchived"
        @click.stop="handleAddToFav">
        <template #icon>
          <IconHeartMinus v-if="project.favorite" />
          <IconHeart v-else />
        </template>
        {{ project.favorite ? 'Remove from favorites' : 'Add to favorites' }}
      </OptionListButton>

      <OptionListButton
        v-if="!isFavorites && !isArchived"
        @click.stop="handleDuplicateProject">
        <template #icon>
          <IconDuplicate />
        </template>
        Duplicate project
      </OptionListButton>

      <BaseDividerSmall v-if="!isFavorites && !isArchived" />

      <OptionListButton
        v-if="!isFavorites && !isArchived"
        :is-danger="true"
        @click.stop="handleArchiveProject">
        <template #icon>
          <IconArchive />
        </template>
        Archive project
      </OptionListButton>

      <OptionListButton
        v-if="!isFavorites && isArchived"
        @click.stop="handleUnarchiveProject">
        <template #icon>
          <IconUnarchive />
        </template>
        Unarchive project
      </OptionListButton>

      <OptionListButton
        v-if="!isFavorites"
        :is-danger="true"
        @click.stop="toggleDeleteModal">
        <template #icon>
          <IconRecycleBin />
        </template>
        Delete project
      </OptionListButton>
    </ul>

    <Teleport to="body">
      <ModalConfirmDelete
        v-if="deleteConfirm"
        :is-danger="true"
        @cancel="cancelDeleteProject"
        @action="handleDeleteProject">
        Delete project
        <template #content>
          <p>
            Do you really want to delete project
            <span class="break-words font-bold">{{ project.name }}</span>
            ?
          </p>
        </template>
      </ModalConfirmDelete>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useRouteParams } from '@vueuse/router';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import BaseDividerSmall from '@/components/base/BaseDividerSmall.vue';
import IconArchive from '@/components/icons/IconArchive.vue';
import IconDuplicate from '@/components/icons/IconDuplicate.vue';
import IconHeart from '@/components/icons/IconHeart.vue';
import IconHeartMinus from '@/components/icons/IconHeartMinus.vue';
import IconHorizontalDots from '@/components/icons/IconHorizontalDots.vue';
import IconPen from '@/components/icons/IconPen.vue';
import IconRecycleBin from '@/components/icons/IconRecycleBin.vue';
import IconUnarchive from '@/components/icons/IconUnarchive.vue';
import ModalConfirmDelete from '@/components/modals/ModalConfirmDelete.vue';
import ProjectModal from '@/components/projects/ProjectModal.vue';
import OptionListButton from '@/components/tasks/list/OptionListButton.vue';
import { useHideMenu } from '@/composables/useHideMenu';
import blurElement from '@/helpers/blur';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import type { Project } from '@/types/models/Projects';

type Props = {
  id: string;
  isFavorites?: boolean;
  isArchived?: boolean;
};

const settingsStore = useSettingsStore();
const router = useRouter();
const props = defineProps<Props>();
const deleteConfirm = ref(false);
const projectsStore = useProjectsStore();
const { getProjectById } = storeToRefs(projectsStore);
const isProjectModalOpen = ref(false);
const projectId = useRouteParams('id');

const project = computed(() => {
  const p = getProjectById.value(props.id);

  if (!p) {
    throw new Error(`Project with id ${props.id} not found. Try to add New Project or use Inbox instead.`);
  }

  return p;
});

function handleOpenEditor(): void {
  isProjectModalOpen.value = true;
}

function handleCloseEditor(): void {
  isProjectModalOpen.value = false;
}

function handleAddToFav(): void {
  projectsStore.toggleFavoriteStatus(props.id);
}

function handleDuplicateProject(): void {
  projectsStore.duplicateProject(props.id);
  settingsStore.setTransitionStatus({ transition: 'projectRecord', value: true });
  blurElement();
}

function handleDeleteProject(): void {
  settingsStore.setTransitionStatus({ transition: 'projectRecord', value: true });
  try {
    if (projectId.value === project.value.id) {
      router.replace({ name: 'tasks' });
    }
    projectsStore.deleteProject(props.id);
  } catch (error) {
    console.log(error);
  }
}

function cancelDeleteProject(): void {
  toggleDeleteModal();
}

function toggleDeleteModal(): void {
  deleteConfirm.value = !deleteConfirm.value;
}

function handleArchiveProject(): void {
  try {
    settingsStore.setTransitionStatus({ transition: 'projectRecord', value: true });
    if (projectId.value === project.value.id) {
      router.replace({ name: 'tasks' });
    }
    projectsStore.archiveProject(props.id);
  } catch (error) {
    console.log(error);
  }
}

function handleUnarchiveProject(): void {
  settingsStore.setTransitionStatus({ transition: 'projectRecord', value: true });
  projectsStore.activateProject(props.id);
}

function updateProject(project: Project): void {
  projectsStore.updateProject(project);
  handleCloseEditor();
  useHideMenu();
}
</script>
