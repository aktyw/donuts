import { ref } from 'vue';

import donutBench from '@/assets/illustrations/donutBench.vue';
import donutBriefcase from '@/assets/illustrations/donutBriefcase.vue';
import donutCalendar from '@/assets/illustrations/donutCalendar.vue';
import donutCoffee from '@/assets/illustrations/donutCoffee.vue';
import donutHappy from '@/assets/illustrations/donutHappy.vue';
import donutNotes from '@/assets/illustrations/donutNotes.vue';
import { getRandomItem } from '@/helpers/getRandomItem';

export function useIllustration() {
  const illustrations = [donutBench, donutBriefcase, donutCalendar, donutCoffee, donutHappy, donutNotes];
  const currentIllustration = ref(getRandomItem(illustrations));

  return currentIllustration.value;
}
