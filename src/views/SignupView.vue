<template>
  <AuthContainer>
    <AuthTitle title="Sign up" />
    <InfoCardContainer>
      <InfoCard>
        <p class="max-w-prose py-6 leading-7 text-inherit">
          Donuts is a simple and intuitive application that allows users to easily manage their tasks and notes. With
          multiple features, Donuts helps users stay on top of their schedule and get things done efficiently.
        </p>
      </InfoCard>
      <UserAuth />
    </InfoCardContainer>
  </AuthContainer>
</template>

<script setup lang="ts">
import AuthContainer from '@/components/auth/AuthContainer.vue';
import AuthTitle from '@/components/auth/AuthTItle.vue';
import InfoCard from '@/components/auth/InfoCard.vue';
import InfoCardContainer from '@/components/auth/InfoCardContainer.vue';
import UserAuth from '@/components/auth/UserAuth.vue';
</script>
