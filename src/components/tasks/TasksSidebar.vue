<template>
  <TheSidebar>
    <template #links>
      <ProjectLink :to="{ name: 'inbox' }">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 96 960 960"
            width="24">
            <path
              d="M224.615 896Q197 896 178.5 877.5 160 859 160 831.385v-510.77Q160 293 178.5 274.5 197 256 224.615 256h510.77Q763 256 781.5 274.5 800 293 800 320.615v510.77Q800 859 781.5 877.5 763 896 735.385 896h-510.77Zm0-40h510.77q10.769 0 17.692-6.923T760 831.385v-110.77H616.923q-22.308 38-58.423 59t-78.5 21q-42.385 0-78.5-21t-58.423-59H200v110.77q0 10.769 6.923 17.692T224.615 856ZM480 760.615q38 0 69-22t43-58h168v-360q0-10.769-6.923-17.692T735.385 296h-510.77q-10.769 0-17.692 6.923T200 320.615v360h168q12 36 43 58t69 22ZM224.615 856H200h560-535.385Z" />
          </svg>
        </template>
        <template #name> Inbox </template>
        <template #amount>
          <span>{{ store.getAllTasks.length }}</span>
        </template>
      </ProjectLink>
      <ProjectLink :to="{ name: 'today' }">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24">
            <path
              d="M5.625 21q-.7 0-1.162-.462Q4 20.075 4 19.375V6.625q0-.7.463-1.162Q4.925 5 5.625 5h1.75V2.775H8.45V5h7.175V2.775h1V5h1.75q.7 0 1.163.463.462.462.462 1.162v12.75q0 .7-.462 1.163-.463.462-1.163.462Zm0-1h12.75q.25 0 .437-.188.188-.187.188-.437v-8.75H5v8.75q0 .25.188.437.187.188.437.188ZM5 9.625h14v-3q0-.25-.188-.437Q18.625 6 18.375 6H5.625q-.25 0-.437.188Q5 6.375 5 6.625Zm0 0V6v3.625Z" />
          </svg>
        </template>
        <template #name> Today </template>
        <template #amount>
          <span>{{ store.getTodayTasks.length }}</span>
        </template>
      </ProjectLink>
      <BaseDivider></BaseDivider>
      <ProjectLink
        v-for="{ id, name, color } in projects"
        :key="id"
        :to="{ name: 'project', params: { id: id } }"
        :name="name"
        :class="`fill-[${color}]`">
        {{ name }}
      </ProjectLink>
    </template>
  </TheSidebar>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTasksStore } from '@/stores/TasksStore';
import { useProjectsStore } from '@/stores/ProjectsStore';
import TheSidebar from '@/components/layouts/TheSidebar.vue';
import ProjectLink from '@/components/projects/ProjectLink.vue';
import BaseDivider from '@/components/ui/BaseDivider.vue';

const store = useTasksStore();
const projectsStore = useProjectsStore();

const { getAllProjects: projects } = storeToRefs(projectsStore);
</script>
