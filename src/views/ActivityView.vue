<template>
  <div
    class="h-[calc(100vh-48px)] w-full flex justify-center pb-80 transition-all duration-300"
    :class="{ 'ml-80': isMenuOpen && lgAndLarger }">
    <div class="w-4/5 flex flex-col items-center justify-start gap-2 p-8 max-w-[800px]">
      <header>
        <h2 class="text-2xl font-bold">Activity</h2>
      </header>
      <main class="w-full flex justify-center">
        <section class="w-full">
          <div>
            <ul
              v-show="events.length > 0"
              class="border-t">
              <li
                v-for="(event, id) in events"
                :key="id">
                <div class="flex flex-col gap-1 py-3 border-b">
                  <span class="flex flex-col">
                    <div class="flex items-center gap-2">
                      <span
                        class="w-3 h-3 rounded-full"
                        :class="actionColors[event.action]"></span>
                      <span class="font-semibold">{{ event.action }} task</span>
                    </div>
                    <span class="font-medium">{{ event.name }}</span>
                  </span>
                  <div class="flex justify-between items-center">
                    <span class="text-primary text-sm">{{ event.time }}</span>
                    <ProjectLink
                      class="hover:underline hover:!bg-base-100"
                      :to="{ name: 'project', params: { id: event.projectId } }"
                      :name="getProjectById(event.projectId)?.name"
                      :fill="getProjectById(event.projectId)?.color" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div
            v-if="events.length <= 0"
            class="flex justify-center">
            No activity has been recorded.
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import ProjectLink from '@/components/projects/ProjectLink.vue';
import { getBreakpoints } from '@/composables/useBreakpoints';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { useSettingsStore } from '@/stores/SettingsStore';
import type { Action } from '@/stores/TrackingStore';
import { useTrackingStore } from '@/stores/TrackingStore';

const { lgAndLarger } = getBreakpoints();

const settingsStore = useSettingsStore();
const projectsStore = useProjectsStore();

const trackingStore = useTrackingStore();
const { getProjectById } = storeToRefs(projectsStore);
const { getMenuStatus: isMenuOpen } = storeToRefs(settingsStore);
const events = computed(() => trackingStore.getEvents);

type ActionColorMap = {
  [key in Action]: string;
};

const actionColors: ActionColorMap = {
  Add: 'bg-green-500',
  Update: 'bg-blue-500',
  Move: 'bg-orange-500',
  Delete: 'bg-red-500',
  Complete: 'bg-green-500',
  Activate: 'bg-purple-500',
};
</script>
