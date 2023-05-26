<template>
  <AuthContainer>
    <AuthTitle title="Login" />
    <InfoCardContainer>
      <UserAuth />
      <InfoCard>
        <p
          v-show="largerThanSm"
          class="py-6 max-w-prose text-inherit leading-7">
          {{ currentMessage }}
        </p>
      </InfoCard>
    </InfoCardContainer>
  </AuthContainer>
</template>

<script setup lang="ts">
import AuthContainer from '@/components/auth/AuthContainer.vue';
import AuthTitle from '@/components/auth/AuthTItle.vue';
import InfoCard from '@/components/auth/InfoCard.vue';
import InfoCardContainer from '@/components/auth/InfoCardContainer.vue';
import UserAuth from '@/components/auth/UserAuth.vue';
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
