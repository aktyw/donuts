<template>
  <main class="fixed grid h-screen place-items-center bg-base-200">
    <div class="flex flex-col gap-8 text-center">
      <h1 class="text-2xl">
        <span class="flex justify-center">
          <donutStop class="pointer-events-none w-full max-w-[240px] pb-6 stroke-primary"></donutStop>
        </span>
        <span class="font-bold text-9xl bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent">
          404
        </span>
      </h1>
      <h2 class="text-2xl font-semibold text-primary hover:underline">
        <router-link :to="{ name: 'about' }">Go back to app</router-link>
      </h2>
    </div>
  </main>
</template>

<script setup lang="ts">
import donutStop from '@/assets/illustrations/donutStop.vue';
</script>
