import { defineStore } from 'pinia';

import { useStatsStore } from '@/stores/StatsStore';
import type { Project } from '@/types/models/Projects';

export type Action = 'Add' | 'Update' | 'Move' | 'Delete' | 'Complete' | 'Activate';
export interface TrackingEvent {
  event: {
    action: Action;
    name: string;
    project: Project;
    time: Date;
  };
}

interface TrackingState {
  tracking: {
    events: TrackingEvent[];
  };
}

export const useTrackingStore = defineStore('tracking', {
  state: (): TrackingState => ({
    tracking: {
      events: [],
    },
  }),
  getters: {},
  actions: {
    setNewEvent(payload: TrackingEvent): void {
      const statsStore = useStatsStore();

      console.log(payload);
      const { action, name, project, time } = payload;

      this.tracking.events.push({ event: { action, name, project, time } });

      if (action === 'Complete') {
        statsStore.updateValues(1);
      } else if (action === 'Activate') {
        statsStore.updateValues(-1);
      }
    },
  },
});
