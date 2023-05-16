<template>
  <FadeTransitionMedium>
    <div class="hero full-h min-h-screen bg-base-200">
      <div class="hero-content flex-col md:gap-12">
        <h1 class="text-5xl md:text-6xl font-bold text-center md:pb-6">
          Login to <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Donuts!</span>
        </h1>
        <div class="flex flex-col md:flex-row-reverse gap-4 md:gap-12">
          <InfoCardLogin>
            <template #content>
              <span
                v-show="largerThanSm"
                class="font-light text-base w-60 md:w-72 text-center"
                >{{ currentMessage }}</span
              >
            </template>
          </InfoCardLogin>
          <UserAuthLogin></UserAuthLogin>
        </div>
      </div>
    </div>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import InfoCardLogin from '@/components/auth/InfoCardLogin.vue';
import UserAuthLogin from '@/components/auth/UserAuthLogin.vue';
import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';
import { getBreakpoints } from '@/composables/useBreakpoints';
import { useMessage } from '@/composables/useMessage';

const { largerThanSm } = getBreakpoints();

const messages = [
  'Welcome to Donuts! Start organizing your tasks and boosting your productivity today.',
  "Hello there! Welcome to Donuts, your go-to task management app. Let's conquer your to-do list together!",
  'Welcome aboard Donuts! Get ready to streamline your tasks and stay on top of your goals.',
  "Welcome to Donuts, where productivity meets simplicity. Let's get started on your tasks right away!",
];

const currentMessage = useMessage(messages);
</script>
