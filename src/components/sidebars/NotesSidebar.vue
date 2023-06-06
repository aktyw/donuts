<template>
  <TheSidebar>
    <template #links>
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
    </template>
  </TheSidebar>
</template>

<script setup lang="ts">
import IconNote from '@/components/icons/IconNote.vue';
import IconNoteEditor from '@/components/icons/IconNoteEditor.vue';
import ProjectLink from '@/components/projects/ProjectLink.vue';
import TheSidebar from '@/components/sidebars/TheSidebar.vue';
import TheTooltip from '@/components/ui/tooltips/TheTooltip.vue';
</script>
