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
        <ProjectModal
          v-if="isProjectModalOpen"
          :project="project"
          modal-title="Edit project"
          action-title="Save"
          @action="updateProject"
          @close-editor="handleCloseEditor">
        </ProjectModal>
      </teleport>
      <OptionListButton
        v-if="!isArchived"
        @click="handleOpenEditor">
        <template #icon>
          <IconPen />
        </template>
        Edit project
      </OptionListButton>

      <OptionListButton
        v-if="!isArchived"
        @click="handleAddToFav">
        <template #icon>
          <IconHeartMinus v-if="project.favorite" />
          <IconHeart v-else />
        </template>
        {{ project.favorite ? 'Remove from favorites' : 'Add to favorites' }}
      </OptionListButton>

      <OptionListButton
        v-if="!isFavorites && !isArchived"
        @click="handleDuplicateProject">
        <template #icon>
          <IconDuplicate />
        </template>
        Duplicate project
      </OptionListButton>

      <BaseDividerSmall v-if="!isFavorites && !isArchived" />

      <OptionListButton
        v-if="!isFavorites && !isArchived"
        class="hover:text-error hover:fill-error focus:text-error focus:fill-error fill-base-content"
        @click="handleArchiveProject">
        <template #icon>
          <IconArchive />
        </template>
        Archive project
      </OptionListButton>

      <OptionListButton
        v-if="!isFavorites && isArchived"
        @click="handleUnarchiveProject">
        <template #icon>
          <IconUnarchive />
        </template>
        Unarchive project
      </OptionListButton>

      <OptionListButton
        v-if="!isFavorites"
        class="hover:text-error hover:fill-error focus:text-error focus:fill-error fill-base-content"
        @click="toggleDeleteModal">
        <template #icon>
          <IconRecycleBin />
        </template>
        Delete project
      </OptionListButton>
    </ul>

    <Teleport to="body">
      <ModalDeleteConfirm
        v-if="deleteConfirm"
        :title="'Delete task'">
        <template #content>
          <p>
            Do you really want to delete project
            <span class="font-bold break-words">"{{ project.name }}"</span> ?
          </p>
        </template>
        <template #action>
          <button
            class="btn bg-base-200 text-base-content hover:bg-base-300 border-0 btn-sm rounded-md capitalize font-semibold focus:outline focus:outline-1"
            @click="cancelDeleteProject">
            Cancel
          </button>
          <button
            class="btn btn-sm rounded-md capitalize font-semibold"
            @click="handleDeleteProject">
            Delete
          </button>
        </template>
      </ModalDeleteConfirm>
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
import ModalDeleteConfirm from '@/components/modals/ModalDeleteConfirm.vue';
import ProjectModal from '@/components/projects/ProjectModal.vue';
import OptionListButton from '@/components/tasks/list/OptionListButton.vue';
import { useNotification } from '@/composables/useNotification';
import blurElement from '@/helpers/blur';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { NotificationMessage } from '@/types/models/NotificationMessage';
import type { Project } from '@/types/models/Projects';

type Props = {
  id: string;
  isFavorites?: boolean;
  isArchived?: boolean;
};

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
  useNotification(NotificationMessage.DuplicateProject);
  blurElement();
}

function handleDeleteProject(): void {
  try {
    if (projectId.value === project.value.id) {
      router.replace({ name: 'tasks' });
    }
    projectsStore.deleteProject(props.id);
    useNotification(NotificationMessage.DeleteProject);
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
    if (projectId.value === project.value.id) {
      router.replace({ name: 'tasks' });
    }
    projectsStore.archiveProject(props.id);
    useNotification(NotificationMessage.ArchiveProject);
  } catch (error) {
    console.log(error);
  }
}

function handleUnarchiveProject(): void {
  projectsStore.activateProject(props.id);
  useNotification(NotificationMessage.ActivateProject);
}

function updateProject(project: Project): void {
  projectsStore.updateProject(project);
  useNotification(NotificationMessage.UpdateProject);
  handleCloseEditor();
}
</script>
