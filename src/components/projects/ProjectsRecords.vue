<template>
  <section class="w-full py-2">
    <FadeSlideGroup :css="isTransitionActive">
      <li
        v-for="{ id, name, color } in projects"
        :key="id"
        class="relative list-none md:[&>*>*>button]:opacity-0 md:[&>*>*>button]:hover:opacity-100 md:[&>*>*>button:focus]:opacity-100">
        <ProjectLink
          class="rounded-lg font-semibold hover:!bg-base-200"
          :to="{ name: 'project', params: { id: id } }"
          :name="name"
          :custom-tooltip="true"
          :fill="color">
          {{ name }}
          <template #options>
            <TheTooltip
              class="!tooltip-top absolute -right-8 top-2 bg-transparent"
              data="More project actions">
              <ProjectOptions
                :id="id"
                :is-archived="route.name === 'archived'" />
            </TheTooltip>
          </template>
        </ProjectLink>
      </li>
    </FadeSlideGroup>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated } from 'vue';
import { useRoute } from 'vue-router';

import ProjectLink from '@/components/projects/ProjectLink.vue';
import ProjectOptions from '@/components/projects/ProjectOptions.vue';
import TheTooltip from '@/components/ui/tooltips/TheTooltip.vue';
import FadeSlideGroup from '@/components/ui/transitions/FadeSlideGroup.vue';
import { useSettingsStore } from '@/stores/SettingsStore';
import type { Project } from '@/types/models/Projects';

const route = useRoute();
const settingsStore = useSettingsStore();
const isTransitionActive = computed(() => settingsStore.getTransitionStatus('projectRecord'));

onMounted(() => {
  settingsStore.setTransitionStatus({ transition: 'projectRecord', value: false });
});

onUpdated(() => {
  settingsStore.setTransitionStatus({ transition: 'projectRecord', value: false });
});

type Props = {
  projects: Project[];
};
defineProps<Props>();
</script>
