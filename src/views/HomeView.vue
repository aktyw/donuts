<template>
  <FadeTransitionMedium>
    <div class="hero h-full bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse lg:gap-8">
        <img
          src="@/assets/images/donut.png"
          class="rounded-lg lg:max-w-xl" />

        <div>
          <h1 class="text-5xl font-bold lg:text-7xl">
            Improve productivity with
            <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Donuts!</span>
          </h1>
          <p class="max-w-prose py-6">
            Simple and intuitive app that allows users to easily manage their tasks and notes.
          </p>
          <router-link
            to="/auth/signup"
            class="btn-primary btn">
            Try now!
          </router-link>
        </div>
      </div>
    </div>
  </FadeTransitionMedium>
</template>

<script setup lang="ts">
import FadeTransitionMedium from '@/components/ui/transitions/FadeTransitionMedium.vue';
</script>
