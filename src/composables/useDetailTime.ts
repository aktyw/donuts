import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import { isOverdue, isToday, isTomorrow } from '@/helpers/checkTime';

export function useDetailTime(deadline: ComputedRef<Date | undefined>): {
  showDetailTime: ComputedRef<string | undefined>;
  overdue: ComputedRef<string>;
} {
  const showDetailTime = computed(() => {
    if (!deadline.value) return;
    if (isOverdue(deadline.value)) {
      return 'Overdue';
    }
    if (isToday(deadline.value)) {
      return `Today ${deadline.value.getHours().toString().padStart(2, '0')}:${deadline
        .value!.getMinutes()
        .toString()
        .padStart(2, '0')}`;
    }
    if (isTomorrow(deadline.value)) {
      return 'Tomorrow';
    }
    const date = deadline.value.toDateString().split(' ');

    return `${date[1]} ${date[2]}`;
  });

  const overdue = computed(() => (showDetailTime.value === 'Overdue' ? '[&>span]:text-error [&>svg]:fill-error' : ''));

  return { showDetailTime, overdue };
}
