<template>
  <TheSidebar>
    <template #links>
<<<<<<< Updated upstream
      <ProjectLink :to="{ name: 'noteList' }">
        <template #icon>
          <IconInbox />
        </template>
        <template #name> Notes </template>
      </ProjectLink>
      <BaseDivider></BaseDivider>
=======
      <TheTooltip
        :is="'li'"
        data="Go to editor">
        <ProjectLink
          :custom-tooltip="true"
          class="fill-primary [&>span]:right-5 md:[&>span]:right-auto"
          :to="{ name: 'noteEditor' }">
          <template #icon>
            <IconNoteEditor class="fill-primary" />
          </template>
          <template #name>Editor</template>
        </ProjectLink>
      </TheTooltip>

      <TheTooltip
        :is="'li'"
        data="Go to notes">
        <ProjectLink
          :custom-tooltip="true"
          class="fill-primary [&>span]:right-5 md:[&>span]:right-auto"
          :to="{ name: 'noteList' }">
          <template #icon>
            <IconNote class="fill-primary" />
          </template>
          <template #name>Notes</template>
        </ProjectLink>
      </TheTooltip>
>>>>>>> Stashed changes
    </template>
  </TheSidebar>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
// import { storeToRefs } from 'pinia';
// import { useTasksStore } from '@/stores/TasksStore';
// import { useProjectsStore } from '@/stores/ProjectsStore';
import BaseDivider from '@/components/base/BaseDivider.vue';
import IconInbox from '@/components/icons/IconInbox.vue';
import ProjectLink from '@/components/projects/ProjectLink.vue';
import TheSidebar from '@/components/sidebars/TheSidebar.vue';
// const store = useTasksStore();
// const projectsStore = useProjectsStore();
// const isProjectModalOpen = ref(false);
// const { getAllProjects: projects } = storeToRefs(projectsStore);
</script>
