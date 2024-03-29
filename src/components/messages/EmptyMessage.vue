<template>
  <FadeTransitionMedium>
    <span class="pointer-events-none grid place-items-center pt-20 md:text-lg">
      <slot>
        <TheIllustration />
      </slot>
      <slot name="content">
        <h4 class="w-64 pb-2 text-center font-bold text-base-content md:w-96">{{ currentMessage }}</h4>
        <span class="w-60 text-center text-base font-light text-base-content md:w-72">{{ currentTip }}</span>
      </slot>
    </span>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onUpdated, ref } from 'vue';

import TheIllustration from '@/components/illustrations/TheIllustration.vue';
import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';
import { getRandomItem } from '@/helpers/getRandomItem';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();
const { getName: userName } = storeToRefs(authStore);

const messages = [
  `Have a marvelous day off ${userName.value}!`,
  `Hey ${userName.value}, investing in your own happiness is always worth it.`,
  `Have a wonderful and productive day ${userName.value}!`,
  `Congratulations ${userName.value}! You have completed all your tasks.`,
  `Every small step counts towards your success. Keep going ${userName.value}!`,
  `You're doing great ${userName.value}! Take a break and enjoy a cup of coffee with a donut.`,
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
</script>
