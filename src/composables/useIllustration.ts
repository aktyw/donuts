import { computed, ref } from 'vue';

import { getRandomItem } from '@/helpers/getRandomItem';

export function useIllustration() {
  const illustrations = [
    'donut-bench.svg',
    'donut-briefcase.svg',
    'donut-calendar.svg',
    'donut-coffee.svg',
    'donut-happy.svg',
    'donut-notes.svg',
  ];
  const currentIllustration = ref(getRandomItem(illustrations));

  const path = computed(() => {
    const illustration = currentIllustration.value;

    return `/src/assets/illustrations/${illustration}`;
  });

  return path.value;
}
