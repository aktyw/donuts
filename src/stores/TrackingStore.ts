import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

import { useStatsStore } from '@/stores/StatsStore';

export type Action = 'Add' | 'Update' | 'Move' | 'Delete' | 'Complete' | 'Activate';

export interface TrackingEvent {
  action: Action;
  name: string;
  projectId: string;
  time: string;
}

export const useTrackingStore = defineStore('tracking', {
  state: () => ({
    tracking: useStorage('tracking', {
      events: [] as TrackingEvent[],
    }),
  }),
  getters: {
    getEvents(state): TrackingEvent[] {
      return state.tracking.events;
    },
  },
  actions: {
    setNewEvent(payload: TrackingEvent): void {
      const statsStore = useStatsStore();

      const { action, name, projectId, time } = payload;

      this.tracking.events.push({ action, name, projectId, time });

      if (action === 'Complete') {
        statsStore.updateValues(1);
      } else if (action === 'Activate') {
        statsStore.updateValues(-1);
      }
    },
    clearLogs() {
      this.tracking.events = [];
    },
  },
});
