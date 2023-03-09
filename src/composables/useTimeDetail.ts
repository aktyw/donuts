import type { ComputedRef, Ref } from 'vue';
import { computed } from 'vue';
import { isOverdue, isToday, isTomorrow, showDateWithTime } from '@/helpers/checkTime';
import { Time } from '@/types/models/TimeDetails';

export type RefOrComp<T> = ComputedRef<T> | Ref<T>;

export function useTimeDetail(time: RefOrComp<Date | undefined>): {
  showDetailTime: RefOrComp<string | undefined>;
  showInputDetailTime: RefOrComp<string | undefined>;
  markOverdue: RefOrComp<string>;
} {
  const showDetailTime = computed(() => {
    if (!time.value) return;
    if (isOverdue(time.value)) {
      return Time.Overdue;
    }
    if (isToday(time.value)) {
      return showDateWithTime(Time.Today, time.value);
    }
    if (isTomorrow(time.value)) {
      return showDateWithTime(Time.Tomorrow, time.value);
    }
    const date = time.value?.toDateString().split(' ');

    return `${date[1]} ${date[2]}`;
  });

  const showInputDetailTime = computed(() => {
    if (!time.value) return;

    const date = time.value?.toDateString().split(' ');

    return `${date[1]} ${date[2]}`;
  });

  const markOverdue = computed(() =>
    showDetailTime.value === Time.Overdue ? '[&>span]:text-error [&>svg]:fill-error' : ''
  );

  return { showDetailTime, showInputDetailTime, markOverdue };
}
