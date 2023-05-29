import { useTimeAgo } from '@vueuse/core';
import { computed, type ComputedRef, type Ref } from 'vue';

import { isOverdue, isToday, isTomorrow, showDateWithTime } from '@/helpers/checkTime';
import { Time } from '@/types/models/TimeDetails';

export type RefOrComp<T> = ComputedRef<T> | Ref<T>;

export function useTimeDetail(time: RefOrComp<Date | undefined>): {
  showDetailTime: RefOrComp<string | undefined>;
  showInputDetailTime: RefOrComp<string | undefined>;
  markOverdue: RefOrComp<boolean>;
  markToday: RefOrComp<boolean>;
  markTomorrow: RefOrComp<boolean>;
  markDays: RefOrComp<boolean>;
} {
  const showDetailTime = computed(() => {
    if (!time.value) return;
    const timeAgo = useTimeAgo(new Date(time.value));

    if (isOverdue(time.value)) {
      return `${Time.Overdue} - ${timeAgo.value}`;
    }
    if (isTomorrow(time.value)) {
      return showDateWithTime(Time.Tomorrow, time.value);
    }

    return `${timeAgo.value}`;
  });

  const showInputDetailTime = computed(() => {
    if (!time.value) return;

    const date = time.value?.toDateString().split(' ');

    return `${date[1]} ${date[2]}`;
  });

  const todays = ['just now', 'minutes', 'hour', 'hours'];

  const markOverdue = computed(() => !!showDetailTime?.value?.toString().startsWith(Time.Overdue));
  const markToday = computed(() => {
    const timeString = showDetailTime?.value?.toString();

    return todays.some((time) => timeString?.includes(time));
  });
  const markTomorrow = computed(() => !!showDetailTime?.value?.toString().includes(Time.Tomorrow));
  const markDays = computed(() => !!showDetailTime?.value?.toString().includes('days'));

  return { showDetailTime, showInputDetailTime, markOverdue, markToday, markTomorrow, markDays };
}
