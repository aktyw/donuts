<template>
  <Bar
    id="my-chart-id"
    ref="chartEl"
    :options="chartOptions"
    :data="data" />
</template>

<script setup lang="ts">
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { Bar } from 'vue-chartjs';

import { useNotesStore } from '@/stores/NotesStore';
import { useTasksStore } from '@/stores/TasksStore';

const tasksStore = useTasksStore();
const notesStore = useNotesStore();

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
const chartEl = ref();

const {
  getAllTasks: allTasks,
  getCompletedTasks: completedTasks,
  getNotCompletedTasks: activeTasks,
} = storeToRefs(tasksStore);

const { getAllNotes: allNotes } = storeToRefs(notesStore);

const data = computed(() => ({
  labels: ['Active', 'Completed', 'All'],

  datasets: [
    {
      label: 'Tasks',
      data: [activeTasks.value.length, completedTasks.value.length, allTasks.value.length],
      backgroundColor: '#2196f3',
    },
    {
      label: 'Notes',
      data: [0, 0, allNotes.value.length],
      backgroundColor: '#ff9800',
    },
  ],
}));

const chartOptions = ref({
  responsive: true,
  type: 'bar',
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});
</script>
