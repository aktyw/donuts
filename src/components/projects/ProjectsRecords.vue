<template>
  <section>Project Records</section>
  <li
    v-for="{ id, name, color } in projects"
    :key="id">
    <ProjectLink
      :to="{ name: 'project', params: { id: id } }"
      :name="name"
      :fill="color">
      {{ name }}
      <template #options>
        <span class="absolute right-0 -top-1 bg-transparent">
          <ProjectOptions :id="id" />
        </span>
      </template>
    </ProjectLink>
  </li>
</template>

<script setup lang="ts">
import ProjectLink from '@/components/projects/ProjectLink.vue';
import ProjectOptions from '@/components/projects/ProjectOptions.vue';
import type { Project } from '@/types/models/Projects';

type Props = {
  projects: Project[];
};

defineProps<Props>();
</script>
