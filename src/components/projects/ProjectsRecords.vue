<template>
  <section class="w-full py-2">
    <li
      v-for="{ id, name, color } in projects"
      :key="id"
      class="relative list-none">
      <ProjectLink
        class="rounded-lg font-semibold hover:!bg-base-200"
        :to="{ name: 'project', params: { id: id } }"
        :name="name"
        :custom-tooltip="true"
        :fill="color">
        {{ name }}
        <template #options>
          <TheTooltip
            class="!tooltip-top absolute -right-6 top-2 bg-transparent"
            data="More project actions">
            <ProjectOptions
              :id="id"
              :is-archived="route.name === 'archived'" />
          </TheTooltip>
        </template>
      </ProjectLink>
    </li>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

import ProjectLink from '@/components/projects/ProjectLink.vue';
import ProjectOptions from '@/components/projects/ProjectOptions.vue';
import TheTooltip from '@/components/tooltips/TheTooltip.vue';
import type { Project } from '@/types/models/Projects';

const route = useRoute();

type Props = {
  projects: Project[];
};
defineProps<Props>();
</script>
