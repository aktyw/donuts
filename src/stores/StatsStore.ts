import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export type TargetType = 'daily' | 'weekly';

interface StatsState {
  stats: {
    tasks: {
      completed: {
        daily: number;
        weekly: number;
        all: number;
      };
      target: {
        daily: number;
        weekly: number;
      };
    };
    projects: {
      active: number;
    };
  };
}

export const useStatsStore = defineStore('stats', {
  state: () => ({
    stats: useStorage('stats', {
      tasks: {
        completed: {
          daily: 0,
          weekly: 0,
          all: 0,
        },
        target: {
          daily: 5,
          weekly: 25,
        },
      },
      projects: {
        active: 0,
      },
    }),
  }),
  getters: {
    getCompletedTasks(state) {
      return (targetType: TargetType) => state.stats.tasks.completed[targetType];
    },
    getTarget(state) {
      return (targetType: TargetType) => state.stats.tasks.target[targetType];
    },
  },
  actions: {
    setNewTarget(payload: { targetType: TargetType; value: number }): void {
      this.stats.tasks.target[payload.targetType] = payload.value;
    },
    resetStats(payload: { targetType: TargetType; value: number }): void {
      this.stats.tasks.completed[payload.targetType] = payload.value;
    },
    updateStats(value: number) {
      const completed = this.stats.tasks.completed;

      Object.keys(completed).forEach((key) => {
        const targetKey = key as keyof typeof completed;

        completed[targetKey] = Math.max(completed[targetKey] + value, 0);
      });
    },
  },
});
