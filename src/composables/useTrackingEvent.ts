import { useDateFormat, useNow } from '@vueuse/core';
import { unref } from 'vue';

import type { TrackingEvent } from '@/stores/TrackingStore';
import { useTrackingStore } from '@/stores/TrackingStore';

export function useTrackingEvent(event: Omit<TrackingEvent, 'time'>) {
  const trackingStore = useTrackingStore();

  const { action, name, id, projectId } = event;

  const date = unref(useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss'));

  trackingStore.setNewEvent({ action, name, id, projectId, time: date });
}
