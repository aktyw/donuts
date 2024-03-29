import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export type Action = 'Add' | 'Update' | 'Move' | 'Delete' | 'Complete' | 'Activate';

export interface TrackingEvent {
  action: Action;
  name: string;
  id: string;
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
    getFilteredEvents(state): (action: Action) => TrackingEvent[] {
      return (action: Action): TrackingEvent[] => {
        return state.tracking.events.filter((e) => e.action === action);
      };
    },
    getEventById(state): (id: string) => TrackingEvent[] {
      return (id: string): TrackingEvent[] => {
        return state.tracking.events.filter((e) => e.id === id);
      };
    },
  },
  actions: {
    setNewEvent(payload: TrackingEvent): void {
      const { action, name, id, projectId, time } = payload;

      this.tracking.events.unshift({ action, name, id, projectId, time });
    },
    clearLogs() {
      this.tracking.events = [];
    },
  },
});
