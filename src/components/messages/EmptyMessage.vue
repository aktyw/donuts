<template>
  <FadeTransitionMedium>
    <span class="grid place-items-center pt-20 md:text-lg pointer-events-none">
      <slot>
        <img
          class="max-w-[260px] w-full pointer-events-none"
          :src="pathToRandomIllustration || '/src/assets/illustrations/donut-bench.svg'"
          alt="Illustration of happy donut" />
      </slot>
      <slot name="content">
        <h4 class="font-bold pb-2 w-64 md:w-96 text-center">{{ currentMessage }}</h4>
        <span class="font-light text-base w-60 md:w-72 text-center">{{ currentTip }}</span>
      </slot>
    </span>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import { onUpdated, ref } from 'vue';

import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';
import { useIllustration } from '@/composables/useIllustration';
import { getRandomItem } from '@/helpers/getRandomItem';

const messages = [
  'Have a marvelous day off!',
  'Investing in your own happiness is always worth it.',
  'Have a wonderful and productive day!',
  'Congratulations! You have completed all your tasks.',
  'Every small step counts towards your success. Keep going!',
  "You're doing great! Take a break and enjoy a cup of coffee with a donut.",
];

const tips = [
  'You can click the plus button in the navbar to add a task.',
  'You can toggle the sidebar by clicking the menu icon on the left of the navbar.',
  'Donut App can be fully navigated using just your keyboard!',
  'You can add your first task by clicking Add task button.',
  'Click a task and choose one of the dropdown option to print a task',
  'You can unarchive your project by selecting it on the Projects page.',
];

const currentMessage = ref(getRandomItem(messages));
const currentTip = ref(getRandomItem(tips));

onUpdated(() => {
  currentMessage.value = getRandomItem(messages);
  currentTip.value = getRandomItem(tips);
});

const pathToRandomIllustration = useIllustration();
</script>
